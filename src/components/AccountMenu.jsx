import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdOutlineExitToApp, MdSettings } from "react-icons/md";


const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const { currentRole, currentUser } = useSelector(state => state.user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <div
                    onClick={handleClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        marginLeft: '16px'
                    }}
                >
                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#ccc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ff0000',
                            fontSize: '16px'
                        }}
                    >
                        {String(currentUser.name).charAt(0)}
                    </div>
                </div>
            </div>
            {open && (
                <div
                    style={{
                        position: 'absolute',
                        right: '16px',
                        top: '48px',
                        backgroundColor: '#fff',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.32)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        width: '200px'
                    }}
                >
                    <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: '#ccc',
                                marginRight: '8px'
                            }}
                        />
                        <Link to={`/${currentRole}/profile`} style={{ textDecoration: 'none', color: '#000' }}>
                            Profile
                        </Link>
                    </div>
                    <hr style={{ margin: '8px 0' }} />
                    <div
                        onClick={handleClose}
                        style={{
                            padding: '8px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: "#000"
                        }}
                    >

                        <p className='flex items-center'>
                            <MdSettings className='mx-2 text-xl' />
                            Settings
                        </p>
                    </div>
                    <div
                        style={{
                            padding: '8px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                    >

                        <Link to="/logout" className='flex ' style={{ textDecoration: 'none', color: '#000' }}>
                            <MdOutlineExitToApp className='mx-2 text-xl' />
                            Logout
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default AccountMenu;
