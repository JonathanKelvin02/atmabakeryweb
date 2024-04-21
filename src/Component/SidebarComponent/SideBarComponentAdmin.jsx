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

                    Di sini narohnya
                </Header>

                OR SINI
            </Layout>
        </Layout>
    );
}

export default SideBarComponent;