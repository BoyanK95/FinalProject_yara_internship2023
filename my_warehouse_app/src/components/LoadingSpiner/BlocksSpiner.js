import { Blocks } from 'react-loader-spinner';

export const BlockSpiner = () => (
    <>
        <h3>Loading...</h3>
        <Blocks
            visible={true}
            height='80'
            width='80'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
        />
    </>
);
