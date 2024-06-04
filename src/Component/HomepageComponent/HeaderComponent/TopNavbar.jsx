import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { CartContext } from '../../../context/ShoppingCartContext';
import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHouse
} from '@fortawesome/free-solid-svg-icons';

import './TopNavbar.css';

function TopNavbar() {
    const navigate = useNavigate();
    const {cartItems} = useContext(CartContext);
    const [isLogin, setIsLogin] = useState(false);
    const [dataLogin, setDataLogin] = useState({
        token: "",
        user: "",
        role: ""
    });

    const [url, setUrl] = useState(() => {
        if (typeof window !== 'undefined') {
            return new URL(window.location.href);
        }
        return null;
    });

    const [locationUser, setLocationUser] = useState("");

    const functionUserLocationRightNow = () => {
        if (url) {
            const pathname = url.pathname.slice(1);
            if (pathname === "AtmaBakery") {
                setLocationUser("Welcome To Atma Bakery!!");
            } else if(pathname === "customer") {
                const user = JSON.parse(sessionStorage.getItem("user"));
                const name = user.Nama_Customer;

                setLocationUser("Welcome Back " + name + " !!");
            } else {
                setLocationUser("Welcome!!");
            }
        } else {
            console.error("URL is not defined");
        }
    };

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
    };

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
    };

    useEffect(() => {
        handleScrollEffect();
        handleSessionEffect();
    }, []);

    useEffect(() => {
        functionUserLocationRightNow();
    }, [url]);

    return (
        <>
            <div className='BigContainer BackgroundImage'>
                <div className='TopWrapper'>
                    <div className='NavLogo'>
                        <a href='' style={{ textDecoration: "none" }}>
                            <span className='Atma'>Atma</span><span className='Bakery'>Bakery</span>
                        </a>
                    </div>

                    <div>
                        <button className="dropdownButton" onClick={toggleDropdown}>Menu</button>
                        <div className={`sidebarMenu ${dropdownOpen ? 'open' : ''}`} style={{ display: dropdownOpen ? "block" : "none" }}>
                        <div className='SideBarMenuContent'>
                            <div className='SideBarMenuContentTitle mt-2'>
                                Atma Bakery
                            </div>
                            <div className='SideBarMenuContentLine' />
                            <div className='SideBarMenuContentList'>
                                <a onClick={() => navigate(isLogin ? `/customer` : `/AtmaBakery`)}>Home</a>
                                <a href="/customer/Produk">Product</a>
                                <a href="#">About</a>
                                <a href="/customer/Shopping">Shop</a>
                                <a onClick={() => navigate(`/customer/History`)}>History</a>
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
                        </div>
                    </div>
                    </div>

                    <div className='NavMenu'>
                        <ul>
                            <li><a onClick={() => navigate(isLogin ? `/customer` : `/AtmaBakery`)} className='link active'>Home</a></li>
                            <li><a href='/customer/Produk' className='link'>Product</a></li>
                            <li><a href='#' className='link'>About</a></li>
                            <li><a href='/customer/Shopping' className='link'>Shop</a></li>
                            <li><a href='#' className='link'>Contact</a></li>
                        </ul>
                    </div>
                    {isLogin ? (
                        <div className='NavButton NavButtonContainer'>
                            <div className='PerButton'>
                                <a onClick={() => navigate(`/customer/Cart`)}><FaCartShopping /> {cartItems.length}</a>
                            </div>
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
                        {locationUser}
                    </div>
                    <div className='ContentNow'>
                        <a href='/'>Home</a> <span className='separator'>&gt;</span> <a style={{ color: "#FF9F0D" }} href='/'>Product</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopNavbar;
