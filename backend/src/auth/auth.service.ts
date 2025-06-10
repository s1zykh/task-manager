import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthMethod, User } from '@prisma/__generated__'
import { verify } from 'argon2'
import { Request, Response } from 'express'

import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'

import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { ProviderService } from './provider/provider.service'
import { TypeUserInfo } from './provider/services/types/user-info.types'

@Injectable()
export class AuthService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly providerService: ProviderService
	) {}

	public async register(dto: RegisterDto) {
		const isExists = await this.userService.findByEmail(dto.email)

		if (isExists) {
			throw new ConflictException(
				'Регистрация не удалась. Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему.'
			)
		}

		const newUser = await this.userService.create(
			dto.email,
			dto.password,
			dto.name,
			'',
			AuthMethod.CREDENTIALS,
			false
		)

		return newUser
	}

	public async login(req: Request, dto: LoginDto) {
		const user = await this.userService.findByEmail(dto.email)

		if (!user || !user.password) {
			throw new NotFoundException(
				'Пользователь не найден. Пожалуйста, проверьте введенные данные'
			)
		}

		const isValidPassword = await verify(user.password, dto.password)

		if (!isValidPassword) {
			throw new UnauthorizedException(
				'Неверный пароль. Пожалуйста, попробуйте еще раз или восстановите пароль, если забыли его.'
			)
		}
		return this.saveSession(req, user)
	}

	public async extractProfileFromCode(
		req: Request,
		provider: string,
		code: string
	) {
		const providerInstance = this.providerService.findByService(provider)

		if (!providerInstance) {
			throw new NotFoundException(
				`OAuth-провайдер "${provider}" не найден`
			)
		}

		const profile: TypeUserInfo =
			await providerInstance.findUserByCode(code)

		const account = await this.prismaService.account.findFirst({
			where: {
				id: profile.id,
				provider: profile.provider
			}
		})

		let user = account?.userId
			? await this.userService.findById(account.userId)
			: null

		if (user) {
			return this.saveSession(req, user)
		}

		if (profile.provider) {
			user = await this.userService.create(
				profile.email,
				'',
				profile.name,
				profile.picture,
				AuthMethod[
					profile.provider.toUpperCase() as keyof typeof AuthMethod
				],
				true
			)
		}

		if (!account && profile.provider && profile.expires_at) {
			await this.prismaService.account.create({
				data: {
					userId: user?.id,
					type: 'oauth',
					provider: profile.provider,
					accessToken: profile.access_token,
					refreshToken: profile.refresh_token,
					expiresAt: profile.expires_at
				}
			})
		}

		return this.saveSession(req, user!)
	}

	public async logout(req: Request, res: Response): Promise<void> {
		return new Promise((resolve, reject) => {
			req.session.destroy((err) => {
				if (err) {
					return reject(
						new InternalServerErrorException(
							'Не удалось завершить сессию. Возможно, возникла проблема с сервером или сессия уже была завершена.'
						)
					)
				}
				res.clearCookie(
					this.configService.getOrThrow<string>('SESSION_NAME')
				)
				resolve()
			})
		})
	}

	public async saveSession(req: Request, user: User) {
		return new Promise((resolve, reject) => {
			req.session.userId = user.id
			req.session.save((err) => {
				if (err) {
					return reject(
						new InternalServerErrorException(
							'Не удалось сохранить сессию. Проверьте, правильно ли настроены параметры сессии.'
						)
					)
				}
				resolve({
					user
				})
			})
		})
	}
}
