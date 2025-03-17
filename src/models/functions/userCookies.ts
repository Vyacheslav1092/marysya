import {IProfile} from "@/models/api/auth/IProfile";
import Cookies from 'js-cookie'

export function setUserCookies(key: string, obj:IProfile | boolean): void {
	const value: string = JSON.stringify(obj);
	Cookies.set(key, value);
}

export function getUserCookies(key: string): IProfile | boolean {
	const value: string | undefined = Cookies.get(key);
	return value ? JSON.parse(value) : null;
}

export function removeUserCookies(key: string): void {
	Cookies.remove(key);
}
