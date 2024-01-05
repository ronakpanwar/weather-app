import React, { useState, useEffect } from 'react';
import '../components/css/style.css';

function Main() {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8bb0564e4ad0acf4cf730e992a21d132`;
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    setCity(data);
                } else {
                    console.error('Error fetching data:', data.message);
                    setCity(null);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setCity(null);
            }
        };

        if (search.trim() !== '') {
            fetchApi();
        }
    }, [search]);

    return (
        <div className='container'>
            <div className="subcont">
                <div className="input">
                    <input
                        type="search"
                        className='inputinfo'
                        
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {!city ? (
                    <p>Please enter a valid city name</p>
                ) : (
                    <div>
                        <div className="info">
                            <h1 className='location'>
                                <i className="fa-solid fa-street-view"></i> {city.name}
                            </h1>
                        </div>
                        <div className="result">
                            <h1>{(city.main.temp)} </h1>
                            <div>
                               <h2>Min {city.main.temp_min}</h2>
                               <h2>Max {city.main.temp_max}</h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Main;

