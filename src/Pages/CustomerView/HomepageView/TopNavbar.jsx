import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import './TopNavbar.css';

function TopNavbar({ children }) {
    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const header = document.querySelector('.TopWrapper');

        const handleScroll = () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className='BigContainer BackgroundImage'>
                <div className='TopWrapper'>
                    <div className='NavLogo'>
                        <span className='Atma'>Atma</span> <span className='Bakery'>Bakery</span>
                    </div>

                    <button className="dropdownButton" onClick={toggleDropdown}>Menu</button>

                    {dropdownOpen && (
                        <div className="dropdownMenu">
                            <a href="#">Home</a>
                            <a href="#">Product</a>
                            <a href="#">About</a>
                            <a href="#">Shop</a>
                            <a href="#">Contact</a>
                            <a href="#">Login</a>
                            <a href="#">Sign Up</a>
                        </div>
                    )}

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
                        <a href='/'>Home</a> <span className='separator'>&gt;</span> <a style={{ color: "#FF9F0D" }} href='/'>Product</a>
                    </div>
                </div>
            </div>

            {children ? children : <Outlet />}
        </>
    )
}

export default TopNavbar;
