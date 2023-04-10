import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useInput from '../../../hooks/use-input';
import classes from './AddItemForm.module.css'
import isNotEmpty from '../../../hooks/isNotEmpty';
import { useHistory } from 'react-router-dom';

const AddItemForm = (props) => {
    const history = useHistory();

    const {
        value: name,
        isValid: nameInputIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameInputHandler,
        inputBlurHandler: nameInputBlurHandler,
        reset: resetNameInput
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
        value: numberInput,
        isValid: numberInputIsValid,
        hasError: numberInputHasError,
        valueChangeHandler: numberInputHandler,
        inputBlurHandler: numberInputBlurHandler,
        reset: resetNumberInput
    } = useInput(isNotEmpty);

    const {
        value: hazardousInput,
        isValid: hazardousInputIsValid,
        hasError: hazardousInputHasError,
        valueChangeHandler: hazardousInputHandler,
        inputBlurHandler: hazardousInputBlurHandler,
        reset: resetHazardousInput
    } = useInput(isNotEmpty);

    let formIsValid = false;
    // console.log(formIsValid);

    if (nameInputIsValid && secondInputIsValid && numberInputIsValid && hazardousInputIsValid) {
        formIsValid = true;
    }

    function formSubmitHandler(e) {
        e.preventDefault();
        // console.log(formIsValid);
        if (!formIsValid) {
            return;
        }
        console.log('SIBMITED');
        // console.log(name);
        // console.log(secondInput);
        // console.log(thirdInput);
        // console.log(fourthInput);
        // console.log(numberInput);

        props.onSubmit({
            name,
            secondInput,
            thirdInput,
            fourthInput,
            numberInput,
            hazardousInput
        });

        resetHandler();
    }

    function resetHandler() {
        resetNameInput();
        resetSecondInput();
        resetThirdInput();
        resetFourthInput();
        resetNumberInput();
        resetHazardousInput()

        history.push(`/${props.goTo}`);
    }

    const firsthInputClass = !nameInputHasError ? classes.input : classes.error;
    const secondInputClass = !secondInputHasError ? classes.input : classes.error;
    const thirdhInputClass = !thirdInputHasError ? classes.input : classes.error;
    const fourthInputClass = !fourthInputHasError ? classes.input : classes.error;
    const numberInputClass = !numberInputHasError ? classes.input : classes.error;
    // const hazardousInputClass = !hazardousInputHasError ? classes.input : classes.error;

    return (
        <>
            <Form className={classes.form} onSubmit={formSubmitHandler}>
                <div>
                    <div className={classes.container}>
                        <label htmlFor='name'>{props.firstLabel}</label>
                        <input
                            className={firsthInputClass}
                            type='text'
                            name='name'
                            id='name'
                            onBlur={nameInputBlurHandler}
                            onChange={nameInputHandler}
                            value={name}
                        />
                        {nameInputHasError && (
                            <p className={classes.errorText}>Value of {props.firstLabel} is required!</p>
                        )}
                    </div>
                </div>
                <div className={classes.container}>
                    <label htmlFor='calendar-name'>{props.secondLabel}</label>
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
                    <label htmlFor={props.thirdInput}>{props.thirdLabel}</label>
                    <input
                        className={thirdhInputClass}
                        type='text' //Could have been type file but a little more work with the css
                        name='thirdLabel'
                        onBlur={thirdInputBlurHandler}
                        onChange={thirdInputHandler}
                        value={thirdInput}
                    />
                    {thirdInputHasError && (
                        <p className={classes.errorText}>Value of {props.thirdLabel} is not required, but good to add!</p>
                    )}
                </div>
                {props.fourthLabel && (
                    <div className={classes.container}>
                        <label htmlFor={props.fourthLabel}>{props.fourthLabel}</label>
                        <input
                            className={fourthInputClass}
                            type='text'
                            name='fourthInput'
                            onBlur={fourthInputBlurHandler}
                            onChange={fourthInputHandler}
                            value={fourthInput}
                        />
                        {fourthInputHasError && (
                            <p className={classes.errorText}>Value of {props.fourthLabel} is not required, but good to add!</p>
                        )}
                    </div>
                )}
                {props.numberLabel && (
                    <div className={classes.container}>
                        <label htmlFor={props.numberLabel}>{props.numberLabel}</label>
                        <input
                            className={numberInputClass}
                            type='number'
                            name='numberInput'
                            onBlur={numberInputBlurHandler}
                            onChange={numberInputHandler}
                            value={numberInput}
                            min={0}
                        />
                        {numberInputHasError && (
                            <p className={classes.errorText}>Value of {props.numberLabel} is required!</p>
                        )}
                    </div>
                )}
                {props.hazardousLabel && (
                    <div className={classes.container}>
                        <label htmlFor='hazardous'>{props.hazardousLabel}</label>
                        <select
                            // className={hazardousInputClass}
                            name='hazardous'
                            onBlur={hazardousInputBlurHandler}
                            onChange={hazardousInputHandler}
                            value={hazardousInput}
                        >
                            <option value=''>Select</option>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>
                        {hazardousInputHasError && (
                            <p className={classes.errorText}>Value of {props.hazardousLabel} is required!</p>
                        )}
                    </div>
                )}

                <div className={classes.btnContainer}>
                    <Button className={classes.button} variant='outline-danger' type='button' onClick={resetHandler}>
                        Reset
                    </Button>

                    <Button className={classes.button} variant='primary' type='submit' disabled={!formIsValid}>
                        Save
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default AddItemForm;
