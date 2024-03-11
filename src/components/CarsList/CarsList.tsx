'use client';

import { AppLink } from '@/shared/UI/AppLink/AppLink';
import { Button } from '@/shared/UI/Button/Button';
import { Input } from '@/shared/UI/Input/Input';
import { Car } from '@/shared/types/car';
import { signOut, useSession } from 'next-auth/react';
import { FC, useMemo, useState } from 'react';
import { ItemCar } from './ItemCar/ItemCar';
import styles from './CarsList.module.scss';

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
					<Button onClick={handleSortOrderToggle}>
						{sortOrder === 'asc' ? 'Сначала дорогие' : 'Сначала дешевые'}
					</Button>
				)}
				{sortKey === 'year' && (
					<Button onClick={handleSortOrderToggle}>
						{sortOrder === 'asc' ? 'Сначала новые' : 'Сначала старые'}
					</Button>
				)}
				<Input
					placeholder='Введите бренд...'
					value={filterBrand}
					onInputChange={e => setFilterBrand(e.target.value)}
				/>
				<Input
					placeholder='Введите цвет...'
					value={filterColor}
					onInputChange={e => setFilterColor(e.target.value)}
				/>
				{session?.data && <AppLink href={'/add-car'}>Добавить авто</AppLink>}
				{session?.data ? (
					<AppLink
						href='#'
						onClick={() => {
							signOut({ callbackUrl: '/' });
						}}
					>
						Выйти
					</AppLink>
				) : (
					<AppLink href='api/auth/signin'>Авторизоваться</AppLink>
				)}
			</div>

			<div className={styles.carsList}>
				{sortedAndFilteredData.map(car => (
					<ItemCar key={car.id} data={car} />
				))}
			</div>
		</>
	);
};
