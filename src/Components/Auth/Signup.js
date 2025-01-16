import React, {useRef, useState} from 'react'
import './Signup.css'
import { useAuth } from './contexts/AuthContext'
import{ Link, useNavigate } from 'react-router-dom'

export default function  Signup() {
    const emailref = useRef()
    const passwordref = useRef()
    const passwordConfirmref = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordref.current.value !== passwordConfirmref.current.value) {
            return setError('Passwords do not match')
        }
 
        try{
            setError('')
            setLoading(true)
            await signup(emailref.current.value, passwordref.current.value)
            navigate('/')
        }
        catch {
            setError('Failed to create an account')
        }
        
        setLoading(false)
    }

return (
    <div className="container">
        <div className="form-wrapper">
            <h2 className="form-title">Sign Up</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" ref={emailref} required className="form-input" />
            </div>
            <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" ref={passwordref} required className="form-input" />
            </div>
            <div className="form-group">
                <label className="form-label">Password Confirmation</label>
                <input type="password" ref={passwordConfirmref} required className="form-input" />
            </div>
            <button disabled={loading} type="submit" className="form-button">
                Sign Up
            </button>
            </form>
            <div className="login-redirect">
            Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
    </div>

)
}
