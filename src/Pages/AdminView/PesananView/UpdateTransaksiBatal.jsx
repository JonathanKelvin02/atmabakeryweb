import { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

//Import API
import { PutTransaksiTelatBayar } from '../../../api/apiTransaksi';

const UpdateTransaksiBatal = ({onSuccess, dataTransaksi}) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data] = useState(dataTransaksi);

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
        onSuccess();
    }

    const PutTransaksiBatal = (data) => {
        setLoading(true);
        PutTransaksiTelatBayar(data).then((response) => {
            setLoading(false);
            toast.success(response.message);
            handleClose();
        }).catch((e) => {
            setLoading(false);
            toast.error(e.message);
        })
    }

    return (
        <>
        <Button variant='success' size='sm' onClick={handleShow}>
            Transaksi Batal
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <h2><b>Ubah Status Transaksi</b></h2>
            </Modal.Header>

            <Modal.Body>
                <span>Apakah anda yakin mengubah status transaksi <b>{data.ID_Transaksi}</b> menjadi <b>batal</b> ?</span>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
                <Button variant='success' onClick={() => PutTransaksiBatal(data)}>
                    {loading ? (
                        <Spinner animation='border' size='sm' variant='light' />
                    ) : (
                        'Ubah Status Transaksi'
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default UpdateTransaksiBatal;