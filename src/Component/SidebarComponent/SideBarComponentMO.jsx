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
        nama : 'Karyawan',
        pil1 : 'Tambah Karyawan',
        pil2 : 'Presensi Karyawan',
        pil3 : 'List Karyawan',
        path : '/MO' 
    },
    {
        nama : 'Products',
        pil1 : 'Pengeluaran',
        pil2 : 'Bahan Baku',
        pil3 : 'Titipan',
        icon : faUsers,
        path : '/MO'
    },
    {
        nama : 'Pemesanan',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faBagShopping,
        path : '/MO'
    },
    {
        nama : 'Pasokan',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faTruck,
        path : '/MO'
    },
    {
        nama : 'Penitip',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faUsers,
        path : '/MO'
    },
    {
        nama : 'Laporan',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faFile,
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
        <Layout>
            <Sider theme='light' collapsed={collapsed} collapsible trigger={null} className='sidebar'>
                <Logo collapsed={collapsed} data={"MO"} />
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