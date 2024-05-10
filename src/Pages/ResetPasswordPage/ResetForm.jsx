import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { CheckingCredentialToken, SendPasswordReset } from "../../api/apiCustomer";

import "./Reset.css";

function FormReset() {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setIsLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const tokenURL = params.get('token');

    const [errorMessage, setErrorMessage] = useState('');

    const [data, setData] = useState(
        {token: tokenURL,
        password: "",
        passwordConfirm: ""}
    );

    const handleChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.value};
        setData(newData);
        if (newData.password.trim().length > 0 && newData.passwordConfirm.trim().length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }

        if (newData.password !== newData.passwordConfirm){
            setErrorMessage('New password and comfirm new password do not match');
        } else {
            setErrorMessage('');
        }        
    }

    const searchTokenCredential = () => {
        setIsLoading(true);
        CheckingCredentialToken(data).then((response) => {
            setIsTokenValid(true);
            setIsLoading(false);
            toast.success("Token valdiated successfully");
        }).catch((err) => {
            console.log(err);
            setIsTokenValid(false);
            toast.success("Token valdiated failed");
            setIsLoading(false);
        })
    }

    const resetPasswordSender = (event) => {
        event.preventDefault();

        SendPasswordReset(data).then((response) => {
            navigate("/");
            toast.success("Reset Password Success");
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            toast.error("Reset Password Failed");
            setIsLoading(false);
        })
    }

    useEffect(() => {
        searchTokenCredential();
    }, [])

    return (
        <div className="form-login">
            <div className="form-container">
                <Container className='form-inner-container'>
                    <div className="form-header" style={{ display: 'flex', justifyContent: 'center' }}>
                        <h1 className='form-title'>Create New Password</h1>
                    </div>
                    <label className='roboto gantiColorWelcome mt-1' style={{ fontSize: '20px', textAlign: 'center', width: '100%' }}>
                        Enter Your New Password
                    </label>

                    {isTokenValid ? (
                        <Form onSubmit={resetPasswordSender} className='roboto mt-3'>
                            <Form.Group className="mb-3">
                                <div className='roboto-bold' style={{ marginLeft: '1%' }}>Password</div>
                                <Form.Control style={{ borderColor: '#3C4242' }} type="password" name='password' placeholder="Enter password" onChange={handleChange}/>
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <div className='roboto-bold' style={{ marginLeft: '1%' }}>Confirm Password</div>
                                <Form.Control style={{ borderColor: '#3C4242' }} type="password" name='passwordConfirm' placeholder="Confirm password" onChange={handleChange}/>
                                {errorMessage && <div className='mt-3' style={{ color: 'red' }}>{errorMessage}</div>}
                            </Form.Group>

                            <div className='d-grid'>
                                <Button className='border-2' style={{ backgroundColor: '#008000', borderColor: '#008000' }} type="submit" disabled={isDisabled || loading}>
                                    {loading ? (
                                        <Spinner animation='border' variant='dark' size='sm' />
                                    ) : (
                                        <span>Reset Password</span>
                                    )}
                                </Button>
                            </div>
                        </Form>
                    ) : (
                        <div className='d-grid mt-3'>
                            <Button className='border-2' style={{ backgroundColor: '#ff0000', borderColor: '#ff0000' }} onClick={() => navigate('/forgot-password')}>
                                <span>Reset Password</span>
                            </Button>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
}

export default FormReset;