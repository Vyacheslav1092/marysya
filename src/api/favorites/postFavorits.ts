import {BASE_URL_FAVORITES} from "@/api/config";

export const postFavorites = async (id: string): Promise<boolean> => {
	const data: {id: string} = {id: id};
	const url: string = BASE_URL_FAVORITES
	
	try {
		const response: Response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;",
			},
			body: JSON.stringify(data),
			credentials: 'include'
		})
		

		if (!response.ok) {
			throw new Error('Для переданного идентификатора фильм не был найден')
		}
		
		const result: boolean = await response.json();
		
		return result
	} catch (error) {
		console.error(error);
		throw error;
	}
} 
