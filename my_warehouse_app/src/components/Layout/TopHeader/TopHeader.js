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
    
    return (
        <header>
            <div className={classes.background}>
                <LogoImg />
                <h1>Warehouse React App</h1>
                {isLoggedIn ? <Button>Log out</Button> : <Button onClick={navigateRegister}>Register</Button>}
            </div>
        </header>
    );
};

export default TopHeader;