import { useHistory } from 'react-router-dom';
import { BsFillClipboardDataFill, BsFillEmojiSunglassesFill } from 'react-icons/bs';
import classes from './HomePage.module.css';

function HomePage() {
    const history = useHistory();

    function goToWareHouses() {
        history.push('/warehouses');
    }

    function goToProducts() {
        history.push('/products');
    }

    return (
        <div className='centered'>
            <h1 className='title'>Welcome to our Warehouse App!</h1>
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
                    <BsFillClipboardDataFill size={40} />
                </div>
                <ul>
                    <li>
                        Track stock movement in and out of each <span onClick={goToWareHouses}>warehouse,</span>
                    </li>
                    <li>Manage hazardous and non-hazardous products separately,</li>
                    <li>
                        Record <span onClick={goToProducts}>product details</span> such as amount and date,
                    </li>
                    <li>Monitor <span onClick={goToWareHouses}>warehouse stock levels,</span></li>
                    <li>User-friendly interface for easy inventory management!</li>
                </ul>
            </div>
            <br></br>
            <div className={classes.features}>
                <h2 className='title'>Why Choose Us</h2>
                <BsFillEmojiSunglassesFill size={40} />
            </div>
            <p>
                Our inventory tracking system is designed to meet the specific needs of customers who require a robust
                and reliable solution for managing their warehouse inventory!
            </p>
        </div>
    );
}

export default HomePage;
