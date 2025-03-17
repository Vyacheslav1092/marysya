'use client'

import CloseIcon from "../../../public/img/svg/close-large.svg";
import EmailIcon from '../../../public/img/svg/mail.svg'
import UserIcon from '../../../public/img/svg/user-false.svg'
import KeyIcon from '../../../public/img/svg/key.svg'
import styles from './style.module.scss'
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {closePopup} from "@/store/slice/popupSlice";
import Image from "next/image";
import Input from "@/components/Inpit/Input";
import {config, initialState} from "@/models/api/auth/config";
import LoginDone from "@/components/LoginDone/LoginDone";
import {changeFormData} from "@/models/functions/changeFormData";
import {authLogin} from "@/api/auth/AuthLogin";
import {authRegistration} from "@/api/auth/AuthRegistration";
import {currentUser} from "@/api/auth/CurrentUser";
import {user} from "@/store/slice/userDataSlice";
import {IProfile} from "@/models/api/auth/IProfile";

const Login = () => {
	const [hideElementForm, setHideElementForm] = useState<boolean>(false);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const dispatch = useDispatch();
	const [formState, setFormState] = useState(initialState);
	
	const handleClosePopup = () => {
		dispatch(closePopup());

		const doc: HTMLHtmlElement | null = document.querySelector("html");
		if (doc) doc.style.overflow = 'auto';
	}
	
	const handleClickRegistration = () => {
		setHideElementForm(!hideElementForm);
	}
	
	const accountIn = () => {
		setSubmitted(!submitted)
	}
	
	const hideElements = () => {
		setHideElementForm(!hideElementForm)
	}

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string = event.target.value;
		const name: string = event.target.name;
		setFormState((prev) => ({...prev, [name]: value}));
	}

	const onInvalid = (event: React.FormEvent<HTMLFormElement>): boolean => {
		const target = event.target as HTMLFormElement;
		const inputs: NodeListOf<Element> = target.querySelectorAll("input[data-error=\"true\"]");
		
		return inputs.length <= 0;
	};
	
	const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		if(!onInvalid(event)) return;
		let response;
				
		if (formState.name === '') {
			response = await authLogin(changeFormData(formState, 'login'))
			
			if (response) {
				const currentUserData: IProfile | undefined = await currentUser();
				if (currentUserData) {
					dispatch(closePopup());
					dispatch(user(currentUserData));
					setFormState(initialState);
					return;
				}
			}
			alert('Не верные авторизационные данные')
			return;
		}
		
		setSubmitted(true);
		await authRegistration(changeFormData(formState, 'registration'))
		setFormState(initialState);
	}
	
	if(submitted) {
		return (
			<LoginDone 
				setSubmitted={accountIn}  
				setHideElementForm={hideElements} 
				closePopup={handleClosePopup} 
			/>
		)
	}

	return (
		<div 
			className={styles.popup} 
			onClick={handleClosePopup}
		>
			<div className={styles.popup_wrap} onClick={(e) => {
				e.stopPropagation();
			}}>
				<button
					className={styles.popup_wrap__button}
					onClick={handleClosePopup}
				>
					<CloseIcon/>
				</button>
				<Image 
					width={132} 
					height={29} 
					className={styles.popup_wrap__logo} 
					src='/img/header/logo-black.png' 
					alt='logo'
				/>
				{hideElementForm && (
					<span className={styles.popup_wrap__title}>
						Регистрация
					</span>
				)}
				<form 
					className={styles.popup_form} 
					onSubmit={onSubmit}
				>
					<Input 
						placeholder={'Электронная почта'} 
						type={'text'} 
						name={'email'} 
						required
						value={formState.email}
						icon={<EmailIcon/>} 
						pattern={config[2].pattern}
						onChange={onChange}
						error={config[2].validate?.(formState)}
						errorMessage={config[2].errorMessage}
					/>
					{hideElementForm && (
						<>
							<Input 
								placeholder={'Имя'}
								type={'text'}
								name={'name'}
								required
								value={formState.name}
								icon={<UserIcon/>}
								onChange={onChange}
							/>
							<Input 
								placeholder={'Фамилия'}
								type={'text'}
								name={'surname'}
								required
								value={formState.surname}
								icon={<UserIcon/>}
								onChange={onChange}
							/>
						</>
					)}
					<Input 
						placeholder={'Пароль'}
						type={'password'}
						name={'password'}
						required
						value={formState.password}
						icon={<KeyIcon/>}
						onChange={onChange}
						error={config[3].validate?.(formState)}
						errorMessage={config[3].errorMessage}
					/>
					{hideElementForm && (
						<Input 
							placeholder={'Подтвердите пароль'}
							type={'password'}
							name={'conform_password'}
							required
							value={formState.conform_password}
							icon={<KeyIcon/>}
							onChange={onChange}
						/>
					)}
					<button 
						type="submit" 
						className={styles.popup_form_item + ' main_button'}
					>
						{!hideElementForm ? 'Войти' : 'Создать аккаунт'}
					</button>
				</form>
				<button 
					className={styles.popup_wrap__have} 
					onClick={handleClickRegistration}
				>
					{!hideElementForm ? 'Регистрация' : 'У меня есть пароль'}
				</button>
			</div>
		</div>
	)
}

export default Login
