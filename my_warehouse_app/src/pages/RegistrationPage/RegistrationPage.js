import { useHistory } from 'react-router-dom';
import CustomForm from '../../components/Form/CustomForm';
import './RegistrationPage.module.css';

function RegistrationPage() {
    const history = useHistory();

    function logInHandler() {
        history.push('/login')
    }

    return (
        <div className='centered'>
            <h2>Register here:</h2>
            <CustomForm
                firstLabel='E-mail@'
                secondLabel='Username'
                thirdLabel='Password'
                fourthLabel='Confirm-Password'
                fifthLabel='Country'
            />
            <div>
                <p>
                    Are you already registered? <span onClick={logInHandler}>Log in</span>
                </p>
            </div>
        </div>
    );
}

export default RegistrationPage;
