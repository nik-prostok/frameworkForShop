import axios from 'axios';
import config from '../../config.json';

export default () => {
	// Тут добавить аутенфикацию
	/*if (localStorage.getItem('token')) {
		return axios.create({
			baseURL: config.api,
			headers: {
				Authorization: JSON.parse(localStorage.getItem('token')).token,
			},
		});
	}*/
	return axios.create({
		baseURL: config.api,
	});
};
