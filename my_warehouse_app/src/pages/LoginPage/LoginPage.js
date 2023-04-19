import { useContext } from 'react';
import CustomForm from '../../components/Form/CustomForm';
import AuthCtx from '../../context/authCtx';

function LoginPage() {
    const ctx = useContext(AuthCtx);

    function loginHandler(formData) {
        ctx.onLogin(formData)
    }

    return (
        <div className='centered'>
            <div>
                <h2>Sign In:</h2>
            </div>
            <div>
                <CustomForm
                    onSubmit={loginHandler}
                    firstLabel='E-mail@'
                    secondLabel='Username'
                    thirdLabel='Password:'
                />
            </div>
        </div>
    );
}

export default LoginPage;
