import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {Button, Container, Form, Nav, Navbar, Spinner} from 'react-bootstrap';
import { FaCircleUser ,FaCartShopping, FaReceipt, FaHouseChimney, FaPrint } from 'react-icons/fa6';
import { CartContext } from '../../context/ShoppingCartContext';
import { LogoutCustomer } from '../../api/apiAuth';
import { toast } from 'react-toastify';

function TopNavbar({children}) {
    const navigate = useNavigate();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const {cartItems} = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = (event) => {
        setIsLoading(true);
        LogoutCustomer().then((res) => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("role");
            navigate("/");
            setIsLoading(false);
            toast.success(res.message);
        }).catch((e) => {
            setIsLoading(false);
            toast.dark(e.message);
        })
    }

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
                            <Nav.Link href='/customer/Produk' >Produk</Nav.Link>
                            <Nav.Link >Hampers</Nav.Link>
                            <Nav.Link href='/customer/Shopping'>Shop</Nav.Link>
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
                            <Nav.Link href='/customer/Cart' className="mx-2">
                                <FaCartShopping /> {cartItems.length}
                            </Nav.Link>
                            <Nav.Link href='/customer/Nota'><FaPrint /></Nav.Link>
                            <Nav.Link href='/customer/Profile' className="mx-2" ><FaCircleUser /></Nav.Link>
                           
                        </Nav>
                        <Button variant='outline-danger' disabled={isLoading} onClick={handleLogout}>
                            {isLoading ? (
                                <Spinner animation='border' variant='dark' size='sm' />
                            ) : (
                                <span>Log Out</span>
                            )}
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {children ? children : <Outlet />}
        </>
    )
}

export default TopNavbar;