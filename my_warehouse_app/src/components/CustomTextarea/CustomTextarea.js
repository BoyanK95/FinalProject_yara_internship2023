const CustomTextarea = ({ label, type, disabled, onChange }) => {
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <textarea name={label} type={type} disabled={disabled} onChange={onChange} />
        </div>
    );
};

export default CustomTextarea;
