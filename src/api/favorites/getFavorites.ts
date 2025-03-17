import {BASE_URL_FAVORITES} from "@/api/config";
import {Movies} from "@/models/api/movies/Movie";

export const getFavorites = async (): Promise<Movies> => {
	const url: string = BASE_URL_FAVORITES;
	
	try {
		const response: Response = await fetch(url, {
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error('Нужно авторизоваться')
		}

		const result: Movies = await response.json();

		return result;
		
	} catch (error) {
		console.error(error);
		throw error;
	}
} 
