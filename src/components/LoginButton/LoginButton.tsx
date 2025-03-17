import Link from "next/link";
import styles from './style.module.scss'


interface ILoginButton {
	name: string | undefined;
	handleOpenPopupFunc: () => void
}

const LoginButton = ({name, handleOpenPopupFunc}: ILoginButton) => {
	return(
		<>
			{name ?
				<Link
					href={'/account'}
					className={styles.login}
				>
					{name}
				</Link> :
				<button
					className={styles.login}
					type='button'
					onClick={handleOpenPopupFunc}
				>
					Войти
				</button>
			}
		</>
	)
}

export default LoginButton;
