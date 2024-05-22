//import Component
import TopNavbar from '../../../Component/HomepageComponent/HeaderComponent/TopNavbar';
import InfoFooter from '../../../Component/HomepageComponent/FooterComponent/InfoFooter';
import Footer from '../../../Component/HomepageComponent/FooterComponent/Footer';
import { Outlet, useNavigate } from 'react-router-dom';

import './Homepage.css';

function HomepageView({children}) {
    const navigate = useNavigate();

    return (
        <>
            <TopNavbar/>
                {children ? children : <Outlet />}
                <InfoFooter/>
            <Footer/>
        </>
    )
}

export default HomepageView;