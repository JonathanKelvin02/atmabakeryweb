import { useState } from 'react';
import { Layout, Button, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { toast } from 'react-toastify';

import './SideBarComponent.css';

import Logo from './Logo';
import MenuList from './MenuList';

import { 
    faUsers, 
    faFile,
    faBagShopping,
    faTruck 
} from '@fortawesome/free-solid-svg-icons';

//Import API
import { LogoutPegawai } from '../../api/apiAuth';

const menu = [
    {
        nama : 'Profile',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        path : '/customer' 
    },
    {
        nama : 'Recent Transaction',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faUsers,
        path : '/customer'
    },
    {
        nama : 'History Transcation',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faBagShopping,
        path : '/MO'
    }
]

const { Header, Sider } = Layout;

function SideBarComponent({children}) {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const handleLogout = (event) => {
        LogoutPegawai().then((res) => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("role");
            navigate("/");
            toast.success(res.message);
        }).catch((e) => {
            console.log(e);
            toast.dark(e.message);
        })
    }
    
    return(
        <Layout className='content'>
            <Sider theme='light' collapsed={collapsed} collapsible trigger={null} className='sidebar'>
                <Logo collapsed={collapsed} data={"MO"} />
                <MenuList subMenu={menu} />
            </Sider>
            {collapsed && 
                <aside className='sidebar-phone'>
                    <div className='sidebar-menu'>
                        <Logo data={"MO"} />
                        <MenuList subMenu={menu} />
                    </div>
                    <div>
                        <Button 
                            type="text"
                            onClick={() => setCollapsed(!collapsed)}
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined />}
                            style={{marginTop: 16}}
                        />
                    </div>
                </aside>
            }
            <Layout>
                <Header style={{ padding: 0, background: '#fff', color: '#000' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button 
                                type="text"
                                onClick={() => setCollapsed(!collapsed)}
                                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined />}
                                style={{marginTop: 16}}
                            />
                        </div>
                    </div>
                </Header>
                {children ? children : <Outlet />}
            </Layout>
        </Layout>
    );
}

export default SideBarComponent;