'use client'

import clsx from 'clsx'
import { memo } from 'react'

import cls from './Button.module.css'

type ButtonType = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	variant?: ButtonType
	size?: ElementSizeExtract<'sm' | 'md' | 'lg'>
	disabled?: boolean
	fullWidth?: boolean
}

export const Button = memo((props: ButtonProps) => {
	const {
		className,
		children,
		disabled = false,
		size = 'sm',
		variant = 'primary',
		fullWidth = false,
		...rest
	} = props

	const ButtonClass = clsx(
		cls.Button,
		className,
		cls[size],
		cls[variant],
		fullWidth && cls.fullWidth
	)

	return (
		<button className={ButtonClass} disabled={disabled} {...rest}>
			{children}
		</button>
	)
})

Button.displayName = 'Button'
