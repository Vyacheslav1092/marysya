'use client'

import BackIcon from '../../../../public/img/svg/back.svg'
import styles from './style.module.scss'
import FilmList from "@/components/FilmList/FilmList";
import {useEffect, useState} from "react";
import {getMovieGenres} from "@/api/movies/getMovieGenres";
import {usePathname} from "next/navigation";
import {Movies} from "@/models/api/movies/Movie";
import {translateWord} from "@/models/functions/translateWord";
import Link from "next/link";

const GenreDetail = () => {
	const path:string = usePathname();
	const genre: string | undefined = path.split('/').pop();
	const userDeviseWidth = ():boolean => {
		return window.innerWidth <= 527;
	}
	const [visibleMoviesCount, setVisibleMoviesCount] = useState<number>( userDeviseWidth() ? 5 : 15);
	const [allMovies, setAllMovies] = useState<Movies>([]);
	const [pageCount, setPageCount] = useState<number>(1);
	const [initFilms, setInitFilms] = useState<boolean>(false);
	const [visibleButtonMore, setVisibleButtonMore] = useState<boolean>(false);

	useEffect(() => {
		if (initFilms) return;
		const fetchData = async (): Promise<void> => {
			const startMovies: Movies = await getMovieGenres(genre, pageCount);
			setAllMovies(startMovies)
			setInitFilms(true)
		}
		fetchData();
	}, [genre, pageCount, initFilms]);
	
	
	
	const handleShowMore = async (): Promise<void> => {
		const newCount: number = visibleMoviesCount + (userDeviseWidth() ? 5 : 15);
		setVisibleMoviesCount(newCount);
		
		if (allMovies.length < newCount) {
			const newMovies: Movies = await getMovieGenres(genre, pageCount + 1);
			
			if (newMovies.length > 0) {
				setPageCount(pageCount + 1);
				setAllMovies([...allMovies, ...newMovies]);
			} else {
				setVisibleButtonMore(true)
				alert("Нет больше фильмов для загрузки.");
			}
		}
	}
	

	return (
		<section className={styles.detail_section}>
			<div className={'container '}>
				<Link href={'/genre'} className={'h2 ' + styles.detail_back} >
					<BackIcon />
					<span className={styles.detail_back__text}>
						{genre ? translateWord(genre) : 'Жанры'}
					</span>
				</Link>
				<FilmList visibleMoviesCount={visibleMoviesCount} allMovies={allMovies} />
				{!visibleButtonMore && (
					<button 
						className={'main_button ' + styles.button_more} 
						onClick={handleShowMore}
					>
						Показать еще
					</button>
				)}
			</div>
		</section>
	)
}

export default GenreDetail;
