import { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import TopNavbar from './LoginPage/TopNavbar.jsx';
import PicCarousel from './LoginPage/PicCarousel.jsx';
import FormLogin from './LoginPage/FormLogin.jsx';

//import gambar
import img1 from './assets/ImgCarousel/ImgCarousel(1).jpg'
import img2 from './assets/ImgCarousel/ImgCarousel(2).jpg'
import img3 from './assets/ImgCarousel/ImgCarousel(3).jpg'
import img4 from './assets/ImgCarousel/ImgCarousel(4).jpg'
import img5 from './assets/ImgCarousel/ImgCarousel(5).jpg'
import img6 from './assets/ImgCarousel/ImgCarousel(6).jpg'
import img7 from './assets/ImgCarousel/ImgCarousel(7).jpg'

const images = [img1, img2, img3, img4, img5, img6, img7];


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TopNavbar/>

      <Row className='w-100'>
        <Col>
          <PicCarousel Images={images} />
        </Col>
        <Col className='mx-20'>
          <FormLogin />
        </Col>
      </Row>
    </>
  )
}

export default App
