import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import SideBar from './SideBarAdmin.jsx';

function TopNavbarAdmin() {
    return (
        <>
            <Navbar className="bg-body-tertiary h-24 w-100">
                <Container>
                    <SideBar />
                    <Navbar.Brand className='font-extrabold'>Atma Kitchen</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <div className='flex space-x-4'>
                            <a href="/logout" className="bg-red-600 text-white px-4 py-2 rounded font-bold" style={{textDecoration: 'none'}}>Logout</a>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar> 
        </>
    );
}

export default TopNavbarAdmin;