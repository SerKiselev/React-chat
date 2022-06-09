import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

import './MainHeader.scss';

export const MainHeader = () => {
    const history = useNavigate();

    const isLoginPage = window.location.pathname === '/login' || window.location.pathname === '/registration';

    const handleBackButton = () => {
        history('/');
    }

    const handleLoginButton = () => {
        history('/login');
    }

    const handleRegButton = () => {
        history('/registration');
    }

    const handleLogout = async () => {
        const auth = getAuth();
        await signOut(auth); // fix
    }

    return (
        <header className='headerContainer'>
            {isLoginPage ? <button className='backHeaderButton' onClick={handleBackButton}>Back</button> : null}
            <h1 className='headerTitle'>React Chat</h1>
            <button onClick={handleLogout}>Logout</button>
            {!isLoginPage ? <div className='authHeaderButton'>
                <button onClick={handleLoginButton}>Login</button>
                <button onClick={handleRegButton}>Registration</button>
            </div> : null}
        </header>
    );
}