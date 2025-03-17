import styles from './style.module.scss'
import {FC} from "react";
import FilmDetail from "@/components/FilmDetail/FilmDetail";
import FilmList from "@/components/FilmList/FilmList";
import {getMovieRandom} from "@/api/movies/getMovieRandom";
import {Movie} from "@/models/api/movies/Movie";


const HomePage: FC = async () => {
	const initialFilm: Movie = await getMovieRandom();

	return (
		<div className={'container ' + styles.main_container}>
			<main>
				<FilmDetail initialFilm={initialFilm}/>
			</main>
			<div>
				<h2 className={'h2 ' + styles.main_title}>
					Топ 10 фильмов
				</h2>
				<FilmList/>
			</div>
		</div>
	)
}

export default HomePage;

