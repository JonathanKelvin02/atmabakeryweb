//import Component
import TopNavbar from '../HomepageView/TopNavbar';

import { Outlet, useNavigate } from 'react-router-dom';

function HomepageView() {
    const navigate = useNavigate();

    return (
        <TopNavbar/>
    )
}

export default HomepageView;