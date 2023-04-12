import { BsFillEmojiSunglassesFill } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import classes from './NotAuthHomePage.module.css';

const NotAuthHomePage = () => {
    const history = useHistory();
    return (
        <div className='centered'>
            <h1 className='title'>Welcome to our Inventory Tracking System!</h1>
            <div className={classes.content}>
                <p>
                    Our system helps you manage your warehouse inventory with ease. Whether you have hazardous or
                    non-hazardous products, our solution provides a comprehensive tracking system to monitor the
                    movement of products in and out of each warehouse.
                </p>
                <p>
                    To start using our system, please <span onClick={() => history.push('/register')}>register</span> or{' '}
                    <span onClick={() => history.push('/login')}>log in</span> if you already have an account.
                </p>
            </div>
            <div>
                <div className={classes.features}>
                    <h2 className='title'>Why Choose Us</h2>
                    <BsFillEmojiSunglassesFill color='brown' size={40} />
                </div>
                <p>
                    Our inventory tracking system is designed to meet the specific needs of customers who require a
                    robust and reliable solution for managing their warehouse inventory!
                </p>
            </div>
        </div>
    );
};

export default NotAuthHomePage;
