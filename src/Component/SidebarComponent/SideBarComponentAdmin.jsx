import { useState } from 'react';
import { Layout, Button, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './SideBarComponent.css'
import './Logo'
import Logo from './Logo';
import MenuList from './MenuList';

const { Header, Sider } = Layout;

function SideBarComponent() {
    const [collapsed, setCollapsed] = useState(false);

    return(
        <Layout>
            <Sider theme='light' collapsed={collapsed} collapsible trigger={null} className='sidebar'>
                <Logo collapsed={collapsed} />
                <MenuList />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: '#fff', color: '#000' }}>
                    <Button 
                    type="text"
                    onClick={() => setCollapsed(!collapsed)}
                    icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined />}
                    />

                    Home
                </Header>
            </Layout>
        </Layout>
    );
}

export default SideBarComponent;