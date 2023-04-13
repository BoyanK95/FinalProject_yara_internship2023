import { NavLink } from 'react-router-dom';
import { FaProductHunt, FaWarehouse } from 'react-icons/fa';
import classes from './SideNavBar.module.css'
import {BsReverseLayoutTextWindowReverse} from "react-icons/bs";
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
                    <li>
                        <NavLink activeClassName={classes.active} to='/movements'>
                            <div>
                                <BsReverseLayoutTextWindowReverse size={35}/>
                                <p>Movements</p>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideNavbar;