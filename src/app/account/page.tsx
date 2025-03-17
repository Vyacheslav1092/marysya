'use client'

import HeartIcon from '../../../public/img/svg/heart.svg'
import UserIcon from '../../../public/img/svg/user-false.svg'
import styles from './style.module.scss'
import FilmList from "@/components/FilmList/FilmList";
import {useEffect, useState} from "react";
import AccountInfo from "@/components/AccountInfo/AccountInfo";
import {useDispatch} from "react-redux";
import {currentUser} from "@/api/auth/CurrentUser";
import {user} from "@/store/slice/userDataSlice";
import {Movies} from "@/models/api/movies/Movie";
import {getFavorites} from "@/api/favorites/getFavorites";
import {IProfile} from "@/models/api/auth/IProfile";

const Account = () => {
	const [accountToggle, setAccountToggle] = useState<boolean>(true);
	const [userFavoritesFilm, setUserFavoritesFilm] = useState<Movies>([])
	const [currentDeviseWidthUser, setCurrentDeviseWidthUser] = useState<boolean>(false)
	const dispatch = useDispatch();
	
	const handleAccountToggle = () => {
		setAccountToggle(!accountToggle)
	}
	
	const deviseUserWidth = () => {
		setCurrentDeviseWidthUser(window.innerWidth <= 475)
	}
	
	const fetchFavorites = async (): Promise<void> => {
		const favoritesFilms = await getFavorites();
		setUserFavoritesFilm(favoritesFilms);
	}
	
	

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			const currentUserData: IProfile | undefined = await currentUser();

			if (currentUserData) {
				dispatch(user(currentUserData));
				await fetchFavorites();
			}
		}
		fetchData();
		deviseUserWidth();
	}, [dispatch]);
	
	return (
		<section className={styles.account_section}>
			<div className='container'>
				<h2 className={styles.account_title + ' h2'}>
					Мой аккаунт
				</h2>
				<ul className={styles.account_nav}>
					<li className={styles.account_nav_item}>
						<button
							className={styles.account_nav_item__button + ` ${accountToggle ?  ` ${styles.account_active}` : ''}`}
							onClick={handleAccountToggle}
						>
							<HeartIcon/>
							{currentDeviseWidthUser ?
								'Избранное' :
								'Избранные фильмы'
							}
						</button>
					</li>
					<li className={styles.account_nav_item}>
						<button
							className={styles.account_nav_item__button + `${!accountToggle ? ` ${styles.account_active}` : ''}`}
							onClick={handleAccountToggle}
						>
							<UserIcon/>
							{currentDeviseWidthUser ?
								'Настройки' : 
								'Настройка аккаунта'
							}
						</button>
					</li>
				</ul>
				<div>
					{accountToggle 
						? <FilmList allMovies={userFavoritesFilm} setFavoriteMovies={fetchFavorites} />
						: <AccountInfo />
					}
				</div>
			</div>
		</section>
	)
}

export default Account
