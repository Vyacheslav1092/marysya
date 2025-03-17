import {Movie} from "@/models/api/movies/Movie";
import {BASE_URL_MOVIE} from "@/api/config";

export const getMovieRandom = async ():Promise<Movie> => {
	const url: string = BASE_URL_MOVIE + '/random';

	try {
		const response: Response = await fetch(url);

		if (!response.ok) {
			throw new Error('Не удалось получить фильм =(')
		}

		const result: Movie = await response.json();

		return result;

	} catch (error) {
		console.error(error);
		throw error;
	}
}
