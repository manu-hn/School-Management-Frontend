/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { FaCog } from 'react-icons/fa'; // Use an icon library like react-icons

const SpeedDialTemplate = ({ actions }) => {
    const [open, setOpen] = useState(false);
console.log(actions)
    const handleToggle = () => {
        setOpen(!open);
    };
console.log(open)
    return (
        <div className="relative ">
            {/* Main Button */}
            <button
                onClick={handleToggle}
                className={`fixed top-64 right-4 rounded-full p-4 bg-green-800 text-white shadow-lg transition-transform ${
                    open ? 'transform rotate-180' : ''
                }`}
                aria-label="SpeedDial button"
            >
                <FaCog className="text-2xl" />
            </button>

            {/* Action Buttons */}
            {open && (
                <div className="absolute right-10 top-10 flex flex-col space-y-2">
                   
                    {actions.map((action) => (
                        <button
                            key={action.name}
                            onClick={action.action}
                            className="flex items-center p-3 bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition-transform"
                            aria-label={action.name}
                        >
                            {/* <span className="mr-2">{action.icon}</span> */}
                            <span>{action.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SpeedDialTemplate;
