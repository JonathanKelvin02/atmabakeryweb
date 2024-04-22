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
        <div className="form-login">
            <div className="form-container">
                <Container className='form-inner-container'>
                    <div className='form-header'>
                        <h1 className='form-title'>Log In</h1>
                        <label className='form-subtitle'>Welcome Back</label>
                    </div>
                    <Form onSubmit={login} className='form-body'>
                        <Form.Group className="form-group-email">
                            <div className='form-label-email'>Email</div>
                            <Form.Control className="form-control-email" type="email" name='email' placeholder="Enter email" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="form-group-password">
                            <div className='form-label-password'>Password</div>
                            <Form.Control className="form-control-password" type="password" name='password' placeholder="Password" onChange={handleChange}/>
                            <Form.Text className='form-text mt-3'>
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
