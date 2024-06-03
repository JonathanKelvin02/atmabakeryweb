import {useState, useEffect} from 'react';
import {Form, Button, Modal, Spinner} from 'react-bootstrap';
import { toast } from "react-toastify";

import { UpdateJarakBiayaAlamat } from '../../../api/apiAlamat';

const UpdateJarakBiaya = ({onSuccess, dataAlamat}) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [valid, setValid] = useState(true);
    const [data, setData] = useState(dataAlamat);
    const [alamat, setAlamat] = useState ({
        ID_Alamat : dataAlamat.ID_Alamat,
        ID_Customer : dataAlamat.ID_Customer,
        Jarak : dataAlamat.Jarak,
        Biaya : dataAlamat.Biaya
    })

    const handleClose = () => {
        setShow(false);
        onSuccess();
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleChange = (event) => {
        if (event.target.name === 'Jarak' && parseInt(event.target.value) > 15) {
            alamat.Biaya = 25000;
        } else {
            alamat.Biaya = 5000 * Math.floor(2 + (parseInt(event.target.value)/5))
        }

        setAlamat({
            ...alamat,
            [event.target.name] : event.target.value
        })
    }

    const handleChangeValid = () => {
        setValid(!valid);
    }

    const handleSubmit = (event) => {
        setLoading(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            console.log(alamat);
            UpdateJarakBiayaAlamat(alamat).then((response) => {
                setLoading(false);
                toast.success(response.message);
                handleClose();
                console.log(response);
            }).catch((error) => {
                console.log(error);
                toast.error(error.message);
            })
        }
        setValidated(true);
    }

    return (
        <>
            <Button variant='primary' onClick={handleShow}>
                Update Jarak dan Biaya
            </Button>

            <Modal show={show} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Jarak dan Biaya</Modal.Title>
                </Modal.Header>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className='mb-3'>
                            <Form.Label>ID Transaksi</Form.Label>
                            <Form.Control type='text' name='ID_Transaksi' value={data.ID_Transaksi} required disabled/>
                            <Form.Control.Feedback type='invalid'>ID Transaksi Harus Diisi</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Nama Customer</Form.Label>
                            <Form.Control type='text' name='Nama_Customer' value={data.Nama_Customer} required disabled/>
                            <Form.Control.Feedback type='invalid'>Nama Customer Harus Diisi</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Jarak</Form.Label>
                            <Form.Control type='number' name='Jarak' value={alamat.Jarak} onChange={handleChange} required/>
                            <Form.Control.Feedback type='invalid'>Jarak Harus Diisi</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Biaya</Form.Label>
                            <Form.Control type='number' name='Biaya' value={alamat.Biaya} onChange={handleChange} required disabled/>
                            <Form.Control.Feedback type='invalid'>Biaya Harus Diisi</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="ms-1">
                            <Form.Check 
                                    type="checkbox" 
                                    label="I confirm the data is correct" 
                                    onChange={handleChangeValid}
                                />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='primary' type='submit' disabled={valid}>
                            {loading ? (
                                <Spinner animation='border' variant='light' size='sm' />
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateJarakBiaya;