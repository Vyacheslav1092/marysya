'use client'

import {ReactNode} from 'react';
import {Provider} from 'react-redux';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {store} from "@/store/store";
import PopupHandler from "@/components/PopupHandler/PopupHandler";

type Props = {
	children: ReactNode;
};

const ClientWrapper = ({children}: Props) => {
	return (
		<>
			<Provider store={store}>
				<Header/>
				{children}
				<Footer/>
				<PopupHandler/>
			</Provider>
		</>
	);
};

export default ClientWrapper;
