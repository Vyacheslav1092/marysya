import React, {JSX} from "react";
import styles from './style.module.scss'

export type InputProps = {
	errorMessage?: string;
	error?: boolean;
	icon?: React.ReactNode;
} & JSX.IntrinsicElements['input']

export const Input = (props: InputProps) => {
	const {placeholder, errorMessage, error = false, type, name, icon, ...rest} = props;
	return (
		<div className={styles.popup_form_item}>
			<input 
				className={styles.popup_form_item__input} 
				data-error={error}
				type={type || "text"}
				name={name}
				placeholder={placeholder}
				{...rest}
			/>
			<span className={styles.popup_form_item__icon}>
				{icon}
			</span>
			<span className={styles.popup_form_item__error} data-error={error}>
				{errorMessage}
			</span>
		</div>
	)
}

export default Input;
