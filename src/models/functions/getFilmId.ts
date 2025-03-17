export function getFilmId(path: string): string | undefined {
	const result:string | undefined = path.split('/about_film/').pop();
	return result;
}
