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

function App() {
    return (
        <AuthCtx.Provider value={{isLoggedIn: false}}>
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
                        <LoginPage />
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
