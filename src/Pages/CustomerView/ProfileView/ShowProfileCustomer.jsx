import { useState, useEffect } from 'react';
import { Container, Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { toast } from 'react-toastify';
// Import API
import {
  GetProfile,
  UpdateProfile,
  UpdateProfileImage,
} from "../../../api/apiCustomer";
import { getProfile } from "../../../api/indexApi";

const ShowProfileCustomer = () => {
    const cld = new Cloudinary({cloud: {cloudName: 'dui6wroks'}});
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [valid, setValid] = useState(true);

    const [data, setData] = useState({
        ID_Customer: "",
        Nama_Customer: "",
        email: "",
        Nomor_telepon: "",
        Tanggal_Lahir: "",
        Profile: ""
    })
    const [Profile, setProfile] = useState(null);

    const img = cld.image(data.Profile).format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));

    const handleChangeValid = () => {
        setValid(!valid);
    }

  const getDataProfile = () => {
    setLoading(true);
    GetProfile()
      .then((response) => {
        setData(response);
        console.log(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

    const updateImageProfile = (event) => {
        event.preventDefault();
        setLoading2(true);
        const formData = new FormData();
        formData.append('Profile', Profile);

        UpdateProfileImage(formData).then((response) => {
            console.log(response);
            toast.success('Berhasil Mengubah Gambar Profile');
            setDisabled(true);
            setValid(true);
            setProfile(null);
            setLoading2(false);
            getDataProfile();
        }).catch((err) => {
            console.log(err);
            toast.error(err);
            setProfile(null);
        })
    }
    
    const updateProfileUser = (event) => {
        event.preventDefault();
        setLoading2(true);
        UpdateProfile(data).then((response) => {
            toast.success(response.message);
            setDisabled(true);
            setValid(true);
            setProfile(null);
            setLoading2(false);
            getDataProfile();
        }).catch((err) => {
            console.log(err);
        })
    }

  const handleProfile = (event) => {
    setProfile(event.target.files[0]);
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleDisabled = (e) => {
    e.preventDefault();
    setDisabled(false);
  };

    useEffect(() => {
        getDataProfile();
    }, []);

    return (
        <Container>
            {loading || data.length == 0 ? (
                
                    <Col className='d-flex justify-content-center align-item-center'>
                        <Row>
                        <div className='mt-5'>
                            <Spinner animation="border" role="status" style={{width:'10rem', height:'10rem'}}/>
                            <p className='my-3 text-center'><b>Loading...</b></p>
                        </div>
                        </Row>
                    </Col>
                
                
            ) : (
                <Row className='my-3'>
                    <Col>
                        <div className="img-preview text-center position-relative mb-3 me-3" style={{ aspectRatio: '1/1' }}>
                            <Form onSubmit={updateImageProfile}>
                            {data?.Profile !== null ? (
                                <AdvancedImage cldImg={img} className='img-fluid img-thumbnail'/>
                            ) : (
                                <img
                                    src='https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'
                                    alt='Profile'
                                    className='img-fluid img-thumbnail'
                                />
                            )}
                            {Profile !== null ? (
                                <Button 
                                    variant='primary' 
                                    type='submit' 
                                    size='sm'
                                    className='w-fit h-fit position-absolute bottom-0 end-0 me-3' 
                                    disabled={disabled}
                                    >
                                    {loading2 ? (
                                        <Spinner animation='border' variant='light' size='sm' />
                                    ) : (
                                        'Save'
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    variant='primary'
                                    type='button'
                                    size='sm'
                                    className="w-fit h-fit position-absolute bottom-0 end-0 me-3"
                                    onClick={() => document.getElementById('Profile').click()}
                                    disabled={disabled}
                                >
                                    Pilih Gambar Profile
                                </Button>
                            )}
                            
                                <Form.Control
                                    type='file'
                                    name='Profile'
                                    id='Profile'
                                    className='d-none'
                                    onChange={handleProfile}
                                    accept='image/*'
                                />
                                
                            </Form>
                        </div>
                    </Col>

                    <Col>
                        <Form onSubmit={updateProfileUser}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Nama Pengguna</Form.Label>
                                <Form.Control name='Nama_Customer' type='text' value={data?.Nama_Customer} onChange={handleChange} disabled={disabled}/>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Email Pengguna</Form.Label>
                                <Form.Control name='email' type='text' value={data?.email} onChange={handleChange} disabled={disabled}/>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Nomor Telepon Pengguna</Form.Label>
                                <Form.Control name='Nomor_telepon' type='text' value={data?.Nomor_telepon} onChange={handleChange} disabled={disabled}/>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Tanggal Lahir</Form.Label>
                                <Form.Control name='Tanggal_Lahir' type='date' value={data?.Tanggal_Lahir} onChange={handleChange} disabled={disabled}/>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Check 
                                        type="checkbox" 
                                        label="I confirm the data is correct" 
                                        onChange={handleChangeValid}
                                        disabled={disabled}
                                    />
                            </Form.Group>

                            {disabled ? (
                                <Button variant="success" type="button" onClick={handleDisabled}>
                                    Edit
                                </Button>
                            ) : (
                                <Button variant="primary" type="submit" disabled={valid}>
                                    {loading2 ? (
                                        <Spinner animation="border" variant="light" size="sm" />
                                    ) : (
                                        'Save'
                                    )}
                                </Button>
                            )}
                        </Form>
                    </Col>

                    
                </Row>
            )}
        </Container>
    )
}

export default ShowProfileCustomer;