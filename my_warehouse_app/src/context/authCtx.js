import React, { useState } from 'react';
import { useEffect } from 'react';

const AuthCtx = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (formData) => {}
});

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(AuthCtx.isLoggedIn);
    const [userData, setUserData] = useState()

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('isLoggedIn');

        if (storedUserInfo === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    function loginHandler(formData) {
        console.log(formData);
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
        setUserData(formData)
        console.log('User has been Loged In!');
    }

    function logoutHandler() {
        console.log('User has Logged out!');
        localStorage.removeItem('isLoggedIn');
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
