import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useInput from '../../hooks/use-input';
import classes from './Form.module.css';
import isNotEmpty from '../../hooks/isNotEmpty';
import {useHistory} from 'react-router-dom'

const CustomForm = (props) => {
    const history = useHistory()

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
        isValid: fourthInputIsValid,
        hasError: fourthInputHasError,
        valueChangeHandler: fourthInputHandler,
        inputBlurHandler: fourthInputBlurHandler,
        reset: resetFourthInput
    } = useInput(isNotEmpty);

    let formIsValid = false;
    // console.log(formIsValid);

    if (firstInputIsValid && secondInputIsValid && thirdInputIsValid && fourthInputIsValid) {
        formIsValid = true;
    }

    function formSubmitHandler(e) {
        e.preventDefault();
        // console.log(formIsValid);
        if (!formIsValid) {
            return;
        }
        console.log('SIBMITED');
        console.log(firstInput);
        console.log(secondInput);
        console.log(thirdInput);
        console.log(fourthInput);

        // const id = Math.floor(Math.random() * 100000);
        // props.onSubmit({
        //     id: id,
        //     firstTd: firstInput,
        //     secondTd: secondInput,
        //     thirdTd: thirdInput,
        //     numberTd: fourthInput
        // });

        resetHandler();
    }

    function resetHandler() {
        resetFirstInput();
        resetSecondInput();
        resetThirdInput();
        resetFourthInput();
        
        history.push('/')
    }

    const regionInputClass = !firstInputHasError ? classes.input : classes.error;
    const calendarInputClass = !secondInputHasError ? classes.input : classes.error;
    const varietyInputClass = !thirdInputHasError ? classes.input : classes.error;
    const numberInputClass = !fourthInputHasError ? classes.input : classes.error;

    return (
        <>
            <Form className={classes.form} onSubmit={formSubmitHandler}>
                <div>
                    <div className={classes.container}>
                        <label htmlFor='region'>{props.firstLabel}</label>
                        <input
                            className={regionInputClass}
                            type='text'
                            name='region'
                            id='region-input'
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
                    <label htmlFor='calendar-name'>{props.secondLabel}</label>
                    <input
                        className={calendarInputClass}
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
                    <label htmlFor='variety'>{props.thirdLabel}</label>
                    <input
                        className={varietyInputClass}
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
                <div className={classes.container}>
                    <label htmlFor={props.numberLabel}>{props.fourthLabel}</label>
                    <input
                        className={numberInputClass}
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
