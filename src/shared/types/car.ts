export type Car = {
	id: number;
	image: string;
	brand: string;
	model: string;
	color: string;
	price: number;
	year: number;
	engineType: string;
	transmission?: string;
	range?: number;
};

export type CarFormData = Omit<Car, 'id' | 'year' | 'price'> & {
	year: string;
	price: string;
};
