export interface Movie {
	keywords: string[];
	backdropUrl: string;
	production: string;
	trailerYoutubeId: string;
	language: string;
	tmdbRating: number;
	title: string;
	cast: string[];
	revenue: string;
	posterUrl: string;
	plot: string;
	genres: string[];
	id: number;
	budget: string;
	languages: string[];
	releaseDate: string;
	director: string;
	awardsSummary: string;
	runtime: number;
	trailerUrl: string;
	releaseYear: number;
	countriesOfOrigin: string[];
	originalTitle: string;
	searchL: string;
	homepage: string;
	status: string;
}

export type Movies = Movie[];
