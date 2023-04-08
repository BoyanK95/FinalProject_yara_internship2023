import { InfinitySpiner } from '../../components/LoadingSpiner/InfinitySpiner';
import useHttp from '../../hooks/use-http';
import axios from 'axios';

function ProductsPage() {
   const {data, error, isLoading} = useHttp('http://localhost:3001/products')
   

    axios
        .get('http://localhost:3001/products')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    return (
        <div className='centered'>
            <h1 className='title'>Products Page</h1>
            {isLoading && <InfinitySpiner />}
            {/* {error && <h3>Error: {error}!</h3>} */}
        </div>
    );
}

export default ProductsPage;
