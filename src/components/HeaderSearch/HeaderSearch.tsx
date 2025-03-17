import {Swiper, SwiperSlide} from "swiper/react";
import StarIcon from '../../../public/img/svg/star.svg'
import styles from './style.module.scss'
import Image from "next/image";
import {useEffect, useState} from "react";
import {Movie, Movies} from "@/models/api/movies/Movie";
import {getMovieSearch} from "@/api/movies/getMovieSearch";
import Link from "next/link";
import {colorRate} from "@/models/functions/colorRate";
import {checkForInteger} from "@/models/functions/checkForInteger";
import {translateWord} from "@/models/functions/translateWord";
import {getTimeFromMins} from "@/models/functions/getTimeFromMins";

interface ISearchValue {
	searchValue: string;
	clearSearch: () => void;
}

const HeaderSearch = ({searchValue, clearSearch}: ISearchValue) => {
	const [movieLooking, setMovieLooking] = useState<Movies>([]);
	const [deviceWidth, setDeviceWidth] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			const movies: Movies = await getMovieSearch(searchValue);
			setMovieLooking(movies.slice(0,5));
		}
		fetchData()
		updateDeviceWidth();
	}, [searchValue, deviceWidth]);

	const updateDeviceWidth = () => {
		setDeviceWidth(window.innerWidth <= 475);
	};
	
	if (deviceWidth) {
		return (
			<ul className={styles.search_list}>
				<Swiper
					slidesPerView={'auto'}
					spaceBetween={15}
				>
					{movieLooking.length > 0 ? movieLooking.map((movie: Movie) => (
						<SwiperSlide key={movie.id} className={styles.swiper_slide}>
							<li className={styles.search_list__item} key={movie.id}>
								<Link
									href={`/about_film/${movie.id}`}
									className={styles.search_film}
									onClick={(e) => {
										e.stopPropagation();
										clearSearch()
									}}
								>
									<Image
										width={40}
										height={52}
										className={styles.search_film__poster}
										src={movie.posterUrl}
										alt={movie.title}
									/>
									<div className={styles.search_film_wrap}>
										<div className={styles.film_wrap_top}>
									<span className={`rate ${colorRate(movie.tmdbRating)}`}>
										<StarIcon/>
										{checkForInteger(movie.tmdbRating)}
									</span>
											<span className={styles.film_wrap_top__text}>
										{movie.releaseYear}
									</span>
											{movie.genres.map((genre: string, index: number) =>
													<span
														className={styles.film_wrap_top__text}
														key={index}
													>
											{translateWord(genre)}
										</span>
											)}
											<span className={styles.film_wrap_top__text}>
										{getTimeFromMins(movie.runtime)}
									</span>
										</div>
										<div className={styles.film_wrap_bottom}>
									<span className={styles.film_wrap_bottom__text}>
										{movie.title}
									</span>
										</div>
									</div>
								</Link>
							</li>
						</SwiperSlide>
						)):
						<span>
						Поиск не дал результатов =(
					</span>
					}
					
				</Swiper>
			</ul>
		)
	}
	
	return (
		<ul className={styles.search_list}>
			{movieLooking.length > 0 ? movieLooking.map((movie: Movie) => (
				<li className={styles.search_list__item} key={movie.id}>
					<Link 
						href={`/about_film/${movie.id}`} 
						className={styles.search_film}
						onClick={(e) => {
							e.stopPropagation();
							clearSearch()
						}}
					>
						<Image
							width={40} 
							height={52} 
							className={styles.search_film__poster} 
							src={movie.posterUrl}
							alt={movie.title}
						/>
						<div className={styles.search_film_wrap}>
							<div className={styles.film_wrap_top}>
								<span className={`rate ${colorRate(movie.tmdbRating)}`}>
									<StarIcon/>
									{checkForInteger(movie.tmdbRating)}
								</span>
								<span className={styles.film_wrap_top__text}>
									{movie.releaseYear}
								</span>
								{movie.genres.map((genre: string, index: number) =>
									<span 
										className={styles.film_wrap_top__text} 
										key={index}
									>
										{translateWord(genre)}
									</span>
								)}
								<span className={styles.film_wrap_top__text}>
									{getTimeFromMins(movie.runtime)}
								</span>
							</div>
							<div className={styles.film_wrap_bottom}>
								<span className={styles.film_wrap_bottom__text}>
									{movie.title}
								</span>
							</div>
						</div>
					</Link>
				</li>
			)): 
				<span>
					Поиск не дал результатов =(
				</span>
			}
		</ul>
	)
}

export default HeaderSearch
