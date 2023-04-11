import LogoImg from '../../LogoImg/LogoImg'
import Button from 'react-bootstrap/Button';
import classes from './TopHeader.module.css'
import { useState } from 'react';
import { useHistory } from "react-router-dom";



const TopHeader = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const history = useHistory()

    function navigateRegister() {
        history.push('/register')
    }

    function logOutHandler(params) {
        console.log('User has logged out!');
    }
    
    return (
        <header>
            <div className={classes.background}>
                <LogoImg />
                <h1>Warehouse React App</h1>
                {isLoggedIn ? <Button className={classes.mainNavBtn} onClick={logOutHandler} >Log out</Button> : <Button className={classes.mainNavBtn} onClick={navigateRegister}>Register</Button>}
            </div>
        </header>
    );
};

export default TopHeader;