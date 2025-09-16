import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { TokenType } from '@prisma/__generated__'
import { Request } from 'express'

import { MailService } from '@/libs/mail/mail.service'
import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'

import { AuthService } from '../auth.service'

import { EmailConfirmationService } from './email-confirmation.service'
import { authMock, mailMock, prismaMock, userMock } from './mocks'

describe('EmailConfirmationService', () => {
	let service: jest.Mocked<EmailConfirmationService>
	let prismaService: jest.Mocked<typeof prismaMock>
	let mailService: jest.Mocked<typeof mailMock>
	let userService: jest.Mocked<typeof userMock>
	let authService: jest.Mocked<typeof authMock>

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				EmailConfirmationService,
				{
					provide: PrismaService,
					useValue: prismaMock
				},
				{
					provide: MailService,
					useValue: mailMock
				},
				{
					provide: UserService,
					useValue: userMock
				},
				{
					provide: AuthService,
					useValue: authMock
				}
			]
		}).compile()

		service = module.get(EmailConfirmationService)
		prismaService = module.get(PrismaService)
		mailService = module.get(MailService)
		userService = module.get(UserService)
		authService = module.get(AuthService)

		jest.clearAllMocks()
	})

	describe('newVerification', () => {
		const mockReq = {} as Request
		const mockDto = { token: 'test-token' }
		it('should throw NotFoundException if token does not exist', async () => {
			prismaService.token.findUnique.mockResolvedValue(null)
			await expect(
				service.newVerification(mockReq, mockDto)
			).rejects.toThrow(NotFoundException)
		})

		it('should throw BadRequestException if token is expired', async () => {
			prismaService.token.findUnique.mockResolvedValue({
				id: 1,
				token: 'test-token',
				email: 'test@example.com',
				expiresIn: new Date(Date.now() - 1000),
				type: TokenType.VERIFICATION
			})

			await expect(
				service.newVerification(mockReq, mockDto)
			).rejects.toThrow(BadRequestException)
		})
		// it('should throw NotFoundException if user not found', async () => {
		// 	prismaService.token.findUnique.mockResolvedValue({
		// 		id: 1,
		// 		token: 'test-token',
		// 		email: 'test@example.com',
		// 		expiresIn: new Date(Date.now() + 1000),
		// 		type: TokenType.VERIFICATION
		// 	})
		// 	userService.findByEmail.mockResolvedValue(null)

		// 	await expect(
		// 		service.newVerification(mockReq, mockDto)
		// 	).rejects.toThrow(NotFoundException)
		// })

		// it('should update user, delete token and save session if valid', async () => {
		// 	const mockUser = { id: 1, email: 'test@example.com' }
		// 	const mockToken = {
		// 		id: 1,
		// 		token: 'test-token',
		// 		email: mockUser.email,
		// 		expiresIn: new Date(Date.now() + 1000),
		// 		type: TokenType.VERIFICATION
		// 	}

		// 	prismaService.token.findUnique.mockResolvedValue(mockToken)
		// 	userService.findByEmail.mockResolvedValue(mockUser)
		// 	prismaService.user.update.mockResolvedValue({
		// 		...mockUser,
		// 		isVerified: true
		// 	})
		// 	prismaService.token.delete.mockResolvedValue({ ...mockToken })
		// 	authService.saveSession.mockResolvedValue('mock-session')

		// 	const result = await service.newVerification(mockReq, mockDto)

		// 	expect(prismaService.user.update).toHaveBeenCalledWith({
		// 		where: { id: mockUser.id },
		// 		data: { isVerified: true }
		// 	})
		// 	expect(prismaService.token.delete).toHaveBeenCalledWith({
		// 		where: { id: mockToken.id, type: TokenType.VERIFICATION }
		// 	})
		// 	expect(authService.saveSession).toHaveBeenCalledWith(
		// 		mockReq,
		// 		mockUser
		// 	)
		// 	expect(result).toBe('mock-session')
		// })
	})

	// describe('sendVerificationToken', () => {
	// 	it('should create token and send confirmation email', async () => {
	// 		const mockToken = {
	// 			email: 'test@example.com',
	// 			token: 'abc',
	// 			id: 1,
	// 			expiresIn: new Date(),
	// 			type: TokenType.VERIFICATION
	// 		}

	// 		prismaService.token.findFirst.mockResolvedValue(null)
	// 		prismaService.token.create.mockResolvedValue(mockToken)

	// 		const result = await service.sendVerificationToken(mockToken.email)

	// 		expect(mailService.sendConfirmationEmail).toHaveBeenCalledWith(
	// 			mockToken.email,
	// 			mockToken.token
	// 		)
	// 		expect(result).toBe(true)
	// 	})
	// })

	// describe('generateVerificationToken', () => {
	// 	it('should delete existing token and create new one', async () => {
	// 		const existingToken = {
	// 			id: 1,
	// 			email: 'test@example.com',
	// 			token: 'old',
	// 			expiresIn: new Date(),
	// 			type: TokenType.VERIFICATION
	// 		}
	// 		prismaService.token.findFirst.mockResolvedValue(existingToken)
	// 		prismaService.token.delete.mockResolvedValue(existingToken)
	// 		prismaService.token.create.mockResolvedValue({
	// 			...existingToken,
	// 			token: 'new'
	// 		})

	// 		const result = await service.generateVerificationToken(
	// 			existingToken.email
	// 		)

	// 		expect(prismaService.token.delete).toHaveBeenCalledWith({
	// 			where: { id: existingToken.id, type: TokenType.VERIFICATION }
	// 		})
	// 		expect(result.token).toBe('new')
	// 	})
	// })
})
