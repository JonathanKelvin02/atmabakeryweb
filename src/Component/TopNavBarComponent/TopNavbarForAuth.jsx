import React, { useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import './TopNavbarForAuth.css';

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
                    <Navbar.Brand className="navbar-brand-bold">Atma Kitchen</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <div className='flex-container'>
                            <Button className="me-2 wider-button" variant="outline-success">Login</Button>
                            <Button className="wider-button" variant="outline-success">Sign Up</Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {children ? children : <Outlet />}
        </>
    );
}

export default TopNavbar;
