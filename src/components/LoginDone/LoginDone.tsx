import styles from "@/components/Login/style.module.scss";
import CloseIcon from "../../../public/img/svg/close-large.svg";
import Image from "next/image";


type LoginDoneProps = {
	setSubmitted: (submitted: boolean) => void;
	setHideElementForm: (hideElementForm: boolean) => void;
	closePopup: () => void;
};

export const LoginDone = ({setSubmitted, setHideElementForm, closePopup}: LoginDoneProps) => {
	
	return (
		<div className={styles.popup}>
			<div 
				className={styles.popup_wrap}
			>
				<button 
					className={styles.popup_wrap__button} 
					onClick={closePopup}
				>
					<CloseIcon/>
				</button>
				<Image
					width={132}
					height={29}
					className={styles.popup_wrap__logo}
					src={'/img/header/logo-black.png'}
					alt='logo'
				/>
				<span className={styles.popup_wrap__title}>
						Регистрация завершена
					</span>
				<p className={styles.popup_wrap__text}>
					Используйте вашу электронную почту для входа
				</p>
				<button className='main_button' onClick={() => 
					(setSubmitted(false), 
						setHideElementForm(false))
				}>
					Войти
				</button>
			</div>
		</div>
	)
}

export default LoginDone;
