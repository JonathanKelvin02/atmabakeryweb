import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import './TopNavbar.css';

function TopNavbar() {
    // For CSS
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);
    const [dataLogin, setDataLogin] = useState(
        {
            token: "",
            user: "",
            role: ""
        }
    );

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleScrollEffect = () => {
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
    };

    const handleSessionEffect = () => {
        if (sessionStorage.getItem("token") !== null) {
            setIsLogin(true);
            setDataLogin({
                token: sessionStorage.getItem("token"),
                user: sessionStorage.getItem("user"),
                role: sessionStorage.getItem("role")
            });
        } else {
            setIsLogin(false);
        }
        console.log(isLogin);
    };

    useEffect(() => {
        handleScrollEffect();
        handleSessionEffect();
    }, []);

    const logoutFunction = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("role");
        setIsLogin(false);
        setDataLogin({
            token: "",
            user: "",
            role: ""
        });
        navigate(`/`);
    }

    return (
        <>
            <div className='BigContainer BackgroundImage'>
                <div className='TopWrapper'>
                    <div className='NavLogo'>
                        <a href='' style={{ textDecoration: "none" }}>
                            <span className='Atma'>Atma</span><span className='Bakery'>Bakery</span>
                        </a>
                    </div>

                    <button className="dropdownButton" onClick={toggleDropdown}>Menu</button>

                    {dropdownOpen && (
                        <div className="dropdownMenu">
                            <a onClick={() => navigate(isLogin ? `/customer` : `/AtmaBakery`)}>Home</a>
                            <a href="#">Product</a>
                            <a href="#">About</a>
                            <a href="#">Shop</a>
                            <a href="#">Contact</a>
                            {isLogin ? (
                                <>
                                    <a onClick={() => navigate(`/customer/Profile`)}>Profile</a>
                                    <a onClick={logoutFunction}>Logout</a>
                                </>
                            ) : (
                                <>
                                    <a href="#">Login</a>
                                    <a href="#">Sign Up</a>
                                </>
                            )}
                        </div>
                    )}

                    <div className='NavMenu'>
                        <ul>
                            <li><a onClick={() => navigate(isLogin ? `/customer` : `/AtmaBakery`)} className='link active'>Home</a></li>
                            <li><a href='#' className='link'>Product</a></li>
                            <li><a href='#' className='link'>About</a></li>
                            <li><a href='#' className='link'>Shop</a></li>
                            <li><a href='#' className='link'>Contact</a></li>
                        </ul>
                    </div>
                    {isLogin ? (
                        <div className='NavButton NavButtonContainer'>
                            <div className='PerButton'>
                                <a onClick={() => navigate(`/customer/Profile`)}>Profile</a>
                            </div>
                            <div className='PerButton'>
                                <a onClick={logoutFunction}>Logout</a>
                            </div>
                        </div>
                    ) : (
                        <div className='NavButton NavButtonContainer'>
                            <div className='PerButton'>
                                <a onClick={() => navigate(`/`)}>Login</a>
                            </div>
                            <div className='PerButton'>
                                <a onClick={() => navigate(`/register`)}>Sign Up</a>
                            </div>
                        </div>
                    )}
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
        </>
    )
}

export default TopNavbar;
