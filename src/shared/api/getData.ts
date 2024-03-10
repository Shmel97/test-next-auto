import axios from 'axios';

export async function getData(id?: string) {
	try {
		const url = id
			? `https://2a457ebfa1d5304f.mokky.dev/cars/${id}`
			: `https://2a457ebfa1d5304f.mokky.dev/cars`;
		const response = await axios(url);
		const { data } = await response;
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching:', error.message);
		} else {
			console.error('Error fetching:', error);
		}
	}
}
