'use client';

import type { ChangeEvent, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange'
>;

export interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
	const {
		className,
		value,
		onInputChange,
		onChange,
		type = 'text ',
		placeholder = 'Введите текст',
		...otherProps
	} = props;

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onInputChange?.(e);
		onChange?.(e.target.value);
	};

	return (
		<input
			type={type}
			className={styles.input}
			placeholder={placeholder}
			value={value}
			onChange={onChangeHandler}
			{...otherProps}
		/>
	);
};
