import {Carousel} from 'react-bootstrap';

function PicCarousel({ Images }) {
    return (
        <Carousel fade controls={false} indicators={false} interval={2000}>
            {Images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block"
                        style={{
                            width: '100%',
                            height: '92.6vh',
                            objectFit: 'cover'
                        }}
                        src={image}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default PicCarousel;