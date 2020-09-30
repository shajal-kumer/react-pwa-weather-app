import axios from 'axios';
// https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=YOUR_API_KEY
const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '7f7827291535e1a821b750e8bd017487';

export const fetchWeather = async (query = 'Rajshahi') => {
	const { data } = await axios.get(`${URL}?q=${query}&units=metric&appid=${API_KEY}`);
	return data;
};
