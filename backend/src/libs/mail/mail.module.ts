import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { getMailerConfig } from '@/config/mailer.config'

import { MailService } from './mail.service'

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getMailerConfig
		})
	],
	providers: [MailService]
})
export class MailModule {}
