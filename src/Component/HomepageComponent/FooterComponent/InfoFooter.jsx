import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import './InfoFooter.css';

const InfoFooter = () => {
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
                    <li><a href="#"><p>Premium Bread and Cake produced with <br/>high quality ingredients. Favorited by <br/>all Atma Jaya communities.</p></a></li>
                    <li><a href="#">atmabakery@uajy.ac.id</a></li>
                    <li><a href="#">Jln.Babarsari, CondongCatur, Bantul</a></li>
                    <li><a href="#">Yogyakarta, Indonesia- 55281</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Icon Paling Kanan Watch</h4>
                    <ul>
                    </ul>
                </div>
                </div>
            </div>
        </footer>
  );
}

export default InfoFooter;
