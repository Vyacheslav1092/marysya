import { MouseEvent } from "react";

export function rotateIcon(event: MouseEvent<HTMLButtonElement>) {
	const icon = event.target as HTMLButtonElement; 
	const isRefreshButton = icon.classList.contains("refresh");	

	if (isRefreshButton) {
		icon.classList.add("rotate");

		setTimeout(() => {
			icon.classList.remove("rotate");
		}, 300);
	}
}

