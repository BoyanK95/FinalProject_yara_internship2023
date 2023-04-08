import { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Button from 'react-bootstrap/Button';
import useHttp from '../../hooks/use-http';
import classes from './ProductPage.module.css';
import Content from '../../components/Content/Content';
import { BlockSpiner } from '../../components/LoadingSpiner/BlocksSpiner';
// import ItemComponent from '../../components/ItemComponent/ItemComponent';

function ProductsPage() {
    const [productsAreVisible, setProductsAreVisible] = useState(false);
    const { data, error, isLoading } = useHttp('http://localhost:3001/products', 'GET', null, 1000);

    let btnText = 'Show Products';
    if (productsAreVisible) {
        btnText = 'Close Products';
    }

    function productsAreVisibleToggler() {
        setProductsAreVisible(!productsAreVisible);
    }

    console.log(data);

    return (
        <div className='centered'>
            <h1 className='title'>Welcome to the Products page!</h1>
            {!productsAreVisible && <Content item={'product'} />}
            {productsAreVisible && (
                <div>
                    {isLoading && <BlockSpiner />}
                    {!isLoading && error && !data && (
                        <>
                            <h2 className='bold'>Status code: {error?.response.status}</h2>
                            <h4 style={{ margin: '2rem' }}>{error?.response.statusText}!</h4>
                        </>
                    )}
                    {data && data.length > 0 && !isLoading && !error && (
                        <>
                            <h4>These are your products:</h4>
                            <div className={classes.container}>
                                {data.map((product) => {
                                    return (
                                        <div className={classes.product} key={product.id}>
                                            <ProductCard
                                                image={product.picture}
                                                title={product.name}
                                                hazardous={product.hazardous}
                                                quantity={product.quantity}
                                                unit={product.unit}
                                                backUpSrc={
                                                    'https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png'
                                                }
                                            >
                                                {product.description}
                                            </ProductCard>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                    {data && data.length === 0 && !isLoading && !error && <h4>There are no products to display!</h4>}
                </div>
            )}
            <Button onClick={productsAreVisibleToggler}>{btnText}</Button>
        </div>
    );
}

export default ProductsPage;
