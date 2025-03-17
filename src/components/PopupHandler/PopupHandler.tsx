import Login from "@/components/Login/Login";
import {useSelector} from "react-redux";
import {AppState} from "@/store/store";


export const PopupHandler = () => {
	const popupIsOpen: boolean = useSelector((state: AppState) => state.popup.isOpen);

	return (
		<>
			{popupIsOpen && (
				<Login />
			)}
		</>
	)
}

export default PopupHandler;
