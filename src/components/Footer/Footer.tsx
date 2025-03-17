import IconVK from '../../../public/img/svg/social/vk.svg'
import IconYouTube from '../../../public/img/svg/social/youtube.svg'
import IconOK from '../../../public/img/svg/social/ok.svg'
import IconTG from '../../../public/img/svg/social/telegram.svg'

import styles from './style.module.scss'
import {JSX} from "react";
import Link from "next/link";

interface ISocialList {
	link: string,
	icon: JSX.Element
}

const Footer = () => {
	const socialList: ISocialList[] = [
		{
			link: '/',
			icon: <IconVK />,
		},
		{
			link: '/',
			icon: <IconYouTube />,
		},
		{
			link: '/',
			icon: <IconOK />,
		},
		{
			link: '/',
			icon: <IconTG />,
		}
	]
	return (
		<footer className={styles.footer}>
			<div className='container'>
				<ul className={styles.social_list}>
					{
						socialList.map((item, i) => (
							<li className={styles.social_list_item} key={i}>
								<Link className={styles.social_list_item__link} 
											href={item.link} 
											target="_blank" 
											rel="noopener noreferrer"
								>
									{item.icon}
								</Link>
							</li>
						))
					}
				</ul>
			</div>
		</footer>
	)
}

export default Footer;
