import { useState } from 'react';
import { Layout, Button, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { MdLogout } from "react-icons/md";
import './SideBarComponent.css'
import './Logo'
import Logo from './Logo';
import MenuList from './MenuList';

import { Outlet, useNavigate } from 'react-router-dom';

import { 
    faUsers, 
    faFile,
    faListUl,
    faReceipt
} from '@fortawesome/free-solid-svg-icons';

//Import API
import { LogoutPegawai } from '../../api/apiAuth';
import { toast } from 'react-toastify';

const menu = [
    {
        nama : 'Product',
        pil1 : 'Homecook',
        pil2 : 'Hampers',
        pil3 : 'Titipan',
        icon : faListUl,
        path : '/admin'
    },
    {
        nama : 'Resep',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faListUl,
        path : '/admin'
    }, 
    {
        nama : 'Bahan Baku',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faReceipt,
        path : '/admin'
    },  
    {
        nama : 'User',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faUsers,
        path : '/admin'
    },  
    {
        nama : 'Karyawan',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faUsers,
        path : '/admin'
    },
    {
        nama : 'Penitip',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faUsers,
        path : '/admin'
    },
    {
        nama : 'Laporan',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faFile,
        path : '/admin'
    },
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
        <Layout>
            <Sider theme='light' collapsed={collapsed} collapsible trigger={null} className='sidebar'>
                <Logo collapsed={collapsed} data={"Admin"} />
                <MenuList subMenu={menu} />
            </Sider>
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
                            <div className="text-topNavar">Home</div>
                            <div className="text-topNavar">Contact</div>
                        </div>
                        {collapsed && <Button danger style={{marginTop: 16, marginRight: 8, fontWeight: 'bold'}} onClick={handleLogout}>
                            <MdLogout /> LogOut    
                        </Button>}
                    </div>

                </Header>
                {children ? children : <Outlet />}
            </Layout>
        </Layout>
    );
}

export default SideBarComponent;