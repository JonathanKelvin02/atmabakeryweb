import { Container, Form, Button } from 'react-bootstrap';

function FormLogin() {
    return (
        <div className="d-flex justify-content-center align-items-center h-75 m-5">
            <Container className='p-5 shadow-sm' style={{borderRadius:'10px'}}>
                <div className='text-center'>
                    <h1 className='mt-3'>Log In</h1>
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
                            <div className="d-flex justify-content-between">
                                <span>Don't have an account? <a href="/register">Register</a></span>
                                <a href='/forget-password'>Forget Password</a>
                            </div>
                        </Form.Text>
                    </Form.Group>
                </Form>
                <div className='d-grid'>
                    <Button 
                    type="submit"
                    style={{
                        backgroundColor: '#8e6f8e', 
                        borderColor: '#8e6f8e', 
                        color: 'white'
                    }}>Submit</Button>
                </div>
            </Container>
        </div>
    )
}

export default FormLogin;
