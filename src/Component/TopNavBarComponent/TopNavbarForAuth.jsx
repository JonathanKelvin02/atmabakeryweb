import React, { useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function TopNavbar({ children }) {
    const [loginClicked, setLoginClicked] = useState(true);
    const [registerClicked, setRegisterClicked] = useState(false);

    const handleLoginClick = (e) => {
        e.preventDefault();
        setLoginClicked(true);
        setRegisterClicked(false);
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        setRegisterClicked(true);
        setLoginClicked(false);
    };

    return (
        <>
            <Navbar className="bg-body-tertiary w-100">
                <Container>
                    <Navbar.Brand><b>Atma Kitchen</b></Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <div className='flex'>
                            <a href="/login" onClick={handleLoginClick} className={'me-2'}
                                style={{
                                    backgroundColor: loginClicked ? '#8e6f8e' : 'white',
                                    padding: '10px 20px',
                                    color: loginClicked ? 'white' : '#8e6f8e',
                                    textDecoration: 'none',
                                    borderRadius: '8px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    borderColor: loginClicked ? 'white' : '#8e6f8e'
                                }}>Login</a>
                            <a href="/register" onClick={handleRegisterClick}
                                style={{
                                    backgroundColor: registerClicked ? '#8e6f8e' : 'white',
                                    padding: '10px 20px',
                                    color: registerClicked ? 'white' : '#8e6f8e',
                                    textDecoration: 'none',
                                    borderRadius: '8px',
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    borderColor: registerClicked ? 'white' : '#8e6f8e'
                                }}>Register</a>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {children ? children : <Outlet />}
        </>
    );
}

export default TopNavbar;
