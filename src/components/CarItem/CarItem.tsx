'use client';

import { Button } from '@/shared/UI/Button/Button';
import { Car } from '@/shared/types/car';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './CarItem.module.scss';

type CarItemProps = {
	data: Car;
};

export const CarItem = ({ data }: CarItemProps) => {
	const router = useRouter();
	return (
		<div className={styles.item}>
			<Image
				src={data.image}
				alt={`${data.brand} ${data.model}`}
				width={300}
				height={200}
				layout='responsive'
				className={styles.item__image}
			/>
			<h2 className={styles.item__title}>
				{data.brand} {data.model}
			</h2>
			<div className={styles.item__detail}>
				<p className={styles.item__price}>Цена: ${data.price}</p>
				<p>Цвет: {data.color}</p>
				<p>Год выпуска: {data.year}</p>
				<p>Тип двигателя: {data.engineType}</p>
				{data.engineType === 'Электрический' && (
					<p className={styles.range}>Запас хода: {data.range} km</p>
				)}
				{['Бензиновый', 'Дизельный'].includes(data.engineType) && (
					<p className={styles.item__transmission}>
						Трансмиссия: {data.transmission}
					</p>
				)}
			</div>
			<Button
				onClick={() => {
					router.back();
				}}
			>
				Назад
			</Button>
		</div>
	);
};
