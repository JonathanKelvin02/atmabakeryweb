import {useState, useEffect} from 'react';
import {Modal, Form, Button, Spinner} from 'react-bootstrap';
import { toast } from "react-toastify";

//Import API
import { UpdateTotalBayarCustomer } from '../../../api/apiTransaksi';

const UpdateTotalBayarTransaksi = ({onSuccess, dataTransaksi}) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transaksi, setTransaksi] = useState(dataTransaksi);
    const [biaya] = useState(dataTransaksi.Biaya);
    const [data, setData] = useState({
        ID_Transaksi : dataTransaksi.ID_Transaksi,
        ID_Customer : dataTransaksi.ID_Customer,
        ID_Pegawai : dataTransaksi.ID_Pegawai,
        ID_Alamat : dataTransaksi.ID_Alamat,
        Tanggal_Transaksi : dataTransaksi.Tanggal_Transaksi,
        Status : dataTransaksi.Status,
        Total_Transaksi : dataTransaksi.Total_Transaksi,
        Tanggal_Ambil : dataTransaksi.Tanggal_Ambil,
        Tanggal_Pelunasan : dataTransaksi.Tanggal_Pelunasan,
        Total_Pembayaran : dataTransaksi.Total_Pembayaran,
        ID_JenisPengiriman : dataTransaksi.ID_JenisPengiriman,
        Tip : dataTransaksi.Tip,
        Total_Bayar : dataTransaksi.Total_Bayar
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
        setLoading(true);
        event.preventDefault();
        console.log(data);
        UpdateTotalBayarCustomer(data).then((response) => {
            setLoading(false);
            toast.success(response.message);
            console.log(response);
            handleClose();
        }).catch((error) => {
            console.log(error);
        })
    }

    return(
        <>
            <Button variant='primary' onClick={handleShow}>
                Update Total Bayar
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Total Bayar</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <span>Apakah total bayar untuk transaksi ID <strong>{data.ID_Transaksi}</strong> bernilai <strong>{data.Total_Transaksi + biaya}</strong> ? </span>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='danger' onClick={handleClose}>Close</Button>
                        <Button variant='primary' type='submit'>
                            {loading ? (
                                <>
                                    <Spinner animation='border' variant='light' />
                                </>
                            ) : (
                                'Update'
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateTotalBayarTransaksi;