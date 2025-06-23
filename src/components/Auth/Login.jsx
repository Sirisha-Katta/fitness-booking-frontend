import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../api/api';
import './Login.css'
const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ email, password }); 
            onLogin(userData); 
            history.push('/classes');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div
            style={{
                maxWidth: '500px',
                width: '100%',
                margin: '2rem auto',
                padding: '3rem 2.5rem',
                borderRadius: '20px',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{ display: 'flex', justifyContent: 'center' }}>Login</button>
            </form>
        </div>
    );
};

export default Login;
