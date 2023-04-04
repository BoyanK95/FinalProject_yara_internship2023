import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import WarehouseMovementsPage from './pages/WarehousesPage/WarehouseMovementsPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './pages/NotFoundPage/NotFoundPage';

function App() {
    return (
        <>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/products'>
                    <ProductsPage />
                </Route>
                <Route path='/warehouses'>
                    <WarehouseMovementsPage />
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
        </>
    );
}

export default App;
