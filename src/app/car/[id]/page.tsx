import { CarItem } from '@/components/CarItem/CarItem';
import { getData } from '@/shared/api/getData';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Детальная страница авто',
	description: 'Описание детального авто',
};

type CarPageProps = {
	params: {
		id: string;
	};
};

export default async function CarPage({ params: { id } }: CarPageProps) {
	const res = await getData(id);
	console.log(res);
	return (
		<main>
			<CarItem data={res} />
		</main>
	);
}
