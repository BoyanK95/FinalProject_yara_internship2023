import { Fragment, useContext } from 'react';
import SideNavbar from './SideNavBar/SideNavBar';
import TopHeader from './TopHeader/TopHeader';
import classes from './Layout.module.css';
import { useState } from 'react';
import AuthCtx from '../../context/authCtx';

const Layout = ({ children, onLogout }) => {
    const [sideBarIsVisible, setSideBarIsVisible] = useState(false);
    const ctx = useContext(AuthCtx)

    function toggleSideBarVisibleHandler() {
        if (ctx.token) {
            setSideBarIsVisible(!sideBarIsVisible);
        } else {
            setSideBarIsVisible(false)
        }
    }
    function showSideBarVisibleHandler() {
        if (ctx.token) {
            setSideBarIsVisible(true);
        }
    }

    return (
        <Fragment>
            <div
                className={classes.mainWrapper}
                onClick={toggleSideBarVisibleHandler}
                onMouseEnter={showSideBarVisibleHandler}
                // onMouseLeave={toggleSideBarVisibleHandler}
            >
                <TopHeader />
            </div>
            <main className={classes.main}>{children}</main>
            {sideBarIsVisible && <SideNavbar />}
        </Fragment>
    );
};

export default Layout;
