'use client';

import { Car } from '@/shared/types/car';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import styles from './CarsList.module.scss';

type CarsListProps = {
	data: Car[];
};

export const CarsList: FC<CarsListProps> = ({ data }) => {
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
				<Link href={'/add-car'}>Добавить авто</Link>
			</div>

			<div className={styles.carsList}>
				{sortedAndFilteredData.map(car => (
					<Link key={car.id} href={`/car/${car.id}`} className={styles.card}>
						<Image
							className={styles.card__image}
							src={car.image}
							alt={`${car.brand} ${car.model}`}
							width={180}
							height={100}
						/>
						<div className={styles.card__description}>
							<h2 className={styles.card__title}>
								{car.brand} {car.model}
							</h2>
							<p className={styles.card__paragraph}>
								{car.year} - {car.color} - ${car.price}
							</p>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};
