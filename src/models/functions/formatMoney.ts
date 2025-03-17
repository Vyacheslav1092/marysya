export function formatMoney(money: string | undefined): string {
	if(money) {
		const formatedMoney: string =  Intl.NumberFormat('ru-RU',{currency: 'rub'}).format(Number(money) * 98)
		
		return formatedMoney.toString() + ' руб.';
	}
	return 'Не известен';
}
