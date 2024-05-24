import { Outlet, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PatternImage from '../../../assets/Pattern.svg';
import LapisLegit from '../../../assets/Homepage/LapisLegit.svg';

import './ContentHomepageView.css';

function ContentHomepageView() {
    const navigate = useNavigate();

    return (
        <>
            <div className='OuterContainer'>
                <div className='TopMiddleContent'>
                    <img src={PatternImage} className='top-left-image' alt='Image 1' />
                    <img src={PatternImage} className='bottom-right-image' alt='Image 2' />

                    <Row className='bottom-row'>
                        <Col className="responsive-colForTopText">
                            <h3 className="responsive-text-h3" style={{ fontWeight: 700, fontSize: '2.5vw', fontFamily: 'Roboto, sans-serif' }}>
                                Welcome from our greatest heart, where every pastry is crafted with passion to bring joy to your table
                            </h3>

                            <p className="responsive-text-p" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.5vw', marginTop: "30px" }}>
                                Welcome to AtmaBakery! Here, we combine generations of bakery expertise with modern innovations to deliver breads and cakes that are not only delicious but also enticing. Every bite is the result of carefully selected finest ingredients and a manufacturing process full of love and precision.
                            </p>
                        </Col>
                        <Col className="responsive-col" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img src={LapisLegit} alt='Image Lapis' style={{ width: "22vw", height: "auto", minWidth: "200px" }} />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default ContentHomepageView;
