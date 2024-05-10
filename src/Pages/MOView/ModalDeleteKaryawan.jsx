import {useState, useEffect} from 'react';
import { Button ,Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

//Import API
import { DeleteKaryawan } from '../../api/apiKaryawan';

const ModalDeleteKaryawan = ({dataKaryawan, onSuccess}) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
        onSuccess();
    }

    const handleShow = () => {
        setShow(true);
    }

    const deleteKaryawan = (id) => {
        setIsLoading(true);
        DeleteKaryawan(id).then((response) => {
            setIsLoading(false);
            handleClose();
            toast.success('Karyawan berhasil dihapus');
        }).catch((error) => {
            setIsLoading(false);
            console.log(error);
            toast.error('Gagal menghapus karyawan');
        })
    }

    return (
        <>
            <Button className='me-2' variant='danger' size='sm' onClick={handleShow}>
                Hapus
            </Button>

            <Modal size='lg' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className='text-center'>
                    <Modal.Title>Hapus Karyawan <b>{dataKaryawan?.Nama_Pegawai}</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <span>Apakah anda yakin ingin menghapus data karyawan <b>{dataKaryawan?.Nama_Pegawai}</b> ?</span>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Batal</Button>
                    <Button variant='danger' onClick={() => deleteKaryawan(dataKaryawan.ID_Pegawai)}>{isLoading ? 'Loading...' : 'Hapus'}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteKaryawan;