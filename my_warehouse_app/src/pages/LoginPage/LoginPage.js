import CustomForm from '../../components/Form/CustomForm';

function LoginPage() {
    return (
        <div className='centered'>
            <div>
                <h2>Sign In:</h2>
            </div>
            <div>
                <CustomForm
                    firstLabel='E-mail@'
                    secondLabel='Username'
                    thirdLabel='Password:'
                />
            </div>
        </div>
    );
}

export default LoginPage;
