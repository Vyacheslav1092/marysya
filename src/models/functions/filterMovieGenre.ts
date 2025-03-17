import {Movie, Movies} from "@/models/api/movies/Movie";
import {IGenres} from "@/models/api/movies/genres";

export type ResultItem = {
	posterUrl: string;
	genre: string;
};

export function filterMovieGenre(movies: Movies, genres: IGenres): ResultItem[] {
	const result: ResultItem[] = [];
	
	if(genres) {
		genres.map((genre: string): void => {
			const movie: Movie | undefined = movies.find((movie: Movie) => movie.genres.includes(genre));

			if (movie) {
				result.push({
					posterUrl: movie.posterUrl,
					genre,
				});
			}
		}) 
	}

	return result;
}
