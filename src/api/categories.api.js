import api from './api';
import config from "../../config";

export default {
	getCategories(){
		return api().get(`${config.api}/categories`)
	}
}
