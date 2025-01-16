import React, { useState, useRef } from 'react';
import { useAuth } from './contexts/AuthContext'
import { Link } from 'react-router-dom';
import './Forgetpassword.css';


export default function Forgetpassword() {
    const emailref = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
 
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailref.current.value)
            setMessage('Reset Link send! Check your inbox')
        }
        catch {
            setError('Failed to Reset Password')
        }
        
        setLoading(false)
    }

    return (
        <div className="container">
        <div className="form-wrapper">
            <h2 className="form-title">Password Reset</h2>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" ref={emailref} required className="form-input" />
            </div>
            <button disabled={loading} type="submit" className="form-button">
                Reset Password
            </button>
            </form>
            <div className="login-redirect">
            Goto <Link to="/login" className='link'>Log in</Link> ?
            </div>
            <div className="login-redirect">
            need an account? <Link to="/signup" className='link'>Sign Up</Link>
            </div>
        </div>
    </div>
    );
};
