const CustomInput = ({ label, type, disabled, onChange, value }) => {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input name={label} type={type} disabled={disabled} value={value} onChange={onChange} />
        </div>
    );
};

export default CustomInput;
