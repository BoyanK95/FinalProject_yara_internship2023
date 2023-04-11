import LogoImg from '../../LogoImg/LogoImg'
import Button from 'react-bootstrap/Button';
import classes from './TopHeader.module.css'
import { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import AuthCtx from '../../../context/authCtx';



const TopHeader = (props) => {
    const ctx = useContext(AuthCtx)
    console.log(ctx);

    const history = useHistory()

    function navigateRegister() {
        history.push('/register')
    }

    
    return (
        <header>
            <div className={classes.background}>
                <LogoImg />
                <h1>Warehouse React App</h1>
                {ctx.isLoggedIn ? <Button className={classes.mainNavBtn} onClick={ctx.onLogout} >Log out</Button> : <Button className={classes.mainNavBtn} onClick={navigateRegister}>Register</Button>}
            </div>
        </header>
    );
};

export default TopHeader;