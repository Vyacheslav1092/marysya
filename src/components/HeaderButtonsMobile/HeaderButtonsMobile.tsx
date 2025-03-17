import Link from "next/link";
import GenresIcon from '../../../public/img/svg/genres.svg'
import SearchIcon from '../../../public/img/svg/search.svg'
import UserDisabledIcon from '../../../public/img/svg/user-false.svg'
import UserActiveIcon from '../../../public/img/svg/user-true.svg'
import styles from "./style.module.scss";
import {getUserCookies} from "@/models/functions/userCookies";

interface IHeaderButtonsMobile {
	handleOpenPopupFunc: () => void,
	toggleSearch: () => void,
}

const HeaderButtonsMobile = ({handleOpenPopupFunc, toggleSearch}: IHeaderButtonsMobile) => {
	const authUser = getUserCookies('auth-login')
	
	return(
		<div className={styles.mobile_wrap}>
			<Link href={'/genre'} className={styles.mobile_wrap__genres}>
				<GenresIcon />
			</Link>
			<button 
				className={styles.mobile_wrap__search}
				onClick={toggleSearch}
			>
				<SearchIcon />
			</button>
			{authUser ?
				<Link
					href={'/account'}
					className={styles.mobile_wrap__auth}
				>
					<UserActiveIcon />
				</Link> :
				<button
					className={styles.mobile_wrap__auth}
					type='button'
					onClick={handleOpenPopupFunc}
				>
					<UserDisabledIcon />
				</button>
			}
		</div>
	)
}

export default HeaderButtonsMobile;
