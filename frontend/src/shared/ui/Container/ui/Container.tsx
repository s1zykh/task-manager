'use client'

import clsx from 'clsx'

import cls from './Container.module.css'

type ContainerProps = {
	children: React.ReactNode
	maxWidth?: ElementSizeExtract<'xs' | 'sm' | 'md'>
	maxHeight?: boolean
}

export function Container(props: ContainerProps) {
	const { children, maxWidth = 'md' } = props
	const classNames = clsx(cls.Container, cls[maxWidth])
	return <div className={classNames}>{children}</div>
}
