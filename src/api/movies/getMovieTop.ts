import {BASE_URL_MOVIE} from "@/api/config";
import {Movies} from "@/models/api/movies/Movie";

export const getMovieTop = async ():Promise<Movies> => {
	const url: string = BASE_URL_MOVIE + '/top10'

	try {
		const response: Response = await fetch(url);

		if (!response.ok) {
			throw new Error('Не удалось получить фильмы с наивысшим рейтингом')
		}

		const result: Movies = await response.json();

		return result;

	} catch (error) {
		console.error(error);
		throw error;
	}
}
