import { useState, useEffect } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';


const Header = () => {

    const { auth, setAuth } = useUserContext();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(auth ? true : false)
    }, [auth])

    const Logout = () => {
        setAuth(null)
        localStorage.removeItem('user');
        navigate('/login')
    }
    return (
        <header className='header'>
            <div className='logo' >
                <Link to='/'>GoalSetter</Link>
            </div>
            {isLoggedIn ?
            
                <ul >
                    <li onClick={() => Logout()} >
                        <FaSignOutAlt /> Logout
                    </li>
                </ul>
                :
                <ul >
                    <li >
                        <Link to="/login">
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                    <li >
                        <Link to="/register">
                            <FaUser /> Register
                        </Link>
                    </li>
                </ul>}

        </header>
    );
}

export default Header;
