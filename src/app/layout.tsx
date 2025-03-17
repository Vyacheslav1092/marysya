import type {Metadata} from "next";
import 'swiper/css';
import "./globals.css";
import React from "react";
import ClientWrapper from "@/store/ClienWrapper";


export const metadata: Metadata = {
	title: "VK Маруся",
	description: "Дипломная работа по React.js",
};

export default function RootLayout({
																		 children,
																	 }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
		<body>
		<ClientWrapper>{children}</ClientWrapper>
		</body>
		</html>
	);
}
