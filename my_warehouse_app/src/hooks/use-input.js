import { useState } from 'react';

function useInput(validateValue) {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = isTouched && !valueIsValid;

    function valueChangeHandler(e) {
        setEnteredValue(e.target.value);
    }

    function inputBlurHandler() {
        setIsTouched(true);
    }

    function reset() {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
}

export default useInput;
