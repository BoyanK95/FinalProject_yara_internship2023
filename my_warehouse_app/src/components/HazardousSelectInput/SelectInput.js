import classes from './HazardousSelectInput.module.css';

const SelectInput = (props) => {
    

    return (
        <div className={classes.container}>
            <label htmlFor={props.name}>{props.label}</label>
            <select
                // className={hazardousInputClass}
                name={props.name}
                // onBlur={props.blurHandler}
                onChange={props.inputHandler}
                value={props.value}
            >
                {/* <option value=''>Select</option> */}
                <option value='true'>Yes</option>
                <option value='false'>No</option>
            </select>
            {props.hasError && (
                <p className={classes.errorText}>Value of {props.hazardousLabel} is required!</p>
            )}
        </div>
    );
};

export default SelectInput;
