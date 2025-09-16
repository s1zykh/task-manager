import clsx from 'clsx'

import cls from './Line.module.css'

interface LineProps {
	className?: string
}

export const Line = (props: LineProps) => {
	const { className } = props

	const LineClass = clsx(cls.Line)
	return <hr className={LineClass}></hr>
}
