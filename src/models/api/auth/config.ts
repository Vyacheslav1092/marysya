import {InputProps} from "@/components/Inpit/Input";


type Config = (InputProps & {
	validate?: (state: FormData) => boolean;
	name: keyof FormData;
})[];

export const config: Config = [
	{
		name: 'name',
		placeholder: 'Имя',
		required: true,
	},
	{
		name: 'surname',
		placeholder: 'Фамилия',
		required: true,
	},
	{
		name: 'email',
		placeholder: 'Электронная почта',
		pattern: '^\\S+@\\S+\\.\\S+$',
		errorMessage: 'Неверный email',
		validate: (state: FormData) => {
			const emailPattern = new RegExp('^\\S+@\\S+\\.\\S+$');
			return state.email.length > 6 && !emailPattern.test(state.email);
		}
	},
	{
		name: 'password',
		placeholder: 'Пароль',
		required: true,
		type: 'password',
		minLength: 6,
		errorMessage: 'Пароли не совпадают',
		validate: (state: FormData) => 
			!(state.password === state.conform_password) &&
			(state.conform_password !== ''),
	},
	{
		name: 'conform_password',
		placeholder: 'Подтвердите пароль',
		required: true,
		type: 'password',
	}
];

export const initialState: FormData = {
	name: '',
	password: '',
	conform_password: '',
	email: '',
	surname: '',
}

export type FormData = {
	name: string;
	password: string;
	conform_password: string | undefined;
	email: string;
	surname: string;
}
