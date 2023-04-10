import WarehousesCard from '../../components/WarehousesCard/WarehousesCard';
import AddItemForm from '../../components/Form/AddItemForm/AddItemForm';
import Button from 'react-bootstrap/Button';
import Content from '../../components/Content/Content';
import Modal from '../../components/Modal/Modal';
import Card from 'react-bootstrap/Card';
import { BlockSpiner } from '../../components/LoadingSpiner/BlocksSpiner';
import useHttp from '../../hooks/use-http';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import classes from './WarehousesPage.module.css';

function WarehousesPage() {
    const [warehousesAreVisible, setWarehousesAreVisible] = useState(false);
    const [isAddingWarehouse, setIsAddingWarehouse] = useState(false);
    const { data, error, isLoading } = useHttp('http://localhost:3001/warehouses', 'GET', null, 1000);
    const history = useHistory();

    let warehouseVisibilityBtn = 'Show Warehouses';
    if (warehousesAreVisible) {
        warehouseVisibilityBtn = 'Close Warehouses';
    }

    function warehousesAreVisibleToggler() {
        setWarehousesAreVisible(!warehousesAreVisible);
    }

    function showAddWarehouseToggler() {
        setIsAddingWarehouse(!isAddingWarehouse);
    }

    function translateStringToBoolean(str) {
        return (str = 'true' ? true : false);
    }

    function translateStringToNumber(str) {
        return Number(str);
    }

    function addWarehouseHandler(data) {
        // console.log(data);
        // console.log({
        //     name: data.name,
        //     location: data.secondInput,
        //     storage: translateStringToNumber(data.numberInput),
        //     hazardous: translateStringToBoolean(data.hazardousInput),
        //     description: data.fourthInput,
        //     picture: data.thirdInput
        // });
        axios
            .post('http://localhost:3001/warehouses', {
                name: data.name,
                location: data.secondInput,
                storage: translateStringToNumber(data.numberInput),
                hazardous: translateStringToBoolean(data.hazardousInput),
                description: data.fourthInput,
                picture: data.thirdInput
            })
            .then((response) => {
                console.log(response.data);
                setIsAddingWarehouse(false);
            })
            .catch((error) => {
                console.log(error);
            });
        history.push('/warehouses');
        setIsAddingWarehouse(false);
    }

    console.log(data);

    return (
        <div className='centered'>
            <h1 className='title'>Welcome to the Warehouses page!</h1>
            {!warehousesAreVisible && <Content item={'warehouse'} />}
            {warehousesAreVisible && (
                <div>
                    {isLoading && <BlockSpiner />}
                    {!isLoading && error && !data && (
                        <>
                            {error.response.status && <h2 className='bold'>Status code: {error?.response.status}</h2>}
                            {error.response.statusText ? (
                                <h4 style={{ margin: '2rem' }}>{error?.response.statusText}!</h4>
                            ) : (
                                <h4>There has been a problem with the server</h4>
                            )}
                        </>
                    )}
                    {data && data.length > 0 && !isLoading && !error && (
                        <>
                            <h4>These are your warehouses:</h4>
                            <div className={classes.container}>
                                {data.map((warehouse) => {
                                    return (
                                        <div className={classes.warehouse} key={warehouse.id}>
                                            <WarehousesCard
                                                id={warehouse.id}
                                                image={warehouse.picture}
                                                title={warehouse.name}
                                                hazardous={warehouse.hazardous}
                                                location={warehouse.location}
                                                storage={warehouse.storage}
                                                createdAt={warehouse.createdAt}
                                                updatedAt={warehouse.updatedAt}
                                                backUpSrc={
                                                    'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1795385/warehouse-clipart-md.png'
                                                }
                                            >
                                                {warehouse.description}
                                            </WarehousesCard>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                    {data && data.length === 0 && !isLoading && !error && <h4>There are no products to display!</h4>}
                </div>
            )}
            {isAddingWarehouse && (
                <Modal onClose={showAddWarehouseToggler}>
                    <Card className={classes.addItemCard}>
                        <Card.Body>
                            <div>
                                <h3 style={{ textAlign: 'center' }}>Add Warehouse</h3>
                                <AddItemForm
                                    onSubmit={addWarehouseHandler}
                                    firstLabel='Storage Name'
                                    secondLabel='Location'
                                    thirdLabel='Picture*'
                                    fourthLabel='Description*'
                                    numberLabel='Storage'
                                    hazardousLabel='Hazardous'
                                    goTo='warehouses'
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Modal>
            )}
            <div>
                <Button className={classes.button} onClick={warehousesAreVisibleToggler}>
                    {warehouseVisibilityBtn}
                </Button>
                <Button variant='success' onClick={showAddWarehouseToggler}>
                    Add Warehouse
                </Button>
            </div>
        </div>
    );
}

export default WarehousesPage;
