import React from 'react';
import { FireFilled } from '@ant-design/icons';

const Logo = ({ collapsed }) => {
    return(
        <>
            <div className="logo">
                <div className="logo-icon"></div>
                {!collapsed && <div className="logo-text"> Logo</div>}
            </div>
            <div className="logo-line"/>
            <div className="logo">
                <div className="logo-icon"></div>
                {!collapsed && <div className="logo-textApa"> Admin</div>}
            </div>
            <div className="logo-line"/>
        </>
    );
};

export default Logo;