import { ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha'
import { Request } from 'express'

import { isDev } from '@/libs/common/utils/is-dev.util'

export const getRecaptchaConfig = async (
	configService: ConfigService
): Promise<GoogleRecaptchaModuleOptions> => ({
	secretKey: configService.getOrThrow<string>('GOOGLE_RECAPTCHA_SECRET_KEY'),
	response: (req: Request): string => {
		return (req.headers.recaptcha ?? '') as string
	},
	skipIf: isDev(configService)
})
