import TopNavbar from './TopNavbarAdmin.jsx'
import { Outlet } from 'react-router-dom';

function AdminLayout({children}) {
    return (
        <div>
            <TopNavbar />
            {children ? children : <Outlet />}
        </div>
    );
}

export default AdminLayout;