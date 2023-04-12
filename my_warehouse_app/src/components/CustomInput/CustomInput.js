const CustomInput = ({ label, type, disabled, onChange }) => {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input name={label} type={type} disabled={disabled} onChange={onChange} />
        </div>
    );
};

export default CustomInput;
