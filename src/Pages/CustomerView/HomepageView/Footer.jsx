import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import ImageJam from '../../../assets/FooterComponent/Watch.svg';
import GooglePlay from '../../../assets/FooterComponent/GooglePlay.png';

import './Footer.css';

function Footer({ children }) {

    return (
        <>
            {/* <div className='InfoFooter'>
                <div className='SmallBox'>
                    <ul>
                        <li>Need Help</li>
                        <li>Contact Us</li>
                        <li>Track Order</li>
                        <li>Return & Refunds</li>
                        <li>FAQ's</li>
                        <li>Career</li>
                    </ul>
                </div>

                <div className='SmallBox'>
                    <ul>
                        <li>Useful Link</li>
                        <li>About</li>
                        <li>Product</li>
                        <li>Shop</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className='SmallBox'>
                    <ul>
                        <li>About Us</li>
                        <li><p>Premium Bread and Cake produced with high quality ingredients. Favorited by all Atma Jaya communities.</p></li>
                        <li>atmabakery@uajy.ac.id</li>
                        <li>Jln. Babarsari, CondongCatur, Bantul</li>
                        <li>Yogyakarta, Indonesia - 55281</li>
                    </ul>
                </div>

                <div className='SmallBox'>
                    <ul>
                        <li></li>
                        <li style={{ display: 'flex', fontWeight: 'normal', margin: '1em 0', fontSize: 'normal'}}>
                            <img src={ImageJam} alt="Logo" />
                            <ul>
                                <li></li>
                                <li style={{ fontWeight: 'normal', margin: '0 0'}}>Opening Hours</li>
                                <li style={{ margin: '0 0'}}>Mon - Sat 8.00 - 6.00</li>
                                <li style={{ margin: '0 0'}}>Sunday - Closed</li>
                            </ul>
                        </li>
                        <li style={{ margin: '1em 0' }}><b style={{ fontSize: '20px'}}>Download The App</b></li>
                        <li style={{ margin: '1em 0' }}><img src={GooglePlay} alt="Logo" /></li>
                    </ul>
                </div>
            </div> */}

            <div className='StationaryFooter'>
                <ul>
                    <li>Copyright © 2024 by Carol dkk. All Rights Reserved.</li>
                    <li>Ini Icon</li>
                </ul>
            </div>
        </>
    )
}

export default Footer;
