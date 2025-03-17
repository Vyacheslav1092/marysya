import {Movies} from "@/models/api/movies/Movie";
import {BASE_URL_MOVIE} from "@/api/config";


export const getMovieSearch = async (search: string | undefined):Promise<Movies> => {
	const url:string = `${BASE_URL_MOVIE}?title=${search}`;
	;

	try {
		const response: Response = await fetch(url);

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
