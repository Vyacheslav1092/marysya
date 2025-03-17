import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import popupReducer from './slice/popupSlice';
import userReducer from './slice/userDataSlice'
import isMobileReducer from "./slice/isMobileSlice";

export const store = configureStore({
	reducer: {
		popup: popupReducer,
		user: userReducer,
		userDevice: isMobileReducer,
	},
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;
