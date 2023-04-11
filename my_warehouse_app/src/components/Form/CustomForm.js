import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useInput from '../../hooks/use-input';
import classes from './Form.module.css';
import isNotEmpty from '../../hooks/isNotEmpty';
import { useHistory } from 'react-router-dom';
import { passwordValidator } from '../../hooks/passwordValidator';

const CustomForm = (props) => {
    const history = useHistory();

    const {
        value: firstInput,
        isValid: firstInputIsValid,
        hasError: firstInputHasError,
        valueChangeHandler: firstInputHandler,
        inputBlurHandler: firstInputBlurHandler,
        reset: resetFirstInput
    } = useInput(isNotEmpty);

    const {
        value: secondInput,
        isValid: secondInputIsValid,
        hasError: secondInputHasError,
        valueChangeHandler: secondInputNameHandler,
        inputBlurHandler: secondInputBlurHandler,
        reset: resetSecondInput
    } = useInput(isNotEmpty);

    const {
        value: thirdInput,
        isValid: thirdInputIsValid,
        hasError: thirdInputHasError,
        valueChangeHandler: thirdInputHandler,
        inputBlurHandler: thirdInputBlurHandler,
        reset: resetThirdInput
    } = useInput(isNotEmpty);

    const {
        value: fourthInput,
        // isValid: fourthInputIsValid,
        hasError: fourthInputHasError,
        valueChangeHandler: fourthInputHandler,
        inputBlurHandler: fourthInputBlurHandler,
        reset: resetFourthInput
    } = useInput(isNotEmpty);

    const {
        value: fifthInput,
        // isValid: fifthInputIsValid,
        hasError: fifthInputHasError,
        valueChangeHandler: fifthInputHandler,
        inputBlurHandler: fifthInputBlurHandler,
        reset: resetFifthInput
    } = useInput(isNotEmpty);

    let formIsValid = false;
    // console.log(formIsValid);

    if (firstInputIsValid && secondInputIsValid && thirdInputIsValid) {
        formIsValid = true;
    }

    function formSubmitHandler(e) {
        e.preventDefault();
        // console.log(formIsValid);
        if (!formIsValid) {
            return;
        }
        const passwordsCheck = passwordValidator(thirdInput, fourthInput);
        // if (fourthInput) {
        //     if (fourthInput !== thirdInput) {
        //         return alert("Passwords don't match!");
        //     }
        //     if (thirdInput.length <= 5 ) {
        //         return alert('Password must be at least 5 digits long')
        //     }
        // }
        console.log(passwordsCheck);
        if (passwordsCheck) {
            console.log('SIBMITED');
            // console.log(firstInput);
            // console.log(secondInput);
            // console.log(thirdInput);
            // console.log(fourthInput);
            // console.log(fifthInput);

            props.onSubmit({
                firstInput,
                secondInput,
                thirdInput,
                fourthInput,
                fifthInput
            });

            resetHandler();
        } else {
            formIsValid = false
        }
    }

    function resetHandler() {
        resetFirstInput();
        resetSecondInput();
        resetThirdInput();
        resetFourthInput();
        resetFifthInput();

        history.push('/');
    }

    const firsthInputClass = !firstInputHasError ? classes.input : classes.error;
    const secondInputClass = !secondInputHasError ? classes.input : classes.error;
    const thirdhInputClass = !thirdInputHasError ? classes.input : classes.error;
    const fourthInputClass = !fourthInputHasError ? classes.input : classes.error;
    const fifthInputClass = !fifthInputHasError ? classes.input : classes.error;

    return (
        <>
            <Form className={classes.form} onSubmit={formSubmitHandler}>
                <div>
                    <div className={classes.container}>
                        <label htmlFor='firstInput'>{props.firstLabel}</label>
                        <input
                            className={firsthInputClass}
                            type='text'
                            name='firstInput'
                            id='firstInput'
                            onBlur={firstInputBlurHandler}
                            onChange={firstInputHandler}
                            value={firstInput}
                        />
                        {firstInputHasError && (
                            <p className={classes.errorText}>Value of {props.firstLabel} is required!</p>
                        )}
                    </div>
                </div>
                <div className={classes.container}>
                    <label htmlFor={props.secondLabel}>{props.secondLabel}</label>
                    <input
                        className={secondInputClass}
                        type='text'
                        name='secondInput'
                        onBlur={secondInputBlurHandler}
                        onChange={secondInputNameHandler}
                        value={secondInput}
                    />
                    {secondInputHasError && (
                        <p className={classes.errorText}>Value of {props.secondLabel} is required!</p>
                    )}
                </div>
                <div className={classes.container}>
                    <label htmlFor={props.thirdLabel}>{props.thirdLabel}</label>
                    <input
                        className={thirdhInputClass}
                        type='password'
                        name='password'
                        onBlur={thirdInputBlurHandler}
                        onChange={thirdInputHandler}
                        value={thirdInput}
                    />
                    {thirdInputHasError && (
                        <p className={classes.errorText}>Value of {props.thirdLabel} is required!</p>
                    )}
                </div>
                {props.fourthLabel && (
                    <div className={classes.container}>
                        <label htmlFor={props.fourthLabel}>{props.fourthLabel}</label>
                        <input
                            className={fourthInputClass}
                            type='password'
                            name='fourthInput'
                            onBlur={fourthInputBlurHandler}
                            onChange={fourthInputHandler}
                            value={fourthInput}
                        />
                        {fourthInputHasError && (
                            <p className={classes.errorText}>Value of {props.fourthLabel} is required!</p>
                        )}
                    </div>
                )}
                {props.fifthLabel && (
                    <div className={classes.container}>
                        <label htmlFor={props.fifthLabel}>{props.fifthLabel}</label>
                        <input
                            className={fifthInputClass}
                            type='text'
                            maxLength={2}
                            name='fifthInput'
                            onBlur={fifthInputBlurHandler}
                            onChange={fifthInputHandler}
                            value={fifthInput}
                        />
                        {fifthInputHasError && (
                            <p className={classes.errorText}>Value of {props.fifthLabel} is required!</p>
                        )}
                    </div>
                )}

                <div className={classes.btnContainer}>
                    <Button className={classes.button} variant='danger' type='button' onClick={resetHandler}>
                        Cancel
                    </Button>

                    <Button className={classes.button} variant='primary' type='submit' disabled={!formIsValid}>
                        Save
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default CustomForm;
