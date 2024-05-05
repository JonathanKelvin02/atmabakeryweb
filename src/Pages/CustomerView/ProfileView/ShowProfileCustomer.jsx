import {useState, useEffect} from 'react';
import {Container, Button, Form, Spinner} from 'react-bootstrap';

//Import API
import {GetProfile} from '../../../api/apiCustomer';

const ShowProfileCustomer = () => {
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState({});
    const [gambar, setGambar] = useState(null);

    const getProfile = () => {
        setLoading(true);
        GetProfile().then((response) => {
            setProfile(response);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }
    
    const handleGambar = (event) => {
        setGambar(event.target.files[0]);
    }
    
    useEffect(() => {
        getProfile();
    },[])
    console.log(profile);
    // console.log(profile);
    return (
        <Container>
            {loading ? (
                <div>
                    <Spinner animation="border" role="status"/>
                    <p>Loading...</p>
                </div>
            ) : (
                <div>
                    <h1>Profile</h1>
                    <Form>
                        <Form.Group className="mb-3">
                            <div className='img-preview text-center position-relative mb-3' style={{aspectRatio:'16/9'}}>
                                {gambar && (
                                    <img
                                    src={gambar!=null ? URL.createObjectURL(gambar) : profile.Gambar_Customer}
                                    alt='Gambar'
                                    className='w-100 h-100 object-fit-cover'
                                    />
                                    
                                )}
                                <Button
                                variant='primary'
                                type='button'
                                size='sm'
                                className='w-fit h-fit position-absolute bottom-0 end-0 me-3'
                                onClick={() => document.getElementById('Profile').click()}
                                >
                                    Pilih Gambar Profile
                                </Button>
                                <Form.Control
                                type='file'
                                name='Profile'
                                id='Profile'
                                className='d-none'
                                onChange={handleGambar}
                                accept='image/*'
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" value={profile.Nama_Customer} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={profile.email} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nomor Telepon</Form.Label>
                            <Form.Control type="text" value={profile.Nomor_telepon} disabled />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Edit
                        </Button>
                    </Form>
                </div>
            )}
            
        </Container>
    )
}


export default ShowProfileCustomer;