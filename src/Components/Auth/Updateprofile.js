import React, {useRef, useState} from 'react'
import { useAuth } from './contexts/AuthContext'
import{ Link } from 'react-router-dom'

export default function Updateprofile(){
    const emailref = useRef()
    const passwordref = useRef()
    const passwordConfirmref = useRef()
    const { currentUser, newPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordref.current.value !== passwordConfirmref.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setLoading(true)
        setError('')
        setMessage('')
        if (passwordref.current.value) {
            promises.push(newPassword(passwordref.current.value))
        }

        Promise.all(promises).then(() => {
            setMessage('Profile Updated Successfully')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
    }

return (
    <div className="container">
        <div className="form-wrapper">
            <h2 className="form-title">Update Profile</h2>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Your Email:</label>
                <input type="email" ref={emailref} required defaultValue={currentUser.email} className="form-input" readOnly />
            </div>
            <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" ref={passwordref} className="form-input" placeholder='Leave Blank to keep same' />
            </div>
            <div className="form-group">
                <label className="form-label">Password Confirmation</label>
                <input type="password" ref={passwordConfirmref} className="form-input" placeholder='Leave Blank to keep same'/>
            </div>
            <button disabled={loading} type="submit" className="form-button">
                Update
            </button>
            </form>
            <div className="login-redirect">
            Go Back to <Link to="/">Dashboard</Link>
            </div>
        </div>
    </div>

)
}
