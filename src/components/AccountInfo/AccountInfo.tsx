import MailIcon from '../../../public/img/svg/mail.svg'
import styles from './style.module.scss'
import {useSelector} from "react-redux";
import {AppState} from "@/store/store";
import {getFirstLetter} from "@/models/functions/getFirstLetter";
import {logout} from "@/api/auth/Logout";
import Link from "next/link";
import {removeUserCookies} from "@/models/functions/userCookies";
import {IProfile} from "@/models/api/auth/IProfile";

const AccountInfo = () => {
	const userData: IProfile | null = useSelector((state:AppState) => state.user.userData);
	
	const outProfile = async (): Promise<void> => {
		await logout();
		removeUserCookies('auth-login');
		removeUserCookies('user');
	}
	
	return (
		<>
			<ul className={styles.info_list}>
				<li className={styles.info_list_item}>
					<span className={styles.info_list_item__left}>
						{getFirstLetter(userData?.name, userData?.surname)}
					</span>
					<div className={styles.info_list_item__right}>
						<span>
							Имя Фамилия
						</span>
						<span>
							{userData?.name + ' ' + userData?.surname}
						</span>
					</div>
				</li>
				<li className={styles.info_list_item}>
					<span className={styles.info_list_item__left}>
						<MailIcon />
					</span>
					<div className={styles.info_list_item__right}>
						<span>
							Электронная почта
						</span>
						<span>
							{userData?.email}
						</span>
					</div>
				</li>
			</ul>
			<Link href={'/'}
				className={styles.log_out + ' main_button'}
				onClick={outProfile}
			>
				Выйти из аккаунта
			</Link>
		</>
	)
}

export default AccountInfo
