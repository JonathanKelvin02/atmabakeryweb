import {useState} from 'react';
import {Modal, Button, Spinner} from 'react-bootstrap';
import { toast } from 'react-toastify';

//Import API
import { PutTransaksiSelesaiCustomer } from '../../../api/apiTransaksi';

const UpdateStatusTransaksiCustomer = ({onSuccess, dataHistory}) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data] = useState(dataHistory);

    const handleClose = () => {
        setShow(false);
        onSuccess();
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        PutTransaksiSelesaiCustomer(data).then((response) => {
            console.log(response);
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
            <div className='d-grid gap-2'>
                <Button variant='light' size='sm' onClick={handleShow}>
                    <b>Selesai</b>
                </Button>
            </div>

            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Konfirmasi Pesanan Selesai</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center'>
                        <h5>Apakah anda yakin pesanan dengan ID transaksi <b>{data.ID_Transaksi}</b> ini sudah selesai?</h5>
                    </div>
                    <hr/>
                    <div className='d-grid gap-2'>
                        <Button variant='success' onClick={handleSubmit}>
                            {loading ? (
                                <Spinner animation='border' size='sm'/>
                            ) : (
                                <b>Yes</b>
                            )}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UpdateStatusTransaksiCustomer;