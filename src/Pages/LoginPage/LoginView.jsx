import { Row, Col } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';
import PicCarousel from '../../Component/PicCarousel.jsx';
import FormLogin from './FormLogin.jsx';

//import gambar
import img1 from '../../assets/ImgCarousel/ImgCarousel(1).jpg'
import img2 from '../../assets/ImgCarousel/ImgCarousel(2).jpg'
import img3 from '../../assets/ImgCarousel/ImgCarousel(3).jpg'
import img4 from '../../assets/ImgCarousel/ImgCarousel(4).jpg'
import img5 from '../../assets/ImgCarousel/ImgCarousel(5).jpg'
import img6 from '../../assets/ImgCarousel/ImgCarousel(6).jpg'
import img7 from '../../assets/ImgCarousel/ImgCarousel(7).jpg'

const images = [img1, img2, img3, img4, img5, img6, img7];

function LoginView({ children }) {

  return (
    <>
      <Row>
        <Col className='d-none d-md-block'>
          <PicCarousel Images={images} />
        </Col>
        <Col >
          {/* <FormLogin /> */}
          {children ? children : <Outlet />}
        </Col>
      </Row>
    </>
  )
}

export default LoginView;
