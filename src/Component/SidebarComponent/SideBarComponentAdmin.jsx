import { useState } from 'react';
import { Layout, Button, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './SideBarComponent.css'
import './Logo'
import Logo from './Logo';
import MenuList from './MenuList';

import { Outlet } from 'react-router-dom';

import { 
    faUsers, 
    faFile,
    faListUl
} from '@fortawesome/free-solid-svg-icons';

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
        nama : 'Bahan Baku',
        pil1 : null,
        pil2 : null,
        pil3 : null,
        icon : faListUl,
        path : '/admin/BahanBaku'
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
        path : '/admin/Penitip'
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
                        {collapsed && <Button type="primary" danger style={{marginTop: 16, marginRight: 8}}>LogOut</Button>}
                    </div>

                </Header>
                {children ? children : <Outlet />}
            </Layout>
        </Layout>
    );
}

export default SideBarComponent;