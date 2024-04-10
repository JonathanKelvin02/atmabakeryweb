import { Container, Form, Button } from 'react-bootstrap';

function FormLogin() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Container className='p-10 bg-gray-100 rounded-xl'>
                <div className='text-center'>
                    <h1 className='font-extrabold mt-3'>Log In</h1>
                    <label>Welcome Back</label>
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                        <Form.Text muted>
                            Don't have an account? <a href="/register">Register</a>
                            <div className='float-end'>
                                <a href='/forget-password'>Forget Password</a>
                            </div>
                        </Form.Text>
                    </Form.Group>
                </Form>
                <div className='d-grid'>
                    <Button className='bg-yellow-950 border-2 border-l-yellow-950' type="submit">
                        Submit
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default FormLogin;
