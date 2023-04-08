import { useState } from 'react';
import BootsrapCard from '../../components/Card/BootstrapCard';
import Button from 'react-bootstrap/Button';
import { InfinitySpiner } from '../../components/LoadingSpiner/InfinitySpiner';
import useHttp from '../../hooks/use-http';
import classes from './ProductPage.module.css';

function ProductsPage() {
    const [productsAreVisible, setProductsAreVisible] = useState(false);
    const { data, error, isLoading } = useHttp('http://localhost:3001/products', 'GET', null, 1000);

    console.log(data);

    return (
        <div className='centered'>
            <h1 className='title'>Products Page</h1>
            <div>
                <p>
                    "Welcome to the products page, where you can manage and update all your products in one place.
                    Browse through your inventory, edit details, and add new items to your collection. Keep your
                    customers engaged and satisfied with the latest products available at your store. Let's get
                    started!"
                </p>
            </div>
            <div>
                {isLoading && <InfinitySpiner />}
                {!isLoading && error && (
                    <>
                        <h2 className='bold'>Status code: {error?.response.status}</h2>
                        <h4>{error?.response.statusText}!</h4>
                    </>
                )}
                {data && !isLoading && (
                    <div className={classes.container}>
                        {data.map((product) => {
                            return (
                                <div className={classes.product} key={product.id}>
                                    <BootsrapCard title={product.name}>{product.description}</BootsrapCard>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <Button>Show Products</Button>
        </div>
    );
}

export default ProductsPage;
