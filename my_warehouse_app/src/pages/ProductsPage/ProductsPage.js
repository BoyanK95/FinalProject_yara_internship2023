import ProductCard from '../../components/ProductCard/ProductCard';
import Button from 'react-bootstrap/Button';
import Content from '../../components/Content/Content';
import Modal from '../../components/Modal/Modal';
import Card from 'react-bootstrap/Card';
import AddItemForm from '../../components/Form/AddItemForm/AddItemForm';
import { BlockSpiner } from '../../components/LoadingSpiner/BlocksSpiner';
import useHttp from '../../hooks/use-http';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import classes from './ProductPage.module.css';
// import ItemComponent from '../../components/ItemComponent/ItemComponent';

function ProductsPage() {
    const [productsAreVisible, setProductsAreVisible] = useState(false);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const { data, error, isLoading } = useHttp('http://localhost:3001/products', 'GET', null, 1000);
    const history = useHistory();

    let btnText = 'Show Products';
    if (productsAreVisible) {
        btnText = 'Close Products';
    }

    function productsAreVisibleToggler() {
        setProductsAreVisible(!productsAreVisible);
    }

    function showAddProductToggler() {
        setIsAddingProduct(!isAddingProduct);
    }

    function addWarehouseHandler(data) {
        console.log(data);
        history.push('/warehouses');
        setIsAddingProduct(false);
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
                                                createdAt={product.createdAt}
                                                updatedAt={product.updatedAt}
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
            {isAddingProduct && (
                <Modal onClose={showAddProductToggler}>
                    <Card className={classes.addItemCard}>
                        <Card.Body>
                            <div>
                                <h3 style={{ textAlign: 'center' }}>Add Warehouse</h3>
                                <AddItemForm
                                    onSubmit={addWarehouseHandler}
                                    firstLabel='Product Name'
                                    secondLabel='Unit Of Measure'
                                    thirdLabel='Picture*'
                                    fourthLabel='Description*'
                                    numberLabel='Quantity'
                                    hazardousLabel='Hazardous'
                                    goTo='warehouses'
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Modal>
            )}
            <div>
                <Button className={classes.button} onClick={productsAreVisibleToggler}>
                    {btnText}
                </Button>
                <Button variant='success' onClick={showAddProductToggler}>
                    Add Product
                </Button>
            </div>
        </div>
    );
}

export default ProductsPage;
