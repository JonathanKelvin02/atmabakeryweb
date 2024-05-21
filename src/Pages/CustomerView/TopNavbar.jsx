import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap';
import { FaCircleUser ,FaCartShopping, FaReceipt, FaHouseChimney } from 'react-icons/fa6';

function TopNavbar({children}) {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;

        setVisible((prevScrollPos > currentScrollPos || currentScrollPos < 10) && currentScrollPos < 200);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, visible, handleScroll]);

    return(
        <>
            <Navbar expand='lg' className={visible ? 'navbar-scroll' : 'navbar-hidden'}>
                <Container fluid>
                    <Navbar.Brand href=''>Atma Kitchen</Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbarScroll' />
                    <Navbar.Collapse id='navbarScroll'>
                        <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link >Produk</Nav.Link>
                            <Nav.Link >Hampers</Nav.Link>
                        </Nav>
                        
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        
                        <Nav className='d-flex align-items-center'>
                            <Nav.Link href='/customer/alamat' className='mx-2'><FaHouseChimney/></Nav.Link>
                            <Nav.Link href='/customer/History' className="mx-2"><FaReceipt/></Nav.Link>
                            <Nav.Link className="mx-2"><FaCartShopping /></Nav.Link>
                            <Nav.Link href='/customer/Profile' className="mx-2" ><FaCircleUser /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {children ? children : <Outlet />}
        </>
    )
}

export default TopNavbar;