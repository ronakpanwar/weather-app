import React, { useState, useEffect } from 'react';
import '../components/css/style.css';
import clouds from '../img/clouds.jpg';
import night from '../img/night.jpg';
import rainy from '../img/rainy.jpg';
import sunny from '../img/sunny-background.jpg';
import cloudspng from '../img/cloudy.png';
import nightpng from '../img/night.png';
import rainpng from '../img/umbrella.png';
import snowclouds from '../img/snowy.png';




function Main() {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState('');
    const [image ,  setImage] = useState(sunny);
    const [cheak , setCheak] = useState("");
    const [img , setImg] = useState('');
    const date = new Date();
    const showTime = date.getHours()+ ':' + date.getMinutes() ;
    
    const time = date.getHours();

  

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



  
    
 
    useEffect(() => {
        if (city && city.weather) {
            const con = city.weather.map(weather => weather.main);
            // Use the con array as needed
            console.log(con[0]);
             
            setCheak(con[0]);

            
        } else {
            // Handle the case where city or city.weather is null or undefined
        }
    }, [city]);
    
    useEffect(() => {
        if (time > 18 || time < 6) {
            // Night time
            setImage(night);
           setImg(nightpng);
        } else {
       
        
            // Day time
            if (cheak === "Clear") {
                setImg(cloudspng);
                setImage(sunny);
            } else if (cheak === "Clouds") {
                setImage(clouds);
                setImg(snowclouds);
            } else if (cheak === "Rain") {
                setImage(rainy);
                setImg(rainpng);
            } else {
                setImage(sunny);
            }
        }
        
    }, [cheak, time]);
    
    



    return (
        <>
            <div className='container'>
            <img src={image} alt="" />
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
                                <h3>{showTime}</h3>
                                    <div className="info">
                                        
                                        <div className='location'>
                                           <h1> <i className="fa-solid fa-street-view"></i> {city.name} </h1>
                                            <img src={img} alt="" />
                                        </div>
                                      
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
                                    <div className='w-type'>
                                    <div>
                                    <h1>Weather - {cheak}</h1>
                                    
                                    </div>
                                     <div>
                                     <h1><i class="fa-solid fa-wind"></i> {city.wind.speed} Km/h</h1>
                                     </div>
                                    </div>
                                    {/* <div className="weather-cond">
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
                                    </div> */}
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

