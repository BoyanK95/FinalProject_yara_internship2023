import { Fragment } from 'react';
import SideNavbar from './SideNavBar/SideNavBar';
import TopHeader from './TopHeader/TopHeader';
import classes from './Layout.module.css'

const Layout = ({ children }) => {
    return (
        <Fragment>
            <TopHeader />
            <SideNavbar />
            <main className={classes.main}>{children}</main>
        </Fragment>
    );
};

export default Layout;