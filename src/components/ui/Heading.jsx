import PropTypes from 'prop-types';

const Heading = ({ classNames, children }) => {
    return (
        <h2 className={`${classNames}`}>
            {children}
        </h2>
    )
}
Heading.propTypes = {
    classNames: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default Heading;