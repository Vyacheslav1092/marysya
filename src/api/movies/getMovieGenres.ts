
import {Movies} from "@/models/api/movies/Movie";
import {BASE_URL_MOVIE} from "@/api/config";


export const getMovieGenres = async (genre: string | undefined, pageNumber?: number):Promise<Movies> => {
	const url: string = !pageNumber ? 
		`${BASE_URL_MOVIE}?genre=${genre}` :
		`${BASE_URL_MOVIE}?page=${pageNumber}&genre=${genre}`;
	;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error('Не удалось получить фильмы =(')
		}

		const result: Movies = await response.json();

		return result;

	} catch (error) {
		console.error(error);
		throw error;
	}
}
