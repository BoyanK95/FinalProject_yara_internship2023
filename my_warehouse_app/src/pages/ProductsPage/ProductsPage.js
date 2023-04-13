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
import axios from 'axios'
import classes from './ProductPage.module.css';
import { translateStringToNumber } from '../../hooks/translateStringToNumber';
import { translateStringToBoolean } from '../../hooks/translateStringToBoolean';
import { url } from '../../constants/url';
// import ItemComponent from '../../components/ItemComponent/ItemComponent';

function ProductsPage() {
    const [productsAreVisible, setProductsAreVisible] = useState(false);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const { data, error, isLoading } = useHttp(`${url}/products`, 'GET', null, 2000);
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

    function addProductHandler(data) {
        console.log(data);
        axios
            .post(`${url}/products`, {
                name: data.name,
                unit: data.secondInput,
                quantity: translateStringToNumber(data.numberInput),
                hazardous: translateStringToBoolean(data.hazardousInput),
                description: data.fourthInput,
                picture: data.thirdInput
            })
            .then((response) => {
                console.log(response.data);
                setIsAddingProduct(false);
            })
            .catch((error) => {
                console.log(error);
            });
        history.push('/products');
        // setIsAddingProduct(false);
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
                                                id={product.id}
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
                                <h3 style={{ textAlign: 'center' }}>Add Product:</h3>
                                <AddItemForm
                                    onSubmit={addProductHandler}
                                    firstLabel='Product Name'
                                    secondLabel='Unit Of Measure'
                                    thirdLabel='Picture*'
                                    fourthLabel='Description*'
                                    numberLabel='Quantity'
                                    hazardousLabel='Hazardous'
                                    goTo='products'
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
