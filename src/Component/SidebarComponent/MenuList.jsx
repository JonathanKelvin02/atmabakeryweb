import React from 'react';
import { Menu } from 'antd';
import { 
    BarsOutlined,
    DashboardOutlined
} from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUsers, 
    faFile 
} from '@fortawesome/free-solid-svg-icons';

const MenuList = () => {
    return(
        <Menu theme='light' mode='inline' className='menu-bar'>
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                Dashboard
            </Menu.Item>
            <Menu.SubMenu key="product" icon={<BarsOutlined />} title="Product">
                <Menu.Item key="homecook">Homecook</Menu.Item>
                <Menu.Item key="hampers">Hampers</Menu.Item>
                <Menu.Item key="titipanh">Titipan</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="user" icon={<FontAwesomeIcon icon={faUsers} />}>
                Users
            </Menu.Item>
            <Menu.Item key="karyawan" icon={<FontAwesomeIcon icon={faUsers} />}>
                Employee
            </Menu.Item>
            <Menu.Item key="penitip" icon={<FontAwesomeIcon icon={faUsers} />}>
                Penitip
            </Menu.Item>
            <Menu.Item key="Laporan" icon={<FontAwesomeIcon icon={faFile} />}>
                Laporan
            </Menu.Item>            


            {/* <Menu.SubMenu key="karyawan" icon={<FontAwesomeIcon icon={faUsers} />} title="Karyawan">
                <Menu.Item key="tambah">Tambah</Menu.Item>
                <Menu.Item key="presensi">Presensi</Menu.Item>
            </Menu.SubMenu> */}
        </Menu>
    );
};

export default MenuList;