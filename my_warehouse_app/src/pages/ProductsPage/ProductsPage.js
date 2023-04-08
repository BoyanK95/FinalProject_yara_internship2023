import { InfinitySpiner } from '../../components/LoadingSpiner/InfinitySpiner';
import useHttp from '../../hooks/use-http';
import classes from './ProductPage.module.css'

function ProductsPage() {
    const { data, error, isLoading } = useHttp('http://localhost:3001/products', 'GET', null, 1000);

    console.log(data);

    return (
        <div className='centered'>
            <h1 className='title'>Products Page</h1>
            <div className={classes.container}>
                {isLoading && <InfinitySpiner />}
                {!isLoading && error && (
                    <>
                        <h2 className='bold'>Status code: {error?.response.status}</h2>
                        <h4>{error?.response.statusText}!</h4>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductsPage;
