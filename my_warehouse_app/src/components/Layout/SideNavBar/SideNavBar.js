import { NavLink } from 'react-router-dom';
import { FaTable, FaWpforms } from 'react-icons/fa';
import classes from './SideNavBar.module.css'

const SideNavbar = () => {
    return (
        <div className={classes.sidebar}>
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.active} to='/products'>
                            <div>
                                <FaWpforms />
                                <p>Products</p>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to='/warehouses'>
                            <div>
                                <FaTable />
                                <p>Warehouses</p>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideNavbar;