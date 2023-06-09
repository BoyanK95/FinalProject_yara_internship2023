import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../constants/url';

const AuthCtx = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (formData) => {},
    userData: {},
    token: ''
});

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(AuthCtx.isLoggedIn);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const sesionToken = sessionStorage.getItem('token');

        if (sesionToken) {
            setIsLoggedIn(true);
            const userData = JSON.parse(sessionStorage.getItem('userData'));
            setUserData(userData);
        }
    }, []);

    async function loginHandler(formData) {
        try {
            const response = await axios.post(`${url}/auth/signup`, {
                email: formData.firstInput,
                name: formData.secondInput,
                password: formData.thirdInput
            });
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('isLoggedIn', '1');
            setIsLoggedIn(true);
            setUserData({ email: formData.firstInput, name: formData.secondInput, password: formData.thirdInput });
            sessionStorage.setItem('userData', JSON.stringify(response.data.user));
            console.log('User has been Logged In!');
        } catch (error) {
            window.alert(`Failed to log in: ${error}!`);
        }
    }

    function logoutHandler() {
        console.log('User has Logged out!');
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userData');
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <AuthCtx.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
                userData: userData,
                token: sessionStorage.getItem('token')
            }}
        >
            {children}
        </AuthCtx.Provider>
    );
};

export default AuthCtx;
