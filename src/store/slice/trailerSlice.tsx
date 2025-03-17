import {createSlice} from "@reduxjs/toolkit";

interface ITrailerSlice {
	src: string
	title: string
}

const initialState: ITrailerSlice = {
	src: '',
	title: '',
}

const trailerSlice = createSlice({
	name: 'trailer',
	initialState,
	reducers: {
		loadTrailer: (state, action) => {state = action.payload},
	}
})

export const {loadTrailer} = trailerSlice.actions;
export default trailerSlice.reducer;
