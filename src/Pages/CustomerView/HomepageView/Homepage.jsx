//import Component
import TopNavbar from '../HomepageView/TopNavbar';
import Footer from '../HomepageView/Footer';
import { Outlet, useNavigate } from 'react-router-dom';

import './Homepage.css';

function HomepageView() {
    const navigate = useNavigate();

    return (
        <>
            <TopNavbar/>

            <div className="blackBox">
                <h1>Welcome to Atma Bakery</h1>
                <p>Your one-stop shop for delicious baked goods!</p>
            </div>


            <Footer/>
        </>
    )
}

export default HomepageView;