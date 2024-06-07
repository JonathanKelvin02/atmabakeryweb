import { useState } from 'react';
import { Layout, Button, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { 
    faMoneyBillWave, 
    faFile
} from '@fortawesome/free-solid-svg-icons';

//Import CSS
import './SideBarComponent.css';

//Import Component
import Logo from './Logo';
import MenuList from './MenuList';

//Import API
import { LogoutPegawai } from '../../api/apiAuth';
import { toast } from 'react-toastify';

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
        pil1: 'Penjualan Keseluruhan',
        pil2: 'Penggunaan Bahan Baku',
        pil3: 'Laporan Bulanan',
        pil4: 'Laporan Stok Bahan',
        icon: faFile,
        path: '/owner'
    }
]

const { Header, Sider } = Layout;

function SideBarComponentOwner({children}) {
    const[collapsed, setCollapsed] = useState(false);
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
                <Logo collapsed={collapsed} data={"Owner"}/>
                <MenuList subMenu={menu} />
            </Sider>
            {collapsed && 
                <aside className='sidebar-phone'>
                    <div className='sidebar-menu'>
                        <Logo data={"Owner"} />
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
                        {collapsed && <Button danger style={{marginTop: 16, marginRight: 8, fontWeight: 'bold'}} onClick={handleLogout}>
                            <MdLogout /> LogOut    
                        </Button>}
                        </div>
                    </div>
                </Header>
                {children ? children : <Outlet />}
            </Layout>
        </Layout>
    )
}

export default SideBarComponentOwner;