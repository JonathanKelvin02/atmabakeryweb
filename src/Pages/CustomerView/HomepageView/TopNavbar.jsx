import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate  } from 'react-router-dom';
import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap';
import { FaCircleUser ,FaCartShopping, FaReceipt } from 'react-icons/fa6';

import './TopNavbar.css';

function TopNavbar({children}) {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openNav = () => {
        setSidebarOpen(true);
    };

    const closeNav = () => {
        setSidebarOpen(false);
    };

    return(
        <>
            <div className='BigContainer BackgroundImage'>
                <div className='TopWrapper'>
                    <div className='NavLogo'>
                        <span className='Atma'>Atma</span> <span className='Bakery'>Bakery</span>
                    </div>

                    <div id="mySidebar" className="sidebarMenu" style={{width: sidebarOpen ? '250px' : '0'}}>
                        <a href="#">Home</a>
                        <a href="#">Product</a>
                        <a href="#">About</a>
                        <a href="#">Shop</a>
                        <a href="#">Contact</a>
                        <a href="#">Login</a>
                        <a href="#">Sign Up</a>
                    </div>

                    <button className="sidebarButton" onClick={openNav}>Menu</button>

                    <div className='NavMenu'>
                        <ul>
                            <li><a href='#' className='link active'>Home</a></li>
                            <li><a href='#' className='link'>Product</a></li>
                            <li><a href='#' className='link'>About</a></li>
                            <li><a href='#' className='link'>Shop</a></li>
                            <li><a href='#' className='link'>Contact</a></li>
                        </ul>
                    </div>
                    <div className='NavButton NavButtonContainer'>
                        <div className='PerButton'>
                            <a href='#'>Login</a>
                        </div>
                        <div className='PerButton'>
                            <a href='#'>Sign Up</a>
                        </div>
                    </div>
                </div>
                <div className='CenterContent'>
                    <div className='CenteredTitle'>
                        Our Product
                    </div>
                    <div className='ContentNow'>
                        <a href='/'>Home</a> <span className='separator'>&gt;</span> <a style={{color: "#FF9F0D"}} href='/'>Product</a>
                    </div>
                </div>
            </div>

            {children ? children : <Outlet />}
        </>
    )
}

export default TopNavbar;