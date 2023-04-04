import { NavLink } from 'react-router-dom';
import { FaProductHunt, FaWarehouse } from 'react-icons/fa';
import classes from './SideNavBar.module.css'

const SideNavbar = () => {
    return (
        <div className={classes.sidebar}>
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.active} to='/products'>
                            <div>
                                <FaProductHunt size={35}/>
                                <p>Products</p>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to='/warehouses'>
                            <div>
                                <FaWarehouse size={35}/>
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