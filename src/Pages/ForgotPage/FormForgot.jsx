import { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


import { Login } from "../../api/apiAuth";
import { SendEmailForLink } from "../../api/apiCustomer";

import "./Forgot.css";

function FormForgot() {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);

    const [data, setData] = useState(
        {email: ""}
    );
    
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.value};
        setData(newData);
        if (newData.email.trim().length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }

    const login = (event) => {
        console.log("proses login");
        event.preventDefault();
        
        setLoading(true);

        SendEmailForLink(data)
            .then((res) => {
                toast.success("Sending Email Success");
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Sending Email Failed" + err.message);
                // toast.dark(err.message);
                setLoading(false);
            });
    };

    return (
        <div className="form-login">
            <div className="form-container">
                <Container className='form-inner-container'>
                    <div className='form-header'>
                        <h1 className='form-title'>Reset Your Password</h1>
                    </div>
                    <label className='roboto gantiColorWelcome mt-3' style={{ fontSize: '20px' }}>
                        Enter your email and we'll send you a link to reset your password.<br />Please check it
                    </label>

                    <Form onSubmit={login} className='roboto mt-3'>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <div className='roboto-bold' style={{ marginLeft: '1%' }}>Email</div>
                            <Form.Control style={{ borderColor: '#3C4242' }} type="email" name='email' placeholder="Enter email" onChange={handleChange}/>
                            <Form.Text className='form-text mt-3'>
                                <div>
                                    Suddenly remember your password? <span onClick={() => navigate('/')} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>login</span>
                                </div>
                                <div>
                                    Got to Dashboard without Login <a href="/forgot-password" >Dashboard</a>
                                </div>
                            </Form.Text>
                        </Form.Group>
                        <div className='d-grid'>
                            <Button className='border-2' style={{ backgroundColor: '#008000', borderColor: '#008000' }} type="submit" disabled={isDisabled || loading}>
                                {loading ? (
                                    <Spinner animation='border' variant='dark' size='sm' />
                                ) : (
                                    <span>Send Email</span>
                                )}
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    );
}

export default FormForgot;