import React, { useState, useEffect } from 'react';
import '../components/css/style.css';
import '../img/clouds.jpg'

function Main() {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState('');
    const [mist, setMist] = useState(null);
    const [suuny, setSunny] = useState(null);
    const [rain, setRain] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8bb0564e4ad0acf4cf730e992a21d132&units=metric`;
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
        <>
            <div className='container' >
                <div className="main">
                    <div className="main-block">
                        <div className="input">
                            <input
                                type="search"
                                className='inputinfo'

                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
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
                                        <h1>{city.main.temp}</h1>

                                        <h3>o</h3>
                                        <h1><i class="fa-solid fa-c"></i></h1>


                                    </div>
                                    <div className='min-max'>
                                        <h2>Min - {city.main.temp_min}</h2>
                                        <h3>o</h3>
                                        <h1><i class="fa-solid fa-c"></i></h1>
                                        <h2> | </h2>
                                        <h2>Max - {city.main.temp_max}</h2>
                                        <h3>o</h3>
                                        <h1><i class="fa-solid fa-c"></i></h1>
                                    </div>
                                    <h1>Weather </h1>
                                    <div className="weather-cond">
                                        <div className="box">
                                            <i class="fa-solid fa-cloud-meatball"></i>
                                            <h2>mist</h2>
                                        </div>
                                        <div className="box">
                                            <i class="fa-solid fa-cloud-sun"></i>
                                            <h2>sunny</h2>
                                        </div>
                                        <div className="box">
                                            <i class="fa-solid fa-cloud-showers-heavy"></i>
                                            <h2>rain</h2>
                                            <div className="box">
                                                <i class="fa-solid fa-cloud-moon"></i>
                                                <h2>night</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )}

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Main;

