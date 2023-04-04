import LogoImg from '../../LogoImg/LogoImg'
import Button from 'react-bootstrap/Button';
import classes from './TopHeader.module.css'


const TopHeader = (props) => {
    return (
        <header>
            <div className={classes.background}>
                <LogoImg />
                <h1>Warehouse React App</h1>
                <Button>Log out</Button>
            </div>
        </header>
    );
};

export default TopHeader;