import { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Login } from "../../api/apiAuth";

function FormForgot() {
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
        // console.log(data.email);
        // console.log(data.password);
        setLoading(true);
        Login(data)
            .then((res) => {
                navigate("/admin");
                sessionStorage.setItem("token", res.access_token);
                sessionStorage.setItem("user", JSON.stringify(res.user));
                sessionStorage.setItem("role", res.roles);
                toast.success(res.message);
            })
            .catch((err) => {
                console.log(err);
                toast.dark(err.message);
                setLoading(false);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Container className='p-10 bg-gray-100 rounded-xl'>
                <div className='text-center'>
                    <h1 className='font-extrabold mt-3'>Log In</h1>
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
                            Don't have an account? <a href="/register">Register</a>
                            <div className='float-end'>
                                <a href='/forget-password'>Forget Password</a>
                            </div>
                        </Form.Text>
                    </Form.Group>
                    <div className='d-grid'>
                        <Button className='bg-yellow-950 border-2 border-l-yellow-950' type="submit" disabled={isDisabled || loading}>
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

export default FormForgot;