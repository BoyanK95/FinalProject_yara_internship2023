import CustomForm from "../../components/Form/CustomForm";
import './RegistrationPage.module.css'

function RegistrationPage() {

    return (
        <div className="centered">
            <h2>Register here:</h2>
            <CustomForm firstLabel='Username:' secondLabel='E-mail@:' thirdLabel='Password:' fourthLabel='Confirm-Password:'/>
            <div>
                <p>Are you already registered?</p>
            </div>
        </div>
    );
}

export default RegistrationPage;
