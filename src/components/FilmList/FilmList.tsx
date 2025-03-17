'use client'

import CloseIcon from '../../../public/img/svg/close-small.svg'
import {Swiper, SwiperSlide} from 'swiper/react';
import styles from './style.module.scss'
import Image from "next/image";
import {usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
import {getMovieTop} from "@/api/movies/getMovieTop";
import {Movie, Movies} from "@/models/api/movies/Movie";
import Link from "next/link";
import {getMovieGenres} from "@/api/movies/getMovieGenres";
import {deleteFavorites} from "@/api/favorites/deleteFavorites";

interface IVisibleMoviesCount {
	visibleMoviesCount?: number;
	allMovies?: Movies;
	setFavoriteMovies?: () => Promise<void>;
}

const FilmList = ({visibleMoviesCount, allMovies, setFavoriteMovies}: IVisibleMoviesCount) => {
	const path:string = usePathname();
	const genre: string | undefined = path.split('/').pop();
	const [topMovie, setTopMovie] = useState<Movies>([])
	const [genresDetail, setGenresDetail] = useState<Movies>([]);
	const [deviceWidth, setDeviceWidth] = useState<boolean>(false);
	

	useEffect(() => {
		const fetchData = async (): Promise<void | Movies> => {
			if (allMovies) return allMovies;
			if(genre) {
				const detailGenres: Movies = await getMovieGenres(genre)
				setGenresDetail(detailGenres);
			} else {
				const movies: Movies = await getMovieTop();
				setTopMovie(movies);
			}
		};

		fetchData();
		updateDeviceWidth();
	}, [deviceWidth, genre, allMovies]);

	const updateDeviceWidth = () => {
		setDeviceWidth(window.innerWidth <= 527);
	};
	
	const handleUserFavoriteFilmDelete = async (movieId: number): Promise<void> => {
		await deleteFavorites(movieId)
		if (setFavoriteMovies) {
			await setFavoriteMovies();
		}
	}

	const initialMovies: Movies = genre ? genresDetail : topMovie;
	const moviesToDisplay: Movies = allMovies ? allMovies.slice(0, visibleMoviesCount) :
	initialMovies;
	
	if (deviceWidth && (genre === 'account' || genre == '')) {
		return (
			<ul className={styles.film_list}>
				<Swiper
					slidesPerView={'auto'}
					spaceBetween={40}
					className={styles.swiper}
				>
					{(moviesToDisplay.length > 0 ? moviesToDisplay : initialMovies).map((movie: Movie, index: number) => (
						<SwiperSlide key={movie.id} className={styles.swiper_slide}>
							<li className={styles.film_list__item} key={movie.id}>
								<Link href={`/about_film/${movie.id}`} className={styles.film_desc}>
									{path === '/' &&
										<span className={styles.film_desc__nubmer}>{index + 1}</span>
									}
									<div className={styles.film_desc_wrap}>
										{movie.posterUrl ?
											<Image 
												width={224} 
												height={336} 
												className={styles.film_desc_wrap__poster} 
												src={movie.posterUrl}
												alt={movie.title}
											/> :
											<span className={styles.film_desc_wrap__title}>{movie.title}</span>
										}
									</div>
								</Link>
								{path === '/account' &&
									<button
										className={styles.film__delete}
										onClick={() => handleUserFavoriteFilmDelete(movie.id)}
									>
										<CloseIcon/>
									</button>
								}
							</li>
						</SwiperSlide>
					))}
				</Swiper>
			</ul>
		)
	}

	return (
		<ul className={styles.film_list + ' ' + `${genre ? styles.genre_flex : ''}`}>
				{(moviesToDisplay.length > 0 ? moviesToDisplay : initialMovies).map((movie: Movie, index: number) => (
					<li className={styles.film_list__item} key={movie.id}>
						<Link 
							href={`/about_film/${movie.id}`} 
							className={styles.film_desc + ' ' + `${genre ? styles.genre : ''}`}
						>
							{path === '/' &&
								<span className={styles.film_desc__nubmer}>{index + 1}</span>
							}
							<div className={styles.film_desc_wrap + ' ' + `${genre ? styles.genre : ''}`}>
								{movie.posterUrl ?
									<Image 
										width={224} 
										height={336} 
										className={styles.film_desc_wrap__poster + ' ' + `${genre ? styles.genre : ''}`} 
										src={movie.posterUrl}
										alt={movie.title}
									/> :
									<span className={styles.film_desc_wrap__title}>{movie.title}</span>
								}
							</div>
						</Link>
						{path === '/account' &&
							<button
								className={styles.film__delete}
								onClick={() => handleUserFavoriteFilmDelete(movie.id)}
							>
								<CloseIcon/>
							</button>
						}
					</li>
				))}
		</ul>
	)
}

export default FilmList
