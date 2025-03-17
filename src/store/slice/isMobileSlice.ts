import { createSlice } from '@reduxjs/toolkit';

interface isMobileState {
	mobile: boolean;
}

const initialState: isMobileState = {
	mobile: false,
};

const isMobileSlice = createSlice({
	name: 'isMobile',
	initialState,
	reducers: {
		isMobile(state) {
			state.mobile = true;
		},
		notMobile(state) {
			state.mobile = false;
		},
	},
});

export const { isMobile, notMobile } = isMobileSlice.actions;
export default isMobileSlice.reducer;
