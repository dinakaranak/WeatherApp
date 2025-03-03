import React, { useState } from 'react';
import './Weather.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import weath from '../Component/weath.webp'
import degree from '../Component/degree.jpg'
import unnamed from '../Component/unnamed.png'
import Signup from './Signup';
import Contact from './Contact';

// import back from '../Component/img.webp'
const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const getWeather = async () => {
        if (!city) return;
        setLoading(true);
        setError('');
        setWeather(null);

        const apiKey = '4b6f924748cad16d4184540e615bcc48';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleLogout = async () => {
        try {
            // await signOut(auth);
            localStorage.removeItem('isLoggedIn');
            alert('Logged out successfully');
            Navigate('/Signup');
        } catch (error) {
            console.error('Logout Error:', error.message);
        }
    };

    return (
        <div>
        <div className='full'>
            <div>
            <Navbar expand="lg" className="bg-body-tertiary nav">
                <Container>
                       <Navbar.Brand href="#">Weather</Navbar.Brand>
                    <img src={weath} className='logo'></img>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/Weather">Home</Nav.Link>
                            <Nav.Link href="#">Contact</Nav.Link>
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                             </NavDropdown>  */}
                        </Nav>
                        <Link to='/Signup'>
                            <Button variant="outline-primary" className="ms-3 btn-outline-primary">Sign Up / Login</Button>
                        </Link>
                        <Button variant="outline-danger" className="ms-3 btn-outline-danger" onClick={handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </div>
        <div className="weather-container">
            <h1 className='text'>Weather App</h1>
            <input 
                type="text" 
                className="weather-input"
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Enter city name" 
            />
            <button className="weather-button" variant="green" onClick={getWeather}>Get Weather</button>
            
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {weather && (
                <div className="weather-info">

                    <h2>Weather in {weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Description: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                    <img src={degree} className='degree'></img>
                </div>
            )}
        </div>
        </div>
        <div>
           <Contact />
          
        </div>
        </div>
    
    );
};

export default Weather;
