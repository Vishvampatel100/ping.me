import React, { useState, useRef, useEffect } from 'react';
import './Login.css';
import { useAuth } from './contexts/AuthContext'
import {Link, useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider, microsoftProvider } from "./Firebase";
import assets from '../../assets/Assets.js';
import apiRequest from './api/api';

function Login() {
    const emailref = useRef()
    const passwordref = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [value, setValue] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
 
        try{
            setError('')
            setLoading(true)
            await login(emailref.current.value, passwordref.current.value).then(async (data) => {
                setValue(data.user.email)
                const idToken = await data.user.getIdToken()
                const body = { }
                try {
                    const response = await apiRequest('/login', 'POST', body, idToken)
                } catch (error) {
                    console.log(error)
                }
            })
            navigate('/')
        }
        catch {
            setError('Failed to Sign In')
        }
        
        setLoading(false)
    }

    async function handleGoogleLogin() {
        setValue('')
        try {
            await signInWithPopup(auth, googleProvider).then(async (data) => {
                setValue(data.user.email)
                const idToken = await data.user.getIdToken()
                const body = { }
                try {
                    const response = await apiRequest('/login', 'POST', body, idToken)
                } catch (error) {
                    console.log(error)
                }
            })
            navigate('/')
        } catch {
            setError('Failed to Sign In')
        }
    }

    async function handleFacebookLogin() {
        setValue('')
        try {
            await signInWithPopup(auth, facebookProvider).then((data) => {
                setValue(data.user.email)
                console.log(data)
                localStorage.setItem('email', data.user.email)
            })
            navigate('/')
        } catch (error) {
            console.log(error)
            setError('Failed to Sign In')
        }
    }

    async function handleMicrosoftLogin() {
        setValue('')
        try {
            await signInWithPopup(auth, microsoftProvider).then(async (data) => {
                setValue(data.user.email)
                setValue(data.user.email)
                const idToken = await data.user.getIdToken()
                const body = {}
                try {
                    const response = await apiRequest('/login', 'POST', body, idToken)
                } catch (error) {
                    console.log(error)
                }
            })
            navigate('/')
        } catch {
            setError('Failed to Sign In')
        }
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    }, [])
    return (
        <div className="container">
        <div className="formwrapper">
            <div className="loginheader">
                <div className='loginheaderCenter'>
                    {/* <img src={assets.appLogo} alt="Logo" className='loginappLogo' /> */}
                    <div className='headerCenter'>
                        <p>ping</p>
                        <div className='headerCenterIcon'>
                            <img src={assets.messageIcon}/> 
                        </div>
                        <p>me</p>
                    </div>
                </div>
            </div>
            <h2 className="formtitle">Exited Go Live!</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="social-login">
                <button class="social-login-btn" onClick={handleGoogleLogin}>
                    <img src={assets.google} alt="Google Logo" />
                    Sign in with Google
                </button>

                <button class="social-login-btn" onClick={handleMicrosoftLogin}>
                    <img src={assets.microsoft} alt="Microsoft Logo" />
                    Sign in with Microsoft
                </button>
            </div>
            <div className="app-login">
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" ref={emailref} required className="forminput" placeholder='Enter Email' />
                </div>
                <div className="form-group">
                    <input type="password" ref={passwordref} required className="forminput" placeholder='Enter Password'/>
                </div>
                <button disabled={loading} type="submit" className="formbutton">
                    Log In
                </button>
                </form>
                <div className="loginredirect">
                <Link to="/forgetpassword" className="loginLink" >Forget Password?</Link>
                </div>
                <div className="loginredirect">
                need an account? <Link to="/signup" className="loginLink" >Sign Up</Link>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;