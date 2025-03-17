import {Movie} from "@/models/api/movies/Movie";
import {BASE_URL_MOVIE} from "@/api/config";

export const getMovieId = async (id: string | undefined):Promise<Movie> => {
	const url: string = BASE_URL_MOVIE + `/${id}`;
	
	try {
		const response: Response = await fetch(url);
		
		if (!response.ok) {
			throw new Error('Не удалось получить фильмы по заданным фильтрам')
		}
		
		const result: Movie = await response.json();
		
		return result;
		
	} catch (error) {
		console.error(error);
		throw error;
	}
}
