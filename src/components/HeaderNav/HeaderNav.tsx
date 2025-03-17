'use client'

import styles from './style.module.scss'
import Link from "next/link";
import {usePathname} from "next/navigation";

const HeaderNav = () => {
	const pathName:string = usePathname();

	return (
		<ul className={styles.nav_list}>
			<li className={styles.nav_list_item}>
				<Link 
					href={'/'} 
					className={`nav_link ${pathName === '/' ? 'nav_active' : ''}`}
				>
					Главная
				</Link>
			</li>
			<li className={styles.nav_list_item}>
				<Link 
					href={'/genre'} 
					className={`nav_link ${pathName === '/genre' ? 'nav_active' : ''}`}
				>
					Жанры
				</Link>
			</li>
		</ul>
	)
}

export default HeaderNav
