import {isMobile, notMobile} from "@/store/slice/isMobileSlice";
import {Dispatch, UnknownAction} from "redux";


export const checkDeviceUser = (dispatch: Dispatch<UnknownAction>) => {
	if (window.innerWidth <= 900) {
		dispatch(isMobile())
	} else {
		dispatch(notMobile())
	}
}
