import Facebook from '../../../assets/FooterComponent/Facebook.svg';
import Instagram from '../../../assets/FooterComponent/Instagram.svg';
import Twitter from '../../../assets/FooterComponent/Twitter.svg';
import LinkedIn from '../../../assets/FooterComponent/LinkedIn.svg';

import './Footer.css';

function Footer() {
    return (
        <>
            <div className='StationaryFooter'>
                <ul>
                    <li>Copyright © 2024 by Carol dkk. All Rights Reserved.</li>
                    <li>
                        <img src={Facebook} alt="Facebook" className="icon" />
                        <img src={Instagram} alt="Instagram" className="icon" />
                        <img src={Twitter} alt="Twitter" className="icon" />
                        <img src={LinkedIn} alt="LinkedIn" className="icon" />
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Footer;
