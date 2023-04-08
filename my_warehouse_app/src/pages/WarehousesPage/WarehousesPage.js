import { useState } from 'react';
import BootsrapCard from '../../components/Card/BootstrapCard';
import Button from 'react-bootstrap/Button';
import { InfinitySpiner } from '../../components/LoadingSpiner/InfinitySpiner';
import useHttp from '../../hooks/use-http';
import Content from '../../components/Content/Content';
import classes from './WarehousesPage.module.css'

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
            {/* <ItemComponent isLoading={isLoading} error={error} data={data} /> Doesn't work cause of how react components work, cause the first render is always null */}
            {warehousesAreVisible && (
                <div>
                    {isLoading && <InfinitySpiner />}
                    {!isLoading && error && !data && (
                        <>
                            <h2 className='bold'>Status code: {error?.response.status}</h2>
                            <h4 style={{margin: '2rem'}}>{error?.response.statusText}!</h4>
                        </>
                    )}
                    {data && !isLoading && !error &&(
                        <>
                            <h4>These are your warehouses:</h4>
                            <div className={classes.container}>
                                {data.map((product) => {
                                    return (
                                        <div className={classes.product} key={product.id}>
                                            <BootsrapCard
                                                image={product.picture}
                                                title={product.name}
                                                backUpSrc={
                                                    'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1795385/warehouse-clipart-md.png'
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

export default WarehousesPage;
