import { useState } from 'react';
import {Form, Modal, Button, Spinner} from 'react-bootstrap';
import { toast } from 'react-toastify';

//Import API
import { UpdateStatus } from '../../../api/apiTransaksi';

const UpdateStatusTransaksi = ({onSuccess, dataTransaksi}) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transaksi, setTransaksi] = useState(dataTransaksi);

    const handleClose = () => {
        setShow(false);
        onSuccess();
    }

    const handleShow = () => {
        setShow(true);
    }

    const updateStatus = (event) => {
        event.preventDefault();
        setLoading(true);
        UpdateStatus(transaksi).then((response) => {
            toast.success("Berhasil mengubah status transaksi");
            handleClose();
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        })
    }

    return(
        <>
            <Button variant='primary' size='sm' onClick={handleShow}>Update Status</Button>
            <Modal show={show} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Status Transaksi</Modal.Title>
                </Modal.Header>
                <Form onSubmit={updateStatus}>
                    <Modal.Body>
                        <p>Apakah anda yakin ingin mengubah status transaksi dengan ID <b>{transaksi.ID_Transaksi}</b>?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>Close</Button>
                        {loading ? (
                            <Button variant='primary' disabled>
                                <Spinner animation='border' variant='light' size='sm' />
                            </Button>
                        ) : (
                            <Button variant='primary' type='submit'>Update Status</Button>
                        )}
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateStatusTransaksi;