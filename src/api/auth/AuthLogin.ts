import {BASE_URL} from "@/api/config";
import {IUser} from "@/models/api/auth/IUser";
import {setUserCookies} from "@/models/functions/userCookies";

export const authLogin = async (formData: IUser): Promise<boolean> => {
	const data: IUser = formData;
	const url: string = `${BASE_URL}/auth/login`;
	
	try {
		const response: Response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			},
			credentials: 'include',
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			throw new Error('Неверные авторизационные данные')
		}

		const result = await response.json();
		
		if (result) {
			console.log('Успешный вход');
			setUserCookies('auth-login', true);
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
