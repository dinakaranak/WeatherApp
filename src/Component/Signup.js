import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import { auth, googleProvider } from './Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import './Signup.css';

function Signup() {
    // const [mess, setMess] = useState("");
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isSignup) {
            if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.mobile) {
                setError('All fields are required');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            try {
                await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                axios.post('http://signup.dinakaran.shop/api/signup',formData)
                .then(response =>{
                    alert('sign up success')
                })
                
                // localStorage.setItem('isLoggedIn', 'true');
                // alert('Signup Successful');
                // navigate('/');
            } catch (error) {
                console.error("Signup Error:", error.message);
                setError(error.response?.data?.error || error.message || "Something went wrong");
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);

                axios.post('http://signup.dinakaran.shop/api/login', {
                    email: formData.email,
                    password: formData.password
                })
                .then(res => {
                    alert('Login successfully');
                    
                    // Save login state to localStorage
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', formData.email); // Optional: Store user email
                    
                    navigate('/');
                })
            } catch (error) {
                console.error("Login Error:", error.message);
                setError(error.response?.data?.error || "Invalid email or password");
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            alert(`Welcome ${user.displayName}`);
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/');
        } catch (error) {
            console.error('Google Login Error:', error.message);
            setError("Google login failed. Please try again.");
        }
    };

    return (
        <Container className="signup-container">
            <h2 className="signup-title">{isSignup ? 'Sign Up' : 'Login'}</h2>
            {error && <p className="error-message">{error}</p>}
            <Form onSubmit={handleSubmit} className="signup-form">
                {isSignup && (
                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            onChange={handleChange} 
                            className="form-input" 
                            required
                        />
                    </Form.Group>
                )}
                <Form.Group className="form-group">
                    <Form.Label className="form-label">Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        onChange={handleChange} 
                        required 
                        className="form-input" 
                    />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        onChange={handleChange} 
                        required 
                        className="form-input" 
                    />
                </Form.Group>
                {isSignup && (
                    <>
                        <Form.Group className="form-group">
                            <Form.Label className="form-label">Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="confirmPassword" 
                                onChange={handleChange} 
                                required
                                className="form-input" 
                            />
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label className="form-label">Mobile Number</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="mobile" 
                                onChange={handleChange} 
                                className="form-input" 
                                required
                            />
                        </Form.Group>
                    </>
                )}
                <Button type="submit" className="btn-submit">{isSignup ? 'Sign Up' : 'Login'}</Button>
                <Button onClick={handleGoogleLogin} className="btn-google">Signup With Google</Button>
            </Form>
            <Button variant="link" onClick={() => setIsSignup(!isSignup)} className="toggle-btn">
                {isSignup ? 'Already have an account? Login' : 'Create an account'}
            </Button>
        </Container>
    );
}

export default Signup;
