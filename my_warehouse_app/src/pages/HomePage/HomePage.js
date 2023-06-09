import { useHistory } from 'react-router-dom';
import { BsFillClipboardDataFill, BsFillEmojiSunglassesFill } from 'react-icons/bs';
import classes from './HomePage.module.css';
import { useContext } from 'react';
import AuthCtx from '../../context/authCtx';
import NotAuthHomePage from './NotAuthHomePage'

function HomePage() {
    const ctx = useContext(AuthCtx);

    const history = useHistory();

    function goToWarehouses() {
        history.push('/warehouses');
    }

    function goToProducts() {
        history.push('/products');
    }

    if (!ctx.token) {
        return <NotAuthHomePage />;
    }
    return (
        <div className='centered'>
            <h1 className='title'>Welcome back {ctx.userData?.name}!</h1>
            <p>
                Our system helps you manage your warehouse inventory with ease. Whether you have hazardous or
                non-hazardous products, our solution provides a comprehensive tracking system to monitor the movement of
                products in and out of each warehouse.
            </p>
            <p>
                With our system, you can easily keep track of your warehouse stock levels, import or export products,
                record product details such as amount and date, and manage different warehouses for hazardous and
                non-hazardous products separately. Our user-friendly interface makes it simple to navigate and manage
                your inventory efficiently!
            </p>
            <div className={classes.featuresContainer}>
                <div className={classes.features}>
                    <h2 className='title'>Features</h2>
                    <BsFillClipboardDataFill color='darkblue' size={40} />
                </div>
                <ul>
                    <li>
                        Track stock movement in and out of each <span onClick={goToWarehouses}>warehouse,</span>
                    </li>
                    <li>
                        Manage <span className='dangerous'>hazardous</span> and non-hazardous products separately,
                    </li>
                    <li>
                        Record <span onClick={goToProducts}>product details</span> such as amount and date,
                    </li>
                    <li>
                        Monitor <span onClick={goToWarehouses}>warehouse stock levels,</span>
                    </li>
                    <li>User-friendly interface for easy inventory management!</li>
                </ul>
            </div>
            <br></br>
            <div className={classes.features}>
                <h2 className='title'>Why Choose Us</h2>
                <BsFillEmojiSunglassesFill color='brown' size={40} />
            </div>
            <p>
                Our inventory tracking system is designed to meet the specific needs of customers who require a robust
                and reliable solution for managing their warehouse inventory!
            </p>
        </div>
    );
}

export default HomePage;
