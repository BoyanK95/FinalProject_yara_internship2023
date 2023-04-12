import { useHistory } from 'react-router-dom';
import CustomForm from '../../components/Form/CustomForm';
import './RegistrationPage.module.css';
import { useContext } from 'react';
import AuthCtx from '../../context/authCtx';

function RegistrationPage() {
    const ctx = useContext(AuthCtx)
    const history = useHistory();

    function registrationHandler(formData) {
        console.log(formData); 
        ctx.onLogin(formData)
    }

    function goToLoginPage() {
        history.push('/login')
    }

    return (
        <div className='centered'>
            <h2>Register here:</h2>
            <div className='mainContainer'>
            <CustomForm
                onSubmit={registrationHandler}
                firstLabel='E-mail@'
                secondLabel='Username'
                thirdLabel='Password'
                fourthLabel='Confirm-Password'
                // fifthLabel='Country'
            />
            </div>
            <div>
                <p>
                    Are you already registered? <span onClick={goToLoginPage}>Log in</span>
                </p>
            </div>
        </div>
    );
}

export default RegistrationPage;
