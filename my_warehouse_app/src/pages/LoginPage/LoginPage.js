import { useState, useEffect } from 'react';
import CustomForm from '../../components/Form/CustomForm';

function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('isLoggedIn');

        if (storedUserInfo === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    function loginHandler(formData) {
        console.log(formData);
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    function logoutHandler() {
        setIsLoggedIn(false);
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
