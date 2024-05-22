import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import './Footer.css';

function Footer({ children }) {

    return (
        <>
            <div className='InfoFooter'>
                sssssssss
            </div>

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
