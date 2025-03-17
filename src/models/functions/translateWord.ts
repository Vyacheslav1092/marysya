
export function translateWord(word: string):string {
	switch (word) {
		case 'history': return 'история';
		case 'horror': return 'хоррор';
		case 'scifi': return 'сайфай';
		case 'stand-up': return 'стендап';
		case 'fantasy': return 'фэнтази';
		case 'drama': return 'драма';
		case 'mystery': return 'мистика';
		case 'family': return 'семейный';
		case 'comedy': return 'комедия';
		case 'romance': return 'роман';
		case 'music': return 'музыка';
		case 'crime': return 'криминал';
		case 'tv-movie': return 'тв-фильм';
		case 'documentary': return 'документальный';
		case 'action': return 'экшен';
		case 'thriller': return 'триллер';
		case 'western': return 'вестерн';
		case 'animation': return 'мультфильм';
		case 'war': return 'военный';
		case 'adventure': return 'приключение';
		default: return word;
	}
}
