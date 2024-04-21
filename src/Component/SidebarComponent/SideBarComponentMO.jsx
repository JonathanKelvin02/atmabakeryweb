import { useState } from 'react';
import { Layout, Button, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import './SideBarComponent.css'


import Logo from './Logo';
import MenuList from './MenuList';
import RUDSKaryawan from '../../Pages/MOView/RUDSKaryawan.jsx';

import { 
    faUsers, 
    faFile,
    faBagShopping 
} from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router-dom';

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

    return(
        <Layout>
            <Sider theme='light' collapsed={collapsed} collapsible trigger={null} className='sidebar'>
                <Logo collapsed={collapsed} />
                <MenuList subMenu={menu} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: '#fff', color: '#000' }}>
                    <div style={{ display: 'flex' }}>
                        <Button 
                            type="text"
                            onClick={() => setCollapsed(!collapsed)}
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined />}
                            style={{marginTop: 16}}
                        />
                        <div className="text-topNavar">Home</div>
                    </div>
                </Header>
                {children ? children : <Outlet />}
            </Layout>
        </Layout>
    );
}

export default SideBarComponent;