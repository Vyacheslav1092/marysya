import {Movie} from "@/models/api/movies/Movie";

export interface InitialTrailer {
	trailerSrc: Movie
	onClose: () => void
}
