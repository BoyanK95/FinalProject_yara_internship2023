import { useHistory } from 'react-router-dom';
import './NotLoggedInPage.module.css'

const NotLoggedInPage = () => {
    const history = useHistory();

    return (
        <div>
            <h2 className='title'>Hi there!</h2>
            <h4>You seem to be lost! This section is for registered users only.</h4>
            <p>
                If you haven't registered yet, you can{' '}
                <span onClick={() => history.push('/register')}>register from here!</span>
            </p>
            <p>
                If you already have an account, you can{' '}
                <span onClick={() => history.push('/login')}>login from here!</span>
            </p>
            <p>
                If you're not sure what to do, you can always go back to the{' '}
                <span onClick={() => history.goBack()}>previous page</span> or go to the{' '}
                <span onClick={() => history.push('/')}>homepage</span>.
            </p>
        </div>
    );
};

export default NotLoggedInPage;
