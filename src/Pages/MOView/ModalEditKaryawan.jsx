import {Modal, Form, Button, Spinner} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//Import API
import { GetAllJabatan} from '../../api/apiJabatan';
import { PutKaryawan } from '../../api/apiKaryawan';

const ModalEditKaryawan = ({ dataKaryawan, onSuccess }) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const [valid, setValid] = useState(true);

    const [jabatan, setJabatan] = useState([]);

    const [data, setData] = useState(dataKaryawan);

    const handleClose = () => {
        setShow(false);
        onSuccess();
    }

    const handleShow = () => {
        console.log(data.ID_Pegawai);
        setShow(true);
        fetchJabatan();
    }

    const handleChangeValid = () => {
        setValid(!valid);
    }

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
        };

    const fetchJabatan = () => {
        GetAllJabatan().then((response) => {
            setJabatan(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    const submitData = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            setIsLoading(true);
            PutKaryawan(data).then((response) => {
                setIsLoading(false);
                toast.success("Karyawan Berhasil Diubah");
                handleClose();
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
                toast.error(err);
            })
        }
        setValidated(true);
    }

    return (
        <>
            <Button variant="success" size='sm' className='me-2' onClick={handleShow}>
                Edit
            </Button>

            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Karyawan</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={submitData}>
                    <Modal.Body>
                        <Form.Group className='mb-3'>
                            <Form.Label>Nama Karyawan</Form.Label>
                            <Form.Control type="text" name="Nama_Pegawai" value={data?.Nama_Pegawai} onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">Harap masukkan <b>Nama Karyawan</b></Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Control as="select" type='select' name="ID_Jabatan" value={data?.ID_Jabatan} onChange={handleChange} required>
                                <option selected hidden>Pilih Jabatan</option>
                                {jabatan.map((jabatan, index) => (
                                    <option key={index} value={jabatan.ID_Jabatan}>{jabatan.Nama_Jabatan}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Harap masukkan <b>Jabatan</b></Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Nomor Rekening</Form.Label>
                            <Form.Control type="text" name="Nomor_Rekening" value={data?.Nomor_Rekening} onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">Harap masukkan <b>Nomor Rekening</b></Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={data?.email} onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">Harap masukkan <b>Email</b></Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={data?.password} onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">Harap masukkan <b>Password</b></Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                                <Form.Label>Nomor Telepon</Form.Label>
                                <Form.Control type="text" name="Nomor_Telepon" value={data?.Nomor_Telepon} onChange={handleChange} required/>
                                <Form.Control.Feedback type="invalid">Harap masukkan <b>Nomor Telepon</b></Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-2">
                        <Form.Check 
                                type="checkbox" 
                                label="I confirm the data is correct" 
                                onChange={handleChangeValid}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" disabled={valid}>
                                {isLoading ? (
                                    <Spinner animation="border" variant="light" size="sm" role="status" aria-hidden="true" />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Form>
            </Modal>
        </>
    )
}

export default ModalEditKaryawan;