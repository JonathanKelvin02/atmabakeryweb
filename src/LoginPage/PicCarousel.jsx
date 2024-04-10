import {Carousel} from 'react-bootstrap';

function PicCarousel({ Images }) {
    return (
        <Carousel fade style={{width : '50vw', height:'80vh'}} controls={false} indicators={false} interval={2000}>
            {Images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100 h-min"
                        src={image}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default PicCarousel;