import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PatternImage from '../../../assets/Pattern.svg';
import LapisLegit from '../../../assets/Homepage/LapisLegit.svg';
import LearnMoreImage from '../../../assets/Homepage/LearnMore.svg';

// Import CSS
import './ContentHomepageView.css';

function ContentHomepageView() {
    const navigate = useNavigate();

    const currentImageDetail = [
        { 
            image: "data:image/png;base64,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", 
            title: "Breads",
            link: ""
        },
        { 
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADa0lEQVR4nO2XXUhTYRjHz4zoohsj0SQl2s7RTbtIvRIMhO669wOLCArqJiJQ6qaLCqkUJIVI3DLxY++mqMvphIUhqVF6UzN16pwXbqZY5NSzvfMsnniPzuba2Vy1rzgPPDfnnIvn957/7z3voSixxBJLrEB1//M2hNNUvJUIEMt6ZfOU6u0eOGjXvV8xU2WqEioeqs8OKXobt3rQ4TvmWUi+2g6SctUmVa5Mi/X8VJ/d0xnO6p97NgGSipcgKVOCpKJ5JKGic3f4CyTdGYKkKiMkXdPyENTlluuJER2LC47dH9kB2G3JTT1ILraw1BWUGXUAnc2jCys6StO+4fe60giSG93DUR2+9iMcDXffP6S0B20RIJwS34BSjNDf1X8RoUfTHNTPctAwy0H1VIIBtFog1XeP19k80DDHJS6Afrefz3OJDaC3e6DZysHDqRgCYMRUuTWy/GDPzA/eKhyyWASPDSRSLVYO6uc4eDzNwYNoArg7mbMY0RxGNHKr6bxAz6x3F977NP7iwOcgApQ9wMJp3QYkt69FPkL88BoGdprud6tlub73XdozoyuDl8ICUBice30cfY0sAFn5XwAMYDXjxBrmArnHdjInMWI8WJsNr61LfwSQ1c/CYdVyZCXmV94HwoXoGXIdI6bSe23yQxM/IPEhmBO9fgAK8hbUaxEGUMtyycp7h91ok7qm61LSsYYZ815bNZTyA5rGVRDMiUAAUt1m5LdREhsXos0brVLn4tMMMNecMLsQ4/ACbHUV8AMSH4I50bP0O4DC4NwnNBXJstSmpZqfpE+aa9KB7ZBtewHWdcVgXLQD1sohmBNCAPIBFlI13+BI83JkANg2OoNkHiPmHUbMOhl+ufEUsO005+gtgrGpUd6DUE4IASh8+p8NjTukDFbTt92IeYM1zA9fkUkTCPImTI1FYFiw8x6EcqI7ngAwki1N12TOeCG2uvIglBNRBQgSoe9uDb3oQlnn3+qqc0xNxcA7oc6GUE7EDEAIyKnJmdjqygcWyYF3Qi2HYE7EFACHcgLJIZQTPfEM4OgtAm+chJyIKYBwhAr4zJPYDC6sgJAT/Jc4XgD8f2iMVhuf89WBEhByQugooYgVAIkU+R8g2yTZaUI5kXAADj8nCIT/cVoRnxEK7ASB6LfY4wtALLGoxK2fGNjqgjd0P4gAAAAASUVORK5CYII=", 
            title: "Milk",
            link: ""
        },
        { 
            image: "data:image/png;base64,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", 
            title: "Cake",
            link: ""
        },
        { 
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB0UlEQVR4nO3bMU7DMBiGYQ+IHqKMwGirQwwbUsydGGFkSs9Rqt4BTgBKOQaV2sqdf1TKhEQHRP2lyvtIXlHzv6mdIHAOAAAAAAAAKMSeT+/sZWB71uOff/bYPdjY2a+rcff/ezVHyg4QgeELIxh3vi6CMXxdBGP4ugjG8HURjOHrIhjDF0d4OuE5v5MRGl6ydBEahq+L0PRg+JubeJZTNc2pWucUreSy/Ydy0c+yW9U613G2ur26KDf8ulqUv9DY0QDfq64Wm/p6ePAAuztfdJGpwwG+IsRJiQDFt518PAGWBQIILzB1PECKRoBEAL4Bh6S+w4wtiACZM2DAIcwWFHkKMh5DOYQz7wEDXsR4DI28CVtffhXx0zwEK7ls3996jl3Rz7JdxQdOgEAA4xvAFjRnC3KcARzCgUPYeAriMVSK9wAxAogRQIwAYgQQI4AYAcQIIEYAMQKIEUCMAGIEECOAGAHECCBGADECiBFAjABiBBAjgBgBxAggRgAxAogRQIwAYgQQI4AYAcQIINZ6v+rt/wl7v9QHCGHW1wBtCFP1/N2b95et9x99C9CGsHgfjc5dF7yGMJx7PymxHZk4wPYat3d+Z4YPAAAAAAAAdyw+AaVsiMUdwZDKAAAAAElFTkSuQmCC", 
            title: "Hampers",
            link: ""
        },
        { 
            image: "data:image/png;base64,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", 
            title: "Cup Cakes",
            link: ""
        }
    ];
    
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

            <div className='categoryPanel'>
                <div className='categoryContent'>
                    <div className='categoryContentHeader'>
                        What We Serve You
                    </div>
                    
                    <Row style={{ justifyContent: "center" }}>
                        {currentImageDetail.map((data, index) => (
                            <div key={index} className='categoryContentContent' style={{ margin: '10px' }}>
                                <img src={data.image}/>
                                <h4 style={{ marginTop: "12px" }}><b>{data.title}</b></h4>
                            </div>
                        ))}
                    </Row>
                    
                    <div className='categoryContentButton'>
                        <a>View All</a>
                    </div>

                </div>
            </div>
        </>
    );    
}

export default ContentHomepageView;
