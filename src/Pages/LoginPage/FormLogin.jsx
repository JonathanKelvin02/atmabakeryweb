import { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Login } from "../../api/apiAuth";


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

    return (
        <div className="d-flex justify-content-center align-items-center h-75 m-5">
            <Container className='p-5 shadow-sm' style={{borderRadius:'10px'}}>
                <div className='text-center'>
                    <h1 className='mt-3'>Log In</h1>
                    <label>Welcome Back</label>
                </div>
                <Form onSubmit={login}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" onChange={handleChange}/>
                        <Form.Text muted>
                            <div className="d-flex justify-content-between">
                                <span>Don't have an account? <a href="/register">Register</a></span>
                                <a href='/forget-password'>Forget Password</a>
                            </div>
                        </Form.Text>
                    </Form.Group>
                    <div className='d-grid'>
                        <Button 
                            type="submit"
                            style={{
                                backgroundColor: '#8e6f8e',
                                borderColor: '#8e6f8e',
                                color: 'white'
                            }} 
                            disabled={isDisabled || loading}
                        >
                            {loading ? (
                                <Spinner animation='border' variant='dark' size='sm' />
                            ) : (
                                <span>Login</span>
                            )}
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default FormLogin;
