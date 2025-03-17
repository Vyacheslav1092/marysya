export function translateLanguage(word: string | undefined): string {
	switch (word) {
		case 'en': return 'Английский';
		case 'ru': return 'Русский';
		case 'fr': return 'Французский';
		case 'es': return 'Испанский';
		case 'it': return 'Итальянский';
		case 'de': return 'Немецкий';
		case 'zh': return 'Китайский';
		case 'ja': return 'Японский';
		case 'ko': return 'Корейский';
		case 'hi': return 'Хинди';
		case 'ar': return 'Арабский';
		case 'pt': return 'Португальский';
		case 'nl': return 'Нидерландский';
		case 'sv': return 'Шведский';
		case 'no': return 'Норвежский';
		case 'da': return 'Датский';
		case 'fi': return 'Финский';
		case 'tr': return 'Турецкий';
		case 'el': return 'Греческий';
		case 'he': return 'Иврит';
		case 'th': return 'Тайский';
		case 'vi': return 'Вьетнамский';
		case 'id': return 'Индонезийский';
		case 'ms': return 'Малайский';
		case 'uk': return 'Украинский';
		case 'ro': return 'Румынский';
		case 'bg': return 'Болгарский';
		case 'cs': return 'Чешский';
		case 'sl': return 'Словенский';
		case 'sk': return 'Словацкий';
		case 'hr': return 'Хорватский';
		case 'lt': return 'Литовский';
		case 'lv': return 'Латышский';
		case 'et': return 'Эстонский';
		case 'fa': return 'Персидский';
		case 'sw': return 'Суахили';
		case 'tl': return 'Тагалог';
		default: return word ? word : 'Неизвестный язык';
	}
}
