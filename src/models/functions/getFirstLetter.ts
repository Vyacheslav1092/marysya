export function getFirstLetter(name: string  | undefined, surname: string | undefined): string {
	const nameFormated: string = name === undefined ? '' : name;
	const surnameFormatted: string = surname === undefined ? '' : surname;
	
	return nameFormated.slice(0, 1).toUpperCase() + surnameFormatted.slice(0, 1).toUpperCase();
}
