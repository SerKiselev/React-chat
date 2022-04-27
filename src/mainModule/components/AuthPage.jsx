import React, { useState } from 'react';
import { Layout } from './Layout.jsx';
import './AuthPage.scss';

export const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isLoginPage = window.location.pathname === '/login';

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        // if (isLoginPage) return login actions

        // Registration actions
    }

    return (
        <Layout>
            <div className='authPageContainer'>
                <div className='authPageFormContainer'>
                    <p>{isLoginPage ? 'Login' : 'Registration'}</p>
                    <form className='authPageForm' onSubmit={handleSubmitForm}>
                        <input 
                            className='authPageEmailField' 
                            type='email' 
                            placeholder='Type Email'
                            value={email} 
                            onChange={handleEmailChange} 
                        />
                        <input 
                            className='authPagePasswordField' 
                            type='password'
                            placeholder='Type Password'
                            value={password}
                            onChange={handlePasswordChange} 
                        />
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}