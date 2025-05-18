import { User } from '@prisma/__generated__'
import { Request } from 'express'

export interface AuthenticatedRequest extends Request {
	user: User
}
