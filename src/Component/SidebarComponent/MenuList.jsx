import React from 'react';
import { Menu } from 'antd';
import { 
    BarsOutlined,
    DashboardOutlined
} from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUsers, 
    faFile,
    faListUl
} from '@fortawesome/free-solid-svg-icons';

import { useNavigate, useLocation, Navigate } from "react-router-dom";

const MenuList = ({ subMenu }) => { // Destructure props to access subMenu
    const navigate = useNavigate();
    
    return(
        <Menu theme='light' mode='inline' className='menu-bar'>
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                Dashboard
            </Menu.Item>

            {subMenu.map((menu, index) => {
                if(menu.pil1 !== null) {
                    return ( 
                        <Menu.SubMenu key={menu.nama} icon={<BarsOutlined />} title={menu.nama}>
                            <Menu.Item key={menu.pil1} onClick={() => navigate(`${menu.path}/${menu.pil1}`)}>{menu.pil1}</Menu.Item>
                            <Menu.Item key={menu.pil2} onClick={() => navigate(`${menu.path}/${menu.pil2}`)}>{menu.pil2}</Menu.Item>
                            <Menu.Item key={menu.pil3} onClick={() => navigate(`${menu.path}/${menu.pil3}`)}>{menu.pil3}</Menu.Item>
                        </Menu.SubMenu>
                    );
                } else {
                    return (
                        <Menu.Item key={menu.nama} icon={<FontAwesomeIcon icon={menu.icon} />} onClick={() => navigate(`${menu.path}`)}>
                            {menu.nama}
                        </Menu.Item>
                    );
                }
            })}
        </Menu>
    );
};

export default MenuList;
