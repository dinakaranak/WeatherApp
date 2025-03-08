import React, { useState } from 'react';
import './Weather.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import weath from '../images/weath.jpg';
import degree from '../images/degree.jpg';
import header from '../images/header-1.jpg';
// import Contact from './Contact';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

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

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        alert('Logged out successfully');
        navigate('/Signup'); // Corrected Navigation
    };

    return (
        <div className="weather-app">
            {/* Navbar */}
            <Navbar expand="lg" className="nav-bar">
                <Container>
                    <Navbar.Brand href="#">Weather</Navbar.Brand>
                    <img src={weath} className="logo" alt="Weather Logo" />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="#">Contact</Nav.Link>
                        </Nav>
                        <Link to="/Signup">
                            <Button variant="outline-primary" className="ms-3">Sign Up / Login</Button>
                        </Link>
                        <Button variant="outline-danger" className="ms-3" onClick={handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            

            {/* Header Image */}
            <div className="header-container">
                <img src={header} className="header-image" alt="Weather Header" />
            </div>

            {/* Weather Search Section */}
            <div className="weather-container">
                <h1 className="title">Weather App</h1>
                <input 
                    type="text" 
                    className="weather-input"
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city name" 
                />
                <button className="weather-button" onClick={getWeather}>Get Weather</button>

                {loading && <p className="loading-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}

                {weather && (
                    <div className="weather-info">
                        <h2>Weather in {weather.name}</h2>
                        <p>Temperature: {weather.main.temp}°C</p>
                        <p>Description: {weather.weather[0].description}</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Wind Speed: {weather.wind.speed} m/s</p>
                        <img src={degree} className="degree-image" alt="Degree Icon" />
                    </div>
                )}
            </div>
            {/* <div><Contact /></div> */}

            {/* Footer with Contact Details */}
            <footer id="contact">
                <div className="footer-container">
                    <p>Contact Us: dinakaranak001@gmail.com | +91 99409 35315</p>
                    <p>© 2025 Weather App. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Weather;
