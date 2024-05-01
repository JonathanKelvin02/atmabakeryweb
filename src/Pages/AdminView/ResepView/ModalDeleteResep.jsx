import {useState, useEffect} from 'react';
import {Modal, Button, Form, Spinner} from 'react-bootstrap';
import {toast} from 'react-toastify';

// Import API
import {DeleteResep} from '../../../api/apiResep';

const ModalDeleteResep = ({dataResep, onSuccess}) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
        onSuccess();
    }

    const handleShow = () => {
        setShow(true);
    }

    const deleteResep = (id) => {
        setIsLoading(true);
        DeleteResep(id).then((response) => {
            setIsLoading(false);
            handleClose();
            toast.success('Resep berhasil dihapus');
        }).catch((error) => {
            setIsLoading(false);
            console.log(error);
            toast.error('Gagal menghapus resep');
        })
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>Hapus</Button>

            <Modal size='lg' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className='text-center'>
                    <Modal.Title>Hapus Resep {dataResep.tblproduk.Nama_Produk}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Apakah anda yakin ingin menghapus data produk {dataResep.tblproduk.Nama_Produk} ?</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Batal</Button>
                    <Button variant='danger' onClick={() => deleteResep(dataResep.ID_Produk)}>{isLoading ? <Spinner animation='border' variant='light' size='sm' role='status' aria-hidden='true'/> : 'Hapus'}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteResep;