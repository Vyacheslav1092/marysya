import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProfile} from "@/models/api/auth/IProfile";

interface UserDataState {
	userData: IProfile | null
}

const initialState: UserDataState = {
	userData: null,
}

const userDataSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {
		user(state, action: PayloadAction<IProfile>) {
			state.userData = action.payload;
		},
	},
})

export const {user} = userDataSlice.actions;
export default userDataSlice.reducer;
