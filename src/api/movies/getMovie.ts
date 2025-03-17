import {Movies} from "@/models/api/movies/Movie";
import {BASE_URL_MOVIE} from "@/api/config";

export const getMovie = async ():Promise<Movies> => {
	const url: string = BASE_URL_MOVIE;
	
	try {
		const response: Response = await fetch(url);
		
		if (!response.ok) {
			throw new Error('Не удалось получить фильмы')
		}
		
		const result: Movies = await response.json();
		
		return result;
		
	} catch (error) {
		console.error(error);
		throw error;
	}
}
