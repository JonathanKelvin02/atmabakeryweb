import TopNavbar from './TopNavbarAdmin.jsx'
import { Outlet } from 'react-router-dom';
import Barbar from '../../Component/SidebarComponent/SideBarComponentAdmin.jsx';
import { useState } from 'react';
import { Layout, Button, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import '../../Component/SidebarComponent/SideBarComponent.css'
import Logo from '../../Component/SidebarComponent/Logo.jsx';
import MenuList from '../../Component/SidebarComponent/MenuList.jsx';

const { Header, Sider } = Layout;

function AdminLayout({children}) {
    const [collapsed, setCollapsed] = useState(false);

    return(
        <Layout>
            <Sider theme='light' collapsed={collapsed} collapsible trigger={null} className='sidebar'>
                <Logo collapsed={collapsed} />
                <MenuList />
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

export default AdminLayout;