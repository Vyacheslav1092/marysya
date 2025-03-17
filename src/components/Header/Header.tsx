'use client'

import SearchIcon from '../../../public/img/svg/search.svg'
import styles from './style.module.scss'
import HeaderNav from "@/components/HeaderNav/HeaderNav";
import HeaderSearch from "@/components/HeaderSearch/HeaderSearch";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {SetStateAction, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "@/store/store";
import {openPopup} from "@/store/slice/popupSlice";
import Link from "next/link";
import {checkDeviceUser} from "@/models/functions/checkDeviceUser";
import LoginButton from "@/components/LoginButton/LoginButton";
import HeaderButtonsMobile from "@/components/HeaderButtonsMobile/HeaderButtonsMobile";


const Header = () => {
	const searchValue = useRef(null)
	const [searchValueState, setSearchValue] = useState<string>("");
	const userData = useSelector((state: AppState) => state.user.userData);
	const dispatch = useDispatch();
	const userDevice = useSelector((state: AppState) => state.userDevice.mobile);
	const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

	const handleOpenPopup = () => {
		const doc: HTMLHtmlElement | null = document.querySelector("html");
		dispatch(openPopup());
		if (doc) doc.style.overflow = 'hidden';
	}

	const handleSearchValueChange = (event: { target: { value: SetStateAction<string>; }; }) => {
		setSearchValue(event.target.value);
	}

	const clearSearch = () => {
		setSearchValue('');
		
		if (isSearchVisible) {
			toggleSearchVisibility();
		}
	}

	const toggleSearchVisibility = () => {
		setIsSearchVisible(prev => !prev);
	};

	useEffect(() => {
		checkDeviceUser(dispatch)
	}, [userDevice, isSearchVisible, dispatch]);
	
	return (
		<header className={styles.header}>
			<div className={styles.header_container + ' container'}>
				<Link className={styles.header_logo} href="/" />
				{!userDevice && (
					<nav className={styles.header_nav}>
						<HeaderNav />
					</nav>
				)}
				{(!userDevice || isSearchVisible) && (
					<div className={styles.search_wrap} onClick={clearSearch}>
						<span className={styles.search_wrap__icon}>
							<SearchIcon />
						</span>
						<input
							className={styles.search_wrap__input}
							type='search'
							name='search_input'
							placeholder='Поиск'
							ref={searchValue}
							value={searchValueState}
							onChange={handleSearchValueChange}
							onClick={(e) => {
								e.stopPropagation();
							}}
						/>
						{searchValueState && (
							<div className={styles.search_drop}>
								<HeaderSearch
									searchValue={searchValueState}
									clearSearch={clearSearch}
								/>
							</div>
						)}
						{(searchValueState || isSearchVisible) && (
							<button
								className={styles.search_wrap__button_close}
								type='button'
								onClick={(e) => {
									e.stopPropagation();
									clearSearch()
								}}
							>
								<CloseIcon />
							</button>
						)}
					</div>
				)}
				{userDevice 
					? <HeaderButtonsMobile handleOpenPopupFunc={handleOpenPopup} toggleSearch={toggleSearchVisibility} />
					: <LoginButton name={userData?.name} handleOpenPopupFunc={handleOpenPopup} />
				}
			</div>
		</header>
	)
}

export default Header
