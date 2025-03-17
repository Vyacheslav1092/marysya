import {IProfile} from "@/models/api/auth/IProfile";
import {BASE_URL} from "@/api/config";
import {getUserCookies, setUserCookies} from "@/models/functions/userCookies";

export const currentUser = async ():Promise<IProfile | undefined> => {
	const url: string = `${BASE_URL}/profile`;
	const userCookiesLogin: IProfile | boolean = getUserCookies('auth-login');
	const userCookies: IProfile | boolean = getUserCookies('user');
	
	try {
		if (userCookiesLogin) {
			const response = await fetch(url, {
				credentials: 'include'
			});
			
			if (!response.ok) {
				throw new Error('Данные профиля не получены')
			}
	
			const userData: IProfile = await response.json()
			
			if (userData === userCookies) {
				return userData;
			} else {
				setUserCookies('user', userData);
			}
					
			return userData;
		} 
		
		return;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
