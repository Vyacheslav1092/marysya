export function colorRate(rate: number): string {
	if (rate < 6.3) {
		return 'rate_bad';
	} else if (rate < 7.5) {
		return 'rate_nogood';
	} else if (rate < 8.6) {
		return 'rate_good';
	} else {
		return 'rate_perfect';
	}
}
