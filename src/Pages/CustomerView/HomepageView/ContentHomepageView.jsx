import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PatternImage from '../../../assets/Pattern.svg';
import LapisLegit from '../../../assets/Homepage/LapisLegit.svg';
import LearnMoreImage from '../../../assets/Homepage/LearnMore.svg';
import PropTypes from 'prop-types';

// Import CSS
import './ContentHomepageView.css';

function ContentHomepageView() {
    const navigate = useNavigate();

    return (
        <>
            <div className='mainSectionContent'>
                <div className="imageGroup">
                    <img className="heroImage" src={PatternImage} alt="alt text" />
                    <img className="bannerImage" src={PatternImage} alt="alt text" />

                    <div className="contentRow">
                        <div className="contentColumn">
                            <h1 className="mainHeaderContent">
                                Welcome from our greatest heart, where every pastry is crafted with passion to bring joy to your table
                            </h1>
                            <h1 className="mainParagContent">
                                Welcome to AtmaBakery! Here, we combine generations of bakery expertise with modern innovations to deliver
                                breads and cakes that are not only delicious but also enticing. Every bite is the result of carefully
                                selected finest ingredients and a manufacturing process full of love and precision.
                            </h1>

                            <div className="learnMoreGroup">
                                <img className="iconImage" src={LearnMoreImage} alt="alt text" />
                                <h1 className="learnMoreTitle">Learn More</h1>
                            </div>
                        </div>

                        <img className="decorativeImage" src={LapisLegit} alt="alt text" />
                    </div>
                </div>
            </div>
        </>
    );    
}

export default ContentHomepageView;
