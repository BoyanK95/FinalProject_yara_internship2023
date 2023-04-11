import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import WarehousesPage from './pages/WarehousesPage/WarehousesPage';
import NotFound from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout/Layout';
import AuthCtx from './context/authCtx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(AuthCtx.isLoggedIn);

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
    }

    function logoutHandler() {
        console.log('User has logged out!');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    return (
        <AuthCtx.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}>
            <Layout>
                <Switch>
                    <Route path='/' exact>
                        <HomePage />
                    </Route>
                    <Route path='/products'>
                        <ProductsPage />
                    </Route>
                    <Route path='/warehouses'>
                        <WarehousesPage />
                    </Route>
                    <Route path='/register'>
                        <RegistrationPage />
                    </Route>
                    <Route path='/login'>
                        <LoginPage loginHandler={loginHandler} />
                    </Route>
                    <Route path='*'>
                        <NotFound />
                    </Route>
                </Switch>
            </Layout>
        </AuthCtx.Provider>
    );
}

export default App;
