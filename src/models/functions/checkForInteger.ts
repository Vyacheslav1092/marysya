export function checkForInteger(value: number): number {
	const toString: string = value.toString();
	
	if(toString.includes('.')) {
		const decimalPart: string = toString.split('.')[1];
		
		if(decimalPart.length > 1) {
			return Number(parseFloat(toString).toFixed(1))
		}
	}
	return value
}
