import { Manrope } from 'next/font/google';

export const manrope = Manrope({
	subsets: ['cyrillic'],
	weight: ['400', '500', '600', '700', '800'],
	style: ['normal'],
	display: 'swap',
	variable: '--font-manrope',
});
