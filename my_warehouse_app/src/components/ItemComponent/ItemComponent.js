import { InfinitySpiner } from '../../components/LoadingSpiner/InfinitySpiner';
import BootsrapCard from '../../components/Card/BootstrapCard';
import classes from './ItemComponent.module.css';

function ItemComponent({isLoading, error, data}) {
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
    </div>;
}

export default ItemComponent;
