import { useNavigate } from 'react-router-dom';
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

    return (
        <header className='headerContainer'>
            {isLoginPage ? <button className='backHeaderButton' onClick={handleBackButton}>Back</button> : null}
            <h1 className='headerTitle'>React Chat by Sergey Kiselev</h1>
            {!isLoginPage ? <div className='authHeaderButton'>
                <button onClick={handleLoginButton}>Login</button>
                <button onClick={handleRegButton}>Registration</button>
            </div> : null}
        </header>
    );
}