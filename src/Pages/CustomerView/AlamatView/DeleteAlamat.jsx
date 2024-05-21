import {useState} from 'react';
import {Modal, Form, Button, Spinner} from 'react-bootstrap';
import { toast } from 'react-toastify';
//Impor API
import { DeleteAlamatCustomer } from '../../../api/apiAlamat';

const DeleteAlamat = ({onSuccess, dataAlamat}) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(dataAlamat);
    const [alamat, setAlamat] = useState({
        ID_Alamat : dataAlamat.ID_Alamat,
        ID_Customer : dataAlamat.ID_Customer,
        Alamat : dataAlamat.Alamat
    })

    const handleClose = () => {
        setShow(false);
        onSuccess();
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleDelete = () => {
        setLoading(true);
        DeleteAlamatCustomer(alamat).then((response) => {
            toast.success(response.message);
            console.log(response);
            setLoading(false);
            handleClose();
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    return(
        <>
            <Button className='mx-2' variant='danger' size='sm' onClick={handleShow}>Delete</Button>
            <Modal show={show} size='lg' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Alamat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Apakah Anda yakin ingin menghapus alamat <b>{alamat.Alamat}</b> ini?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                    <Button variant='danger' onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteAlamat;