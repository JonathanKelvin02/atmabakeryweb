import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import ImageJam from '../../../assets/FooterComponent/Watch.svg';
import GooglePlay from '../../../assets/FooterComponent/GooglePlay.png';

import Facebook from '../../../assets/FooterComponent/Facebook.svg';
import Instagram from '../../../assets/FooterComponent/Instagram.svg';
import Twitter from '../../../assets/FooterComponent/Twitter.svg';
import LinkedIn from '../../../assets/FooterComponent/LinkedIn.svg';

import './Footer.css';

function Footer({ children }) {

    return (
        <>
            <div className='StationaryFooter'>
                <ul>
                    <li>Copyright © 2024 by Carol dkk. All Rights Reserved.</li>
                    <li>
                        <img src={Facebook} alt="Facebook" />
                        <img src={Instagram} alt="Instagram" />
                        <img src={Twitter} alt="Twitter" />
                        <img src={LinkedIn} alt="LinkedIn" />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Footer;
