'use client';

import { CarFormData } from '@/shared/types/car';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './AddCar.module.scss';

export const AddCar = () => {
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
	};

	return (
		<form className={styles.addCarForm} onSubmit={handleSubmit}>
			<input
				name='brand'
				value={formData.brand}
				onChange={handleInputChange}
				placeholder='Бренд авто'
				required
			/>
			<input
				name='model'
				value={formData.model}
				onChange={handleInputChange}
				placeholder='Модель авто'
				required
			/>
			<input
				name='year'
				type='number'
				value={formData.year}
				onChange={handleInputChange}
				placeholder='Год выпуска'
				required
			/>
			<input
				name='color'
				value={formData.color}
				onChange={handleInputChange}
				placeholder='Цвет'
				required
			/>
			<input
				name='price'
				type='number'
				value={formData.price}
				onChange={handleInputChange}
				placeholder='Цена'
				required
			/>
			<input
				name='image'
				value={formData.image}
				onChange={handleInputChange}
				placeholder='Ссылка на картинку с wallpaperscraft.ru'
			/>
			<button type='submit'>Добавить авто</button>
		</form>
	);
};
