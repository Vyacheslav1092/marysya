export function getTimeFromMins(mins: number): string {
	const hours: number = Math.trunc(mins/60);
	const minutes: number = mins % 60;
	
	return hours + ' ч ' + minutes + ' мин';
}
