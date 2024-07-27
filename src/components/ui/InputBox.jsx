import PropTypes from 'prop-types';

const InputBox = ({ id, name, type, value, onChange, labelName, labelClass, inputClass }) => {
    return (
        <>
            <label className={labelClass} htmlFor={id}>{labelName}</label>
            <input
                id={id}
                name={name}
                type={type}
                onChange={onChange}
                value={value}
                className={inputClass}
            />
        </>
    )
}

InputBox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'email', 'date', 'number', 'password']).isRequired,
    value: PropTypes.string.isRequired,
    labelName: PropTypes.string.isRequired,
    labelClass: PropTypes.string,
    inputClass: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default InputBox;