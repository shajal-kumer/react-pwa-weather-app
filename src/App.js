import React, { useState, useEffect } from 'react';
import { fetchWeather } from './api/fetchWeather';
import './App.css';
function App() {
	const [query, setquery] = useState('');
	const [weather, setWeather] = useState({});
	useEffect(() => {}, []);
	const search = async (e) => {
		if (e.key === 'Enter') {
			const data = await fetchWeather(query);
			setWeather(data);
			setquery('');
		}
	};

	return (
		<div className='main-container'>
			<input
				type='text'
				className='search'
				placeholder='Search...'
				value={query}
				onChange={(e) => setquery(e.target.value)}
				onKeyPress={search}
			/>
			{weather.main && (
				<div className='city'>
					<div className='city-name'>
						<span>{weather.name}</span>
						<sup>{weather.sys.country}</sup>
					</div>
					<div className='city-temp'>
						{Math.round(weather.main.temp)}
						<sup>&deg;</sup>
					</div>
					<div className='info'>
						<img
							src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
							alt={weather.weather[0].description}
							className='city-icon'
						/>
						<p>{weather.weather[0].description}</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
