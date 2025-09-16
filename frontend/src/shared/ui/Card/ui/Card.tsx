'use client'

import clsx from 'clsx'
import { HTMLAttributes, ReactNode } from 'react'

import cls from './Card.module.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string
	children: ReactNode
	fullWidth?: boolean
}

export const Card = (props: CardProps) => {
	const { className, children, fullWidth = false, ...rest } = props

	const CardClass = clsx(cls.Card, className, fullWidth && cls.fullWidth)
	return <div className={CardClass}></div>
}
