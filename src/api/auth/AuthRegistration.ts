
import {BASE_URL} from "@/api/config";
import {IUser} from "@/models/api/auth/IUser";

export const authRegistration= async (formData: IUser): Promise<boolean> => {
	const data: IUser = formData;
	const url: string = `${BASE_URL}/user`;

	try {
		const response: Response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			throw new Error('Ошибка при регистрации. Такой пользователь уже существует либо ошибка в передаваемых параметрах')
		}

		const result = await response.json();
		
		if (result) {
			console.log('Успешная регистрация');
			return true;
		} else {
			console.error(result.message);
			return false;
		}

	} catch (error) {
		console.error(error);
		return false;
	}
}
