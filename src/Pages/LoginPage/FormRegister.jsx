import {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Form, Button, Spinner} from 'react-bootstrap';
import { toast } from 'react-toastify';

//Import CSS
import "./Register.css";

//Import API
import {Register, SendEmailConfirmation} from '../../api/apiRegister';

function FormRegister() {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const [valPassword, setValPassword] = useState("");

    const [data, setData] = useState({
        Nama_Customer: "",
        email: "",
        Password: "",
        Nomor_telepon: "",
    })

    const handleChange = (event) => {
        const newData = {...data, [event.target.name]: event.target.value};
        if (newData.email.trim().length >=0 && newData.Password.trim().length >=0) {
            setIsDisabled(false)
            setData(newData);
        } else {
            setIsDisabled(true);
        }
    }

    const x = useRef('');

    const handleChangePassword = (event) => {
        setValPassword(event.target.value);
    }


    const register = (event) => {
        console.log(x.current.value);
        console.log(valPassword);
        if (x.current.value !== valPassword) {
            event.preventDefault();
            toast.error("Validasi Password Tidak Tepat");
            return;
        } else {
            event.preventDefault();
            setLoading(true);
            Register(data).then((response) => {
                sendEmail(event);
                toast.success("Berhasil Membuat Akun");
                setLoading(false);
                navigate('/');
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            })
        }
    }

    const sendEmail = (event) => {
        event.preventDefault();
        setLoading(true);
        SendEmailConfirmation(data).then((response) => {
            toast.success("Berhasil Mengirim Email Konfirmasi");
            setLoading(false);
            navigate('/');
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    return (
        <>
            <div className='form-register'>
                <div className='form-container'>
                    <Container className='form-inner-container'>
                        <div className='form-header'>
                            <h1 className='form-title'>Register</h1>
                            <label className='form-subtitle'>Welcome to <b>Atma Kitchen</b></label>
                        </div>
                        <Form onSubmit={register} className='form-body'>
                            <Form.Group className='form-group-Nama_Customer'>
                                <div className='form-label-Nama_Customer'>Nama Pengguna</div>
                                <Form.Control className='form-control-Nama_Customer' type='text' name='Nama_Customer' placeholder='Nama Pengguna' onChange={handleChange} required/>
                            </Form.Group>

                            <Form.Group className="form-group-email">
                                <div className='form-label-email'>Email</div>
                                <Form.Control className="form-control-email" type="email" name='email' placeholder="Enter email" onChange={handleChange} required/>
                            </Form.Group>

                            <Form.Group className="form-group-password">
                                <div className='form-label-password'>Password</div>
                                <Form.Control className="form-control-password" type="password" name='password' placeholder="Password" onChange={handleChange} ref={x}/>
                            </Form.Group>

                            <Form.Group className="form-group-password">
                                <div className='form-label-password'>Validasi Password</div>
                                <Form.Control className="form-control-password" type="password" name='valPassword' placeholder="Password" onChange={handleChangePassword}/>
                            </Form.Group>

                            <Form.Group className='form-group-Nomor_Telepon'>
                                <div className='form-label-Nomor_Telepon'>Nomor Telepon</div>
                                <Form.Control className='form-control-Nomor_Telepon' type='number' name='Nomor_telepon' placeholder='Nomor Telepon' onChange={handleChange} required/>
                                <Form.Text className='form-text mt-3'>
                                    <div>
                                        Already have an account? <a href="/">Log In</a>
                                    </div>
                                </Form.Text>
                            </Form.Group>

                            <div className='d-grid'>
                                <Button className='border-2' style={{ backgroundColor: '#8E6F60', borderColor: '#8E6F60' }} type="submit" disabled={isDisabled || loading}>
                                {loading ? (
                                    <Spinner animation='border' variant='dark' size='sm' />
                                ) : (
                                    <span>Sign Up</span>
                                )}
                                </Button>
                            </div>
                        </Form>
                    </Container>

                </div>

            </div>
        </>
    )
}

export default FormRegister;