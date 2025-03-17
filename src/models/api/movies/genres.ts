export interface IGenres {
	map(arg0: (genre: string) => void): import("react").ReactNode;
	for(arg0: (genre: string) => void): import("react").ReactNode;
	genres: string[];
}
