import {IGenres} from "@/models/api/movies/genres";
import {BASE_URL_MOVIE} from "@/api/config";

export const getGenres = async ():Promise<IGenres> => {
	const url: string = BASE_URL_MOVIE + '/genres';

	try {
		const response: Response = await fetch(url);

		if (!response.ok) {
			throw new Error('Нужно авторизоваться')
		}

		const result: IGenres = await response.json();

		return result;

	} catch (error) {
		console.error(error);
		throw error;
	}
}
