import { AddCar } from '@/components/AddCar/AddCar';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Добавить авто',
	description: 'Страница добавления авто',
};

export default function AddCarPage() {
	return (
		<main>
			<AddCar />
		</main>
	);
}
