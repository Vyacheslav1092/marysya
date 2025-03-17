import {FormData} from "@/models/api/auth/config";

interface IFormDataLogin {
	email: string, 
	password: string,
}
interface IFormDataRegistration {
	email: string, 
	password: string,
	name: string,
	surname: string,
}

export const changeFormData = (formData: FormData, explanation: 'login' | 'registration'): IFormDataLogin | IFormDataRegistration=> {
	if (explanation === 'login') {
		const { email, password } = formData;
		const newFormState: IFormDataLogin = { email, password };
		return newFormState;
	} else {
		const { email, password, name, surname } = formData;
		const newFormState: IFormDataRegistration = { email, password, name, surname };
		return newFormState;
	}
}
