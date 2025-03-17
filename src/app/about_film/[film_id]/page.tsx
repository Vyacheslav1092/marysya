'use client'

import styles from './style.module.scss'
import FilmDetail from "@/components/FilmDetail/FilmDetail";
import {usePathname} from "next/navigation";
import {getFilmId} from "@/models/functions/getFilmId";
import {getMovieId} from "@/api/movies/getMovieId";
import {Movie} from "@/models/api/movies/Movie";
import {useEffect, useState} from "react";
import {translateLanguage} from "@/models/functions/translateLanguage";
import {formatMoney} from "@/models/functions/formatMoney";


const AboutFilm = () => {
	const path: string = usePathname()
	const filmId: string | undefined = getFilmId(path)
	const [movie, setMovie] = useState<Movie>();

	useEffect(() => {
		const fetchMovie = async (): Promise<void> => {
			const fetchedMovie: Movie = await getMovieId(filmId)
			setMovie(fetchedMovie)
		}
		fetchMovie();
	}, [filmId]);

	
	return (
		<div className={'container ' + styles.about_container}>
			{movie && <FilmDetail initialFilm={movie} />}
			<div className={styles.about_bottom}>
				<h3 className={styles.about_bottom__title + ' h3'}>
					О фильме
				</h3>
				<ul className={styles.about_list}>
					<li className={styles.about_list_item}>
							<span className={styles.about_list_item__text}>
								Язык оригинала  
							</span>
						<span className={styles.about_list_item__text}>
								{translateLanguage(movie?.language)}
							</span>
					</li>
					<li className={styles.about_list_item}>
							<span className={styles.about_list_item__text}>
								Бюджет
							</span>
						<span className={styles.about_list_item__text}>
								{formatMoney(movie?.budget)}
							</span>
					</li>
					<li className={styles.about_list_item}>
							<span className={styles.about_list_item__text}>
								Выручка
							</span>
						<span className={styles.about_list_item__text}>
								{formatMoney(movie?.revenue)}
							</span>
					</li>
					<li className={styles.about_list_item}>
							<span className={styles.about_list_item__text}>
								Режиссёр
							</span>
						<span className={styles.about_list_item__text}>
								{movie?.director ? movie?.director : 'Не известен'}
							</span>
					</li>
					<li className={styles.about_list_item}>
							<span className={styles.about_list_item__text}>
								Продакшен
							</span>
						<span className={styles.about_list_item__text}>
								{movie?.production ? movie?.production : 'Не известно'}
							</span>
					</li>
					<li className={styles.about_list_item}>
							<span className={styles.about_list_item__text}>
								Награды
							</span>
						<span className={styles.about_list_item__text}>
								{movie?.awardsSummary ? movie?.awardsSummary : 'Не известно'}
							</span>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default AboutFilm;
