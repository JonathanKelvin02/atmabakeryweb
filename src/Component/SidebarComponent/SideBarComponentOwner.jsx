import { useState } from 'react';
import { Layout, Button, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
    faMoneyBillWave, 
    faFile
} from '@fortawesome/free-solid-svg-icons';

//Import CSS
import './SideBarComponent.css';

//Import Component
import Logo from './Logo';
import MenuList from './MenuList';

const menu = [
    {
        nama:'Gaji & Bonus',
        pil1: null,
        pil2: null,
        pil3: null,
        icon: faMoneyBillWave,
        path: '/owner'
    },
    {
        nama:'Laporan',
        pil1: null,
        icon: faFile,
        path: '/owner'
    }
]

const { Header, Sider } = Layout;

function SideBarComponentOwner({children}) {
    const[collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');
    };

    return(
        <Layout>
            <Sider theme='light' collapsed={collapsed} collapsible trigger={null} className='sidebar'>
                <Logo collapsed={collapsed} data={"Owner"}/>
                <MenuList subMenu={menu} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: '#fff', color: '#000' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                            <Button 
                                type="text"
                                onClick={() => setCollapsed(!collapsed)}
                                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined />}
                                style={{ marginTop: 16 }}
                            />
                            <div className="text-topNavar">Home</div>
                        </div>
                        <div>
                            <Button style={{ marginTop: 16, marginRight: 24, backgroundColor:'red', color:'white', border:'none' }} onClick={handleLogout}>
                                LogOut
                            </Button>
                        </div>
                    </div>
                </Header>
                {children ? children : <Outlet />}
            </Layout>
        </Layout>
    )
}

export default SideBarComponentOwner;