import { useState } from 'react';
import WarehousesCard from '../../components/WarehousesCard/WarehousesCard';
import Button from 'react-bootstrap/Button';
import useHttp from '../../hooks/use-http';
import Content from '../../components/Content/Content';
import classes from './WarehousesPage.module.css';
import { BlockSpiner } from '../../components/LoadingSpiner/BlocksSpiner';

function WarehousesPage() {
    const [warehousesAreVisible, setWarehousesAreVisible] = useState(false);
    const { data, error, isLoading } = useHttp('http://localhost:3001/warehouses', 'GET', null, 1000);

    let btnText = 'Show Warehouses';
    if (warehousesAreVisible) {
        btnText = 'Close Warehouses';
    }

    function productsAreVisibleToggler() {
        setWarehousesAreVisible(!warehousesAreVisible);
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
            <Button className={classes.button} onClick={productsAreVisibleToggler}>
                {btnText}
            </Button>
        </div>
    );
}

export default WarehousesPage;
