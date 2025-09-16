'use client'

import clsx from 'clsx'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input/ui/Input'
import { Line } from '@/shared/ui/Line'
import { HStack, VStack } from '@/shared/ui/Stack'

import cls from './Auth.module.css'

interface AuthProps {
	className?: string
}

export const Auth = (props: AuthProps) => {
	const { className } = props

	const AuthClass = clsx(cls.Auth, className)
	return (
		<VStack as='form' action='submit' className={AuthClass} gap='8'>
			<Button variant='ghost'>Gamil</Button>
			<Button variant='ghost'>Yandex</Button>
			<Button variant='ghost'>VK</Button>
			<Line />
			<Input placeholder='Логин' name='login' />
			<HStack justify='end' max>
				Забыли пароль?
			</HStack>
			<Input placeholder='Пароль' name='password' />
			<Button>Войти</Button>
		</VStack>
	)
}
