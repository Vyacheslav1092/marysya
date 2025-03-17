'use client'

import styles from './style.module.scss'
import StarIcon from "../../../public/img/svg/star.svg";
import StarMobileIcon from "../../../public/img/svg/star-big.svg";
import HeartIcon from "../../../public/img/svg/heart.svg";
import ReloadIcon from "../../../public/img/svg/reload.svg";
import Image from "next/image";
import {getMovieRandom} from "@/api/movies/getMovieRandom";
import {getTimeFromMins} from "@/models/functions/getTimeFromMins";
import {translateWord} from "@/models/functions/translateWord";
import {colorRate} from "@/models/functions/colorRate";
import {checkForInteger} from "@/models/functions/checkForInteger";
import React, {useEffect, useState} from "react";
import {InitialMovie} from "@/models/api/movies/initialMovie";
import {Movie} from "@/models/api/movies/Movie";
import {rotateIcon} from "@/models/functions/rotateIcon";
import VueTrailer from "@/components/VueTrailer/VueTrailer";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "@/store/store";
import {openPopup} from "@/store/slice/popupSlice";
import {user} from "@/store/slice/userDataSlice";
import {postFavorites} from "@/api/favorites/postFavorits";
import {currentUser} from "@/api/auth/CurrentUser";
import {deleteFavorites} from "@/api/favorites/deleteFavorites";
import {IProfile} from "@/models/api/auth/IProfile";


const FilmDetail = ({initialFilm}: InitialMovie) => {
	const [randomFilm, setRandomFilm] = useState<Movie>(initialFilm);
	const [openTrailer, setOpenTrailer] = useState(false);
	const userData = useSelector((state: AppState) => state.user.userData);
	const [currentUserDevice, setCurrentUserDevice] = useState<boolean>(false)
	const dispatch = useDispatch();
	const path: string = usePathname()

	const handleReloadClick = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		const updatedFilm: Movie = await getMovieRandom();
		setRandomFilm(updatedFilm)
		rotateIcon(event)
	}

	const handleTrailerClick = async (): Promise<void> => {
		setOpenTrailer(true);

		const doc: HTMLHtmlElement | null = document.querySelector("html");
		if (doc) doc.style.overflow = 'hidden';
	}

	const handleCloseTrailer = () => {
		setOpenTrailer(false);

		const doc: HTMLHtmlElement | null = document.querySelector("html");
		if (doc) doc.style.overflow = 'auto';
	}
	
	const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (userData) {
			const isFavorit: string | undefined = userData.favorites.find((favorite: string): boolean =>
				favorite === randomFilm.id.toString()
			);
			const target: HTMLButtonElement = event.currentTarget;
			
			if (isFavorit) {
				const updatedFavorites: string[] = userData.favorites.filter((favorite: string): boolean =>
					favorite !== randomFilm.id.toString()
				);
				dispatch(user({...userData, favorites: updatedFavorites}));
				deleteFavorites(randomFilm.id)
				target.setAttribute('data-favorit', 'false');
			} else {
				const updatedFavorites: string[] = [...userData.favorites, randomFilm.id.toString()];
				dispatch(user({...userData, favorites: updatedFavorites}));
				postFavorites(randomFilm.id.toString());
				target.setAttribute('data-favorit', 'true');
			}
			return;
		} else {
			dispatch(openPopup());
		}
	}
	
	const getUserDevise = () => {
		if (window.innerWidth <= 445) {
			setCurrentUserDevice(true)
		}
	}

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			const currentUserData: IProfile | undefined = await currentUser();
			if (currentUserData) {
				dispatch(user(currentUserData));
			}
		}
		fetchData();
		getUserDevise();
	}, [dispatch]);
	
	return (
		<>
			<div className={styles.about_top}>
				<div className={styles.top_inner + ' ' + `${randomFilm.backdropUrl ? '' : styles.width_full}`}>
					<div className={styles.top_inner_head}>
						<span className={`rate ${colorRate(randomFilm.tmdbRating)}`}>
							{currentUserDevice ? <StarMobileIcon /> : <StarIcon />}
							{checkForInteger(randomFilm.tmdbRating)}
						</span>
						<span className={styles.top_inner_head__text}>
								{randomFilm.releaseYear}
						</span>
						{randomFilm.genres.map((genre: string, index: number) => 
							<span className={styles.top_inner_head__text}
								key={index}>
									{translateWord(genre)}
							</span>
						)}
						<span className={styles.top_inner_head__text}>
								{getTimeFromMins(randomFilm.runtime)}
						</span>
					</div>
					<div className={styles.top_inner_bottom}>
						<h2 className={styles.top_inner_head + ' h2'}>
							{randomFilm.title}
						</h2>
						<p className={styles.top_inner_bottom__description}>
							{randomFilm.plot}
						</p>
						<div className={styles.inner_buttons + ' ' + `${path === '/' ? '' : styles.no_wrap}`}>
							<button
								className={'main_button ' + styles.inner_buttons__trailer}
								onClick={handleTrailerClick}
							>
								Трейлер
							</button>
							{path === '/' && 
								<Link 
									href={`/about_film/${randomFilm.id}`} 
									className={'default_button ' + styles.inner_buttons__about}
								>
									О&nbsp;фильме
								</Link>
							}
							<button 
								className={'small_button'}
								data-favorit={userData?.favorites.find(favorite =>
									favorite === randomFilm.id.toString())
									? 'true'
									: 'false'
								}
								onClick={handleFavorite}
							>
								<HeartIcon/>
							</button>
							{path === '/' && 
								<button
									className={'small_button refresh'}
									onClick={handleReloadClick}
								>
									<ReloadIcon/>
								</button>
							}
						</div>
					</div>
				</div>
				{randomFilm.backdropUrl &&
					<Image width={680} height={552} className={styles.about_top__image}
								 src={randomFilm.backdropUrl}
								 alt={randomFilm.title}/> 
				}
			</div>
			{openTrailer &&
				<VueTrailer trailerSrc={randomFilm} onClose={handleCloseTrailer}/>
			}
		</>
	)
}

export default FilmDetail;
