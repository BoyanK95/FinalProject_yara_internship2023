import { RotatingSquare } from 'react-loader-spinner';

export const RotatingSquareLoader = () => (
    <>
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
    </>
);

export default RotatingSquareLoader