'use client';

import { AppLink } from '@/shared/UI/AppLink/AppLink';
import { Button } from '@/shared/UI/Button/Button';
import { Input } from '@/shared/UI/Input/Input';
import { CarFormData } from '@/shared/types/car';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './AddCar.module.scss';

export const AddCar = () => {
	const router = useRouter();
	const [formData, setFormData] = useState<CarFormData>({
		brand: '',
		model: '',
		year: '',
		color: '',
		price: '',
		image: '',
		engineType: '',
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
		axios
			.post('https://2a457ebfa1d5304f.mokky.dev/cars', formData)
			.then(res => console.log(res))
			.catch(err => console.log(err));
		setFormData({
			brand: '',
			model: '',
			year: '',
			color: '',
			price: '',
			image: '',
			engineType: '',
		});
		router.push('/');
		router.refresh();
	};

	return (
		<form className={styles.addCarForm} onSubmit={handleSubmit}>
			<Input
				name='brand'
				value={formData.brand}
				onInputChange={handleInputChange}
				placeholder='Бренд авто'
				required
			/>
			<Input
				name='model'
				value={formData.model}
				onInputChange={handleInputChange}
				placeholder='Модель авто'
				required
			/>
			<Input
				name='year'
				type='number'
				value={formData.year}
				onInputChange={handleInputChange}
				placeholder='Год выпуска'
				required
			/>
			<Input
				name='color'
				value={formData.color}
				onInputChange={handleInputChange}
				placeholder='Цвет'
				required
			/>
			<Input
				name='price'
				type='number'
				value={formData.price}
				onInputChange={handleInputChange}
				placeholder='Цена'
				required
			/>
			<Input
				name='image'
				value={formData.image}
				onInputChange={handleInputChange}
				placeholder='Ссылка с wallpaperscraft.ru картинки'
			/>
			<Button type='submit'>Добавить авто</Button>
			<AppLink href='/'>Назад</AppLink>
		</form>
	);
};
