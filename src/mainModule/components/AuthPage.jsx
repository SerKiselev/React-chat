import React, { useState } from 'react';
import { Layout } from './Layout.jsx';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import './AuthPage.scss';

export const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const auth = getAuth(); // fix

    const isLoginPage = window.location.pathname === '/login';

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            if (!isLoginPage) {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(auth.currentUser, { displayName });
            } else {
                const { user } = await signInWithEmailAndPassword(auth, email, password);
            }

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
        }
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
                        <input
                            className='authPagePasswordField' // fix this
                            type='text'
                            placeholder='Type Your Name'
                            value={displayName}
                            onChange={handleDisplayNameChange}
                        />
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}