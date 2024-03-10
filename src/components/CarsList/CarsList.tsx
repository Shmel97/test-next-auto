'use client';

import { Car } from '@/shared/types/car';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import styles from './CarsList.module.scss';
import { ItemCar } from './ItemCar/ItemCar';

type CarsListProps = {
	data: Car[];
};

export const CarsList: FC<CarsListProps> = ({ data }) => {
	const session = useSession();
	const [sortKey, setSortKey] = useState<'year' | 'price'>('year');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [filterBrand, setFilterBrand] = useState('');
	const [filterColor, setFilterColor] = useState('');

	const handleSortOrderToggle = () =>
		setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));

	const sortedAndFilteredData = useMemo(() => {
		return data
			.filter(
				car =>
					(!filterBrand ||
						car.brand.toLowerCase().includes(filterBrand.toLowerCase())) &&
					(!filterColor ||
						car.color.toLowerCase().includes(filterColor.toLowerCase()))
			)
			.sort((a, b) => {
				const order = sortOrder === 'asc' ? 1 : -1;
				return (a[sortKey] - b[sortKey]) * order;
			});
	}, [data, sortKey, sortOrder, filterBrand, filterColor]);

	return (
		<>
			<div className={styles.filters}>
				<select
					value={sortKey}
					onChange={e => setSortKey(e.target.value as 'year' | 'price')}
				>
					<option value='year'>Год выпуска</option>
					<option value='price'>Цена</option>
				</select>
				{sortKey === 'price' && (
					<button onClick={handleSortOrderToggle}>
						{sortOrder === 'asc' ? 'Сначала дорогие' : 'Сначала дешевые'}
					</button>
				)}
				{sortKey === 'year' && (
					<button onClick={handleSortOrderToggle}>
						{sortOrder === 'asc' ? 'Сначала новые' : 'Сначала старые'}
					</button>
				)}
				<input
					placeholder='Введите бренд...'
					value={filterBrand}
					onChange={e => setFilterBrand(e.target.value)}
				/>
				<input
					placeholder='Введите цвет...'
					value={filterColor}
					onChange={e => setFilterColor(e.target.value)}
				/>
				{session?.data ? (
					<Link href='#' onClick={() => signOut({ callbackUrl: '/' })}>
						Выйти
					</Link>
				) : (
					<Link href='api/auth/signin'>Авторизоваться</Link>
				)}
				{session?.data && <Link href={'/add-car'}>Добавить авто</Link>}
			</div>

			<div className={styles.carsList}>
				{sortedAndFilteredData.map(car => (
					<ItemCar key={car.id} data={car} />
				))}
			</div>
		</>
	);
};
