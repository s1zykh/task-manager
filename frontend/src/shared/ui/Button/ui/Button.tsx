import clsx from 'clsx'

import cls from './Button.module.scss'

interface ButtonProps {
	className?: string
}

export const Button = (props: ButtonProps) => {
	const { className } = props

	const ButtonClass = clsx(cls.Button)
	return <div className={ButtonClass}></div>
}
