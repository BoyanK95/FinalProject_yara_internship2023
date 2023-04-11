import React from 'react';

const AuthCtx = React.createContext({
    isLoggedIn: false,
    onLogout: () => {}
});

export default AuthCtx;
