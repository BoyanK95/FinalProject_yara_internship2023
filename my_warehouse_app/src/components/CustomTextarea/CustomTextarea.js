import classes from './CustomTextarea.module.css'

const CustomTextarea = ({ label, type, disabled, value, onChange }) => {
    return (
        <div className={classes.container}>
            <label htmlFor={label}>{label}</label>
            <textarea name={label} type={type} disabled={disabled} value={value} onChange={onChange} />
        </div>
    );
};

export default CustomTextarea;
