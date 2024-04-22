import { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Login } from "../../api/apiAuth";
import "./Login.css";

function FormLogin() {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);

    const [data, setData] = useState(
        {email: "",
        password: ""}
    );
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.value};
        setData(newData);
        if (newData.email.trim().length > 0 && newData.password.length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }

    const login = (event) => {
        console.log("proses login");
        event.preventDefault();
        setLoading(true);
        Login(data)
            .then((res) => {
                sessionStorage.setItem("token", res.access_token);
                sessionStorage.setItem("user", JSON.stringify(res.user));
                sessionStorage.setItem("role", res.role);
                if (sessionStorage.getItem("role") === "Admin") {
                    navigate("/admin");
                } else if (sessionStorage.getItem("role") === "MO") {
                    navigate("/MO");
                } else if (sessionStorage.getItem("role") === "Owner") {
                    navigate("/owner");
                } else {
                    navigate("/customer");
                }
                
                toast.success(res.message);
            })
            .catch((err) => {
                console.log(err);
                toast.dark(err.message);
                setLoading(false);
            });
    };

    const forgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <div className="d-flex h-100">
            <div style={{ width: '80%', height: '70%' }} className="m-auto">
                <Container style={{ padding: '30px' }} className='p-10 bg-white shadow-2xl rounded-xl'>
                    <div className='text-center'>
                        <h1 className='mt-3 open-sans-bold'>Log In</h1>
                        <label className='roboto gantiColorWelcome' style={{ fontSize: '24px', color: '#676B80 !important' }}>Welcome Back</label>
                    </div>
                    <Form onSubmit={login} className='roboto mt-6'>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            {/* <Form.Label>Email address</Form.Label> */}
                            <div className='roboto-bold' style={{ marginLeft: '1%' }}>Email</div>
                            <Form.Control style={{ borderColor: '#3C4242' }} type="email" name='email' placeholder="Enter email" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3 mt-6" controlId="formGroupPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <div className='roboto-bold' style={{ marginLeft: '1%' }}>Password</div>
                            <Form.Control style={{ borderColor: '#3C4242' }} type="password" name='password' placeholder="Password" onChange={handleChange}/>
                            <Form.Text muted className='roboto d-flex justify-content-between mt-3'>
                                <div>
                                    Don't have an account? <a href="/register">Register</a>
                                </div>
                                <div>
                                    <a href="/forgot-password" onClick={forgotPassword}>Forget Password</a>
                                </div>
                            </Form.Text>
                        </Form.Group>
                        <div className='d-grid'>
                            <Button className='border-2' style={{ backgroundColor: '#8E6F60', borderColor: '#8E6F60' }} type="submit" disabled={isDisabled || loading}>
                                {loading ? (
                                    <Spinner animation='border' variant='dark' size='sm' />
                                ) : (
                                    <span>Sign In</span>
                                )}
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default FormLogin;
