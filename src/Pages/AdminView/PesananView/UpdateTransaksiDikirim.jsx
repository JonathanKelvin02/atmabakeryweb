import {useState} from 'react';
import {Modal, Button, Form, Spinner} from 'react-bootstrap';
import { toast } from 'react-toastify';

//Import API
import { PutTransaksiDikirim } from '../../../api/apiTransaksi';

const UpdateTransaksiDikirim = ({onSuccess, dataTransaksi}) => {
    const[show, setShow] = useState(false);
    const[loading, setLoading] = useState(false);
    const[transaksi] = useState(dataTransaksi);

    const handleClose = () => {
        setShow(false);
        onSuccess();
    }

    const handleShow = () => {
        setShow(true);
    }

    const updateTransaksi = (event) => {
        event.preventDefault();
        setLoading(true);
        PutTransaksiDikirim(transaksi).then((response) => {
            setLoading(false);
            toast.success(response.message);
            handleClose();
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    return (
        <>
            <Button className='secondary' size='sm' onClick={handleShow}>
                Update Status Transaksi
            </Button>

            <Modal show={show} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Status Transaksi</Modal.Title>
                </Modal.Header>

                <Form onSubmit={updateTransaksi}>
                    <Modal.Body>
                        <span>Apakah anda yakin untuk mengupdate Transaksi dengan ID <b>{transaksi.ID_Transaksi}</b> ? </span> <br/>
                        {transaksi.Nama_Pengiriman === 'Pick Up' ? (
                            <span>Status : <b>{transaksi.Status}</b> diubah menjadi <b>Siap Dipick-Up</b></span>
                        ) : (
                            <span>Status : <b>{transaksi.Status}</b> diubah menjadi <b>Siap Dikirim</b></span>
                        )}
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

export default UpdateTransaksiDikirim;