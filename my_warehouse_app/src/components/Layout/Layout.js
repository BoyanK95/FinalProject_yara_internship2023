import { Fragment } from 'react';
import SideNavbar from './SideNavBar/SideNavBar';
import TopHeader from './TopHeader/TopHeader';
import classes from './Layout.module.css';
import { useState } from 'react';

const Layout = ({ children }) => {
    const [sideBarIsVisible, setSideBarIsVisible] = useState(false);

    function toggleSideBarVisibleHandler() {
        setSideBarIsVisible(!sideBarIsVisible);
    }
    function showSideBarVisibleHandler() {
        setSideBarIsVisible(true);
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
