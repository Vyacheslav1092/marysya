import styles from './style.module.scss'
import Image from "next/image";
import {getGenres} from "@/api/movies/getGenres";
import Link from "next/link";
import {translateWord} from "@/models/functions/translateWord";
import {getMovie} from "@/api/movies/getMovie";
import {filterMovieGenre, ResultItem} from "@/models/functions/filterMovieGenre";
import {Suspense} from "react";
import Loading from "@/components/Loading/loading";


const Genre = async () => {
	const [genres, movies] = await Promise.all([getGenres(), getMovie()])

	return (
		<div className={'container ' + styles.genre_container}>
			<h2 className={styles.genre_title + ' h2'}>
				Жанры фильмов
			</h2>
			<ul className={styles.genre_list}>
				<Suspense fallback={<Loading count={5}/>}>
					{filterMovieGenre(movies, genres).map((movie: ResultItem) => (
						<li className={styles.genre_list_item} key={movie.genre}>
							<Link href={`/genre/${movie.genre}`} className={styles.genre}>
								<Image className={styles.genre__image} width={290} height={305}
											 src={movie.posterUrl}
											 alt={translateWord(movie.genre)}/>
								<span className={styles.genre__title}>
											{translateWord(movie.genre)}
								</span>
							</Link>
						</li>
					))}
					
				</Suspense>
			</ul>
		</div>
	)
}

export default Genre;
