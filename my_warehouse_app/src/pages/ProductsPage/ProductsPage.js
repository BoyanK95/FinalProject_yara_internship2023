import { useState } from 'react';
import BootsrapCard from '../../components/Card/BootstrapCard';
import Button from 'react-bootstrap/Button';
import { InfinitySpiner } from '../../components/LoadingSpiner/InfinitySpiner';
import useHttp from '../../hooks/use-http';
import classes from './ProductPage.module.css';
import Content from '../../components/Content/Content';
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
            {/* <ItemComponent isLoading={isLoading} error={error} data={data} /> Doesn't work cause of how react components work, cause the first render is always null */}
            {productsAreVisible && (
                <div>
                    {isLoading && <InfinitySpiner />}
                    {!isLoading && error && (
                        <>
                            <h2 className='bold'>Status code: {error?.response.status}</h2>
                            <h4>{error?.response.statusText}!</h4>
                        </>
                    )}
                    {data && !isLoading && (
                        <>
                            <h4>These are your products:</h4>
                            <div className={classes.container}>
                                {data.map((product) => {
                                    return (
                                        <div className={classes.product} key={product.id}>
                                            <BootsrapCard
                                                image={product.picture}
                                                title={product.name}
                                                backUpSrc={
                                                    'https://www.4me.com/wp-content/uploads/2018/01/4me-icon-product.png'
                                                }
                                            >
                                                {product.description}
                                            </BootsrapCard>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            )}
            <Button onClick={productsAreVisibleToggler}>{btnText}</Button>
        </div>
    );
}

export default ProductsPage;
