import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthCtx = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (formData) => {},
    userData: {}
});

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(AuthCtx.isLoggedIn);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('isLoggedIn');
        const sesionToken = localStorage.getItem('token');

        if (sesionToken) {
            setIsLoggedIn(true);
            const userData = localStorage.getItem('userData');
            setUserData(userData);
        }
    }, []);

    async function loginHandler(formData) {
        try {
            const response = await axios.post('http://localhost:3001/auth/signup', { email: formData.firstInput, name: formData.secondInput, password: formData.thirdInput });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isLoggedIn', '1');
            setIsLoggedIn(true);
            setUserData({ email: formData.firstInput, name: formData.secondInput, password: formData.thirdInput });
            localStorage.setItem('userData', userData)
            console.log('User has been Logged In!');
        } catch (error) {
            window.alert(error)
        }
    }
    

    function logoutHandler() {
        console.log('User has Logged out!');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <AuthCtx.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
                userData: userData
            }}
        >
            {children}
        </AuthCtx.Provider>
    );
};

export default AuthCtx;
