import {useState} from 'react';
import {Modal, Form, Button, Spinner} from 'react-bootstrap';
import { toast } from 'react-toastify';

//Import API
import { PostAlamatCustomer } from '../../../api/apiAlamat';

const AddAlamat = ({onSuccess}) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alamat, setAlamat] = useState({
        Alamat: ""
    });

    const handleClose = () => {
        setAlamat({
            Alamat: ""
        })
        setShow(false);
        onSuccess();
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleChange = (event) => {
        setAlamat({
            ...alamat,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        PostAlamatCustomer(alamat).then((response) => {
            toast.success(response.message);
            setLoading(false);
            console.log(response);
            handleClose();
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    return(
        <>
            <Button className='mx-3 mt-4' variant='primary' onClick={handleShow}>Tambah Alamat</Button>
            <Modal show={show} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Alamat</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control as='textarea' name='Alamat' value={alamat.Alamat} onChange={handleChange} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>Close</Button>
                        {loading ? (
                            <Button variant='primary' disabled>
                                <Spinner animation='border' variant='light' size='sm' />
                            </Button>
                        ) : (
                            <Button variant='primary' type='submit'>Tambah Alamat</Button>
                        )}
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddAlamat;