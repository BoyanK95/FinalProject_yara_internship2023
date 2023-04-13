import RotatingSquareLoader from '../../components/LoadingSpiner/RotatingSquareLoader';
import { url } from '../../constants/url';
import useHttp from '../../hooks/use-http';
import DarkTable from '../../components/DarkTable/DarkTable'
import classes from './MovementsPage.module.css';

function MovementsPage() {
    const { data, error, isLoading } = useHttp(`${url}/movements`, 'GET', null, 50000); //http://localhost:3001/movements

    return (
        <div>
            <h4 className='title'>These are your movements:</h4>
            <div className={classes.container}>
                {isLoading && <RotatingSquareLoader />}
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
                        <DarkTable data={data}/>
                    </>
                )}
                {data && data.length === 0 && !isLoading && !error && <h4>There are no movements to display!</h4>}
            </div>
        </div>
    );
}

export default MovementsPage