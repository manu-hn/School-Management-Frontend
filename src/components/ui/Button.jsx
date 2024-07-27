import PropTypes from 'prop-types';
const Button = ({ classNames, children, type }) => {
    return (
        <button type={type} className={`${classNames}`}>{children}</button>
    )
}
Button.propTypes = {
    classNames: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    type: PropTypes.string,

}

export default Button;
