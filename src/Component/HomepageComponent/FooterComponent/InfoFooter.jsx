import React from 'react';
import { Row, Col } from 'react-bootstrap';

import GooglePlayImageLocal from '../../../assets/FooterComponent/GooglePlay.png';
import WatchOranye from '../../../assets/FooterComponent/Watch.svg';

import './InfoFooter.css';

const InfoFooter = () => {

    const handleLinkToMobileLegend = () => {
        window.location.href = "https://play.google.com/store/apps/details?id=com.mobile.legends&hl=en_US";
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <h4>Need Help</h4>
                        <ul>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Track Order</a></li>
                            <li><a href="#">Return & Refunds</a></li>
                            <li><a href="#">FAQ's</a></li>
                            <li><a href="#">Career</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Useful Link</h4>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Product</a></li>
                            <li><a href="#">Shop</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>About Us</h4>
                        <ul>
                            <li><a href="#"><p>Premium Bread and Cake produced with <br />high quality ingredients. Favorited by <br />all Atma Jaya communities.</p></a></li>
                            <li><a href="#">atmabakery@uajy.ac.id</a></li>
                            <li><a href="#">Jln.Babarsari, CondongCatur, Bantul</a></li>
                            <li><a href="#">Yogyakarta, Indonesia- 55281</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <Row>
                            <img src={WatchOranye} />
                            <div className='WatchParagraf'>
                                <div className='WatchParagrafTitle'>Opening Hours</div>
                                <div className='WatchParagrafInfo'>Mon - Sat(8.00 - 6.00)</div>
                                <div className='WatchParagrafInfo'>Sunday - Closed</div>
                            </div>
                        </Row>
                        <div className='mt-3' style={{ color: "white", fontWeight: "bold" }}>Download The App</div>
                        <div className='ToMobileLegend' onClick={handleLinkToMobileLegend}>
                            <img src={GooglePlayImageLocal} className='mt-3' />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default InfoFooter;
