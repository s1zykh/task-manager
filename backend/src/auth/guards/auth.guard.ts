import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'

import { UserService } from '@/user/user.service'

import { AuthenticatedRequest } from '../utils/types'

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(private readonly userService: UserService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context
			.switchToHttp()
			.getRequest<AuthenticatedRequest>()

		if (typeof request.session.userId === 'undefined') {
			throw new UnauthorizedException(
				'Пользователь не авторизован. Пожалуйста, войдите в систему, чтобы получить доступ.'
			)
		}

		const user = await this.userService.findById(request.session.userId)

		request.user = user

		return true
	}
}
