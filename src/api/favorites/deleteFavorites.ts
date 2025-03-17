import {IfavoritesOut} from "@/models/api/favorites/favoritesOut";
import {BASE_URL_FAVORITES} from "@/api/config";

export const deleteFavorites = async (id: number): Promise<IfavoritesOut> => {
	const url: string = `${BASE_URL_FAVORITES}/${id}`;
	
	try {
		const response: Response = await fetch(url, {
			method: 'DELETE',
			credentials: 'include',
		})

		if (!response.ok) {
			throw new Error(`Ошибка при удалении фильма: ${response.status}`);
		}

		const data: IfavoritesOut = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
