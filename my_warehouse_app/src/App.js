import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import WarehousesPage from './pages/WarehousesPage/WarehousesPage';
import NotFound from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout/Layout';
import NotLoggedInPage from './pages/NotLogedInPage/NotLoggedInPage';
import { useContext } from 'react';
import AuthCtx from './context/authCtx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const ctx = useContext(AuthCtx)
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/products'>{ctx.isLoggedIn ? <ProductsPage /> : <NotLoggedInPage />}</Route>
                <Route path='/warehouses'>{ctx.isLoggedIn ? <WarehousesPage /> : <NotLoggedInPage />}</Route>
                <Route path='/register'>
                    <RegistrationPage />
                </Route>
                <Route path='/login'>
                    <LoginPage loginHandler={ctx.onLogin} />
                </Route>
                <Route path='*'>
                    <NotFound />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
