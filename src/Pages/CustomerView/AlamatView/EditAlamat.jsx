import {useState} from 'react';
import {Modal, Form, Button, Spinner} from 'react-bootstrap';
import { toast } from 'react-toastify';

//Import API
import { PutAlamatCustomer } from '../../../api/apiAlamat';

const EditAlamat = ({onSuccess, dataAlamat}) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alamat, setAlamat] = useState(dataAlamat);
    const [data, setData] = useState({
        ID_Alamat : dataAlamat.ID_Alamat,
        ID_Customer : dataAlamat.ID_Customer,
        Alamat : dataAlamat.Alamat
    });

    const handleClose = () => {
        setShow(false);
        onSuccess();
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        PutAlamatCustomer(data).then((response) => {
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
            <Button className='mx-2' variant='warning' size='sm' onClick={handleShow}>Edit</Button>
            <Modal show={show} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Alamat</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control as='textarea' name='Alamat' value={data.Alamat} onChange={handleChange} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>Close</Button>
                        <Button variant='warning' type='submit'>
                            {loading && (
                                <Spinner animation='border' variant='light' size='sm' />
                            )}
                            {loading && 'Loading...'}
                            {!loading && 'Save'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default EditAlamat;