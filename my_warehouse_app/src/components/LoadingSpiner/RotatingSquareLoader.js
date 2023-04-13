import { RotatingSquare } from 'react-loader-spinner';
import classes from './RotatingSquareLoader.module.css'

export const RotatingSquareLoader = () => (
    <div className={classes.loadingContainer}>
        <h3>Loading...</h3>
        <RotatingSquare
            height='100'
            width='100'
            color='darkblue'
            ariaLabel='rotating-square-loading'
            strokeWidth='4'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
        />
    </div>
);

export default RotatingSquareLoader