import classes from './CustomInput.module.css';

const CustomInput = ({ label, type, disabled, onChange, value }) => {
    return (
        <div className={classes.inputContainer}>
            <label htmlFor={label}>{label}</label>
            {type !== 'number' ? (
                <input
                    style={{ maxWidth: '12rem' }}
                    className={classes.input}
                    name={label}
                    type={type}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    style={{ maxWidth: '5rem' }}
                    className={classes.input}
                    name={label}
                    type={type}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    );
};

export default CustomInput;
