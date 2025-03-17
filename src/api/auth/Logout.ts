import {BASE_URL} from "@/api/config";

export const logout = async (): Promise<void> => {
	const url: string = `${BASE_URL}/auth/logout`;
	
	try {
		const response: Response = await fetch(url, {
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error('Не успешный логаут')
		}
	} catch (error) {
		console.error(error);
	}
}
