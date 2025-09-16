'use client'

import clsx from 'clsx'
import { memo, useEffect, useRef, useState } from 'react'

import cls from './Input.module.css'

type HTMLInputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'onChange' | 'size'
>

interface InputProps extends HTMLInputProps {
	className?: string
	size?: ElementSizeExtract<'sm'>
	label?: string
	autofocus?: boolean
	onChange?: (value: string) => void
}

export const Input = memo((props: InputProps) => {
	const {
		label,
		placeholder,
		id,
		className,
		size = 'sm',
		value,
		autofocus,
		onChange,
		...rest
	} = props

	const ref = useRef<HTMLInputElement>(null)
	const [isFocused, setIsFocused] = useState(false)
	const inputClass = clsx(
		cls.Input,
		className,
		isFocused && cls.focused,
		cls[size]
	)

	useEffect(() => {
		if (autofocus) {
			setIsFocused(true)
			ref.current?.focus()
		}
	}, [autofocus])

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value)
	}

	const onBlur = () => {
		setIsFocused(false)
	}

	const onFocus = () => {
		setIsFocused(true)
	}

	return (
		<input
			className={inputClass}
			ref={ref}
			value={value}
			onChange={onChangeHandler}
			onFocus={onFocus}
			onBlur={onBlur}
			placeholder={placeholder}
			{...rest}
		/>
	)
})

Input.displayName = 'Input'
