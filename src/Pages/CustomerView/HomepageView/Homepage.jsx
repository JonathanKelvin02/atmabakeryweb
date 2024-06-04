//import Component
import TopNavbar from '../../../Component/HomepageComponent/HeaderComponent/TopNavbar';
import InfoFooter from '../../../Component/HomepageComponent/FooterComponent/InfoFooter';
import Footer from '../../../Component/HomepageComponent/FooterComponent/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { CartProvider } from '../../../context/ShoppingCartContext';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import './Homepage.css';

function HomepageView({children}) {
    const navigate = useNavigate();

    return (
        <>
            <CartProvider>
                <TopNavbar/>
                    {children ? children : <Outlet />}
                    <InfoFooter/>
                <Footer/>
            </CartProvider>
        </>
    )
}

export default HomepageView;