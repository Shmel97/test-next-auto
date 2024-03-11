import { AppLink } from '@/shared/UI/AppLink/AppLink';
import { Car } from '@/shared/types/car';
import Image from 'next/image';
import { FC } from 'react';
import styles from './ItemCar.module.scss';

type ItemCarProps = {
	data: Car;
};

export const ItemCar: FC<ItemCarProps> = ({ data }) => {
	return (
		<AppLink key={data.id} href={`/car/${data.id}`} className={styles.card}>
			<Image
				className={styles.card__image}
				src={data.image}
				alt={`${data.brand} ${data.model}`}
				width={180}
				height={100}
			/>
			<div className={styles.card__description}>
				<h2 className={styles.card__title}>
					{data.brand} {data.model}
				</h2>
				<p className={styles.card__paragraph}>
					{data.year} - {data.color} - ${data.price}
				</p>
			</div>
		</AppLink>
	);
};
