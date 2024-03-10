import { CarsList } from '@/components/CarsList/CarsList';
import { Pagination } from '@/components/Pagination/Pagination';
import { getData } from '@/shared/api/getData';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Главная страница',
	description: 'Список автомобилей',
};

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const page = searchParams['page'] ?? '1';
	const per_page = searchParams['per_page'] ?? '5';
	const start = (Number(page) - 1) * Number(per_page);
	const end = start + Number(per_page);
	const res = await getData();
	const entries = await res.slice(start, end);
	return (
		<main>
			<CarsList data={entries} />
			<Pagination hasNextPage={end < res.length} hasPrevPage={start > 0} />
		</main>
	);
}
