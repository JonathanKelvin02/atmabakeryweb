import { useState, useEffect } from 'react';
import { Container, Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
// Import API
import { GetProfile, UpdateProfile, UpdateProfileImage } from '../../../api/apiCustomer';
import { getProfile } from '../../../api/indexApi';

const ShowProfileCustomer = () => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [valid, setValid] = useState(true);

    const [data, setData] = useState({
        Nama_Customer: "",
        email: "",
        Nomor_telepon: "",
    })
    const [Profile, setProfile] = useState(null);

    const handleChangeValid = () => {
        setValid(!valid);
    }

    const getDataProfile = () => {
        setLoading(true);
        GetProfile().then((response) => {
            setData(response);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    const updateImageProfile = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('Profile', Profile);

        UpdateProfileImage(formData).then((response) => {
            toast.success('Berhasil Mengubah Gambar Profile');
        }).catch((err) => {
            console.log(err);
            toast.error(err);
            setProfile(null);
        })
    }
    
    const updateProfile = (event) => {
        event.preventDefault();
        UpdateProfile(data, data.ID_Customer).then((response) => {
            toast.success('Berhasil Mengubah Profile');
            setDisabled(true);
            setProfile(null);
            getDataProfile();
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleProfile = (event) => {
        setProfile(event.target.files[0]);
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleDisabled = (e) => {
        e.preventDefault();
        setDisabled(false);
    }

    useEffect(() => {
        getDataProfile();
    }, []);

    console.log(data);

    return (
        <Container>
            {loading || data.length == 0 ? (
                <Col>
                    <Row>
                    <div className='d-flex justify-content-center align-item-center mt-5'>
                        <Spinner animation="border" role="status" style={{width:'10rem', height:'10rem'}}/>
                    </div>
                    </Row>
                    <Row>
                        <p className='d-flex justify-content-center align-item-center mt-3'><b>Loading...</b></p>
                    </Row>
                </Col>
            ) : (
                <Row>
                    <Col md={6}>
                        <div className="img-preview text-center position-relative mb-3 me-3" style={{ aspectRatio: '1/1' }}>
                            <Form onSubmit={updateImageProfile}>
                            {data?.profile !== null ? (
                                <img
                                    src={Profile === null ? getProfile(data?.Profile) : URL.createObjectURL(Profile)}
                                    alt={data?.Profile}
                                    className='img-fluid img-thumbnail'
                                />
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
                                    Save
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

                    <Col md={6}>
                        <Form onSubmit={updateProfile}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Nama Pengguna</Form.Label>
                                <Form.Control name='Nama_Customer' type='text' value={data.Nama_Customer} onChange={handleChange} disabled={disabled}/>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Email Pengguna</Form.Label>
                                <Form.Control name='email' type='text' value={data.email} onChange={handleChange} disabled={disabled}/>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Nomor Telepon Pengguna</Form.Label>
                                <Form.Control name='Nomor_telepon' type='text' value={data.Nomor_telepon} onChange={handleChange} disabled={disabled}/>
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
                                    Save
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
