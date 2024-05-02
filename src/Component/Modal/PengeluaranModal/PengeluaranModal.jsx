import { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

import { PostPengeluaran, UpdatePengeluaran } from '../../../api/apiPengeluaran';

const PengeluaranModal = ({ show, onClose, onRefresh, initialData, isUpdate }) => {

    const [nama, setNama] = useState(initialData ? initialData.Nama : "");
    const [harga, setHarga] = useState(initialData ? initialData.Harga : "");
    const [tanggal, setTanggal] = useState(initialData ? initialData.Tanggal : "");

    const [isDisabled, setIsDisabled] = useState(true);
    const [data, setData] = useState(
        initialData 
        ? {
            Nama: initialData.Nama, 
            Harga: initialData.Harga, 
            Tanggal: initialData.Tanggal, 
            Nama_Old: initialData.Nama,
            Harga_Old: initialData.Harga,
            Tanggal_Old: initialData.Tanggal
          }
        : {
            Nama: "", 
            Harga: "", 
            Tanggal: "", 
            Nama_Old: "",
            Harga_Old: "",
            Tanggal_Old: ""
          }
    );

    useEffect(() => {
        setData(
            initialData 
                ? {
                    Nama: initialData.Nama, 
                    Harga: initialData.Harga, 
                    Tanggal: initialData.Tanggal, 
                    Nama_Old: initialData.Nama,
                    Harga_Old: initialData.Harga,
                    Tanggal_Old: initialData.Tanggal
                  }
                : {
                    Nama: "", 
                    Harga: "", 
                    Tanggal: "", 
                    Nama_Old: "",
                    Harga_Old: "",
                    Tanggal_Old: ""
                  }
        );
    }, [initialData]);

    const handleChange = (event) => {
        if (event.target.name === 'Nama') {
            setNama(event.target.value);
            setData(prevData => ({ ...prevData, Nama: event.target.value }));
        }

        if (event.target.name === 'Harga') {
            setHarga(event.target.value);
            setData(prevData => ({ ...prevData, Harga: event.target.value }));
        }

        if (event.target.name === 'Tanggal') {
            setTanggal(event.target.value);
            setData(prevData => ({ ...prevData, Tanggal: event.target.value }));
        }
    }

    const SendDataPengeluaran = (event) => {
        event.preventDefault();
        console.log(data);

        const apiFunction = isUpdate ? UpdatePengeluaran : PostPengeluaran;

        apiFunction(data).then((response) => {
            console.log(response);
            onClose();
            onRefresh();
        }).catch((err) => {
            console.log(err);
            onClose();
        })
    }

    return (
        <>
            <Form className='roboto'>
                <Modal
                    show={show}
                    onHide={onClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {isUpdate ? "Update" : "Add"} Expenditure Data
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-2">
                        <div className='roboto-bold' style={{ marginLeft: '1%' }}>Expenditure Name</div>
                        <Form.Control style={{ borderColor: '#3C4242' }} type="text" name='Nama' placeholder="Enter expenditure name" onChange={handleChange} value={nama}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-2">
                        <div className='roboto-bold' style={{ marginLeft: '1%' }}>Price</div>
                        <Form.Control style={{ borderColor: '#3C4242' }} type="number" name='Harga' placeholder="Enter the price" onChange={handleChange} value={harga}/>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <div className='roboto-bold' style={{ marginLeft: '1%' }}>Date</div>
                        <Form.Control style={{ borderColor: '#3C4242' }} type="date" name='Tanggal' placeholder="Enter the date" onChange={handleChange} value={tanggal}/>
                    </Form.Group>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="outline-success" type="submit" onClick={SendDataPengeluaran} >Save</Button>
                    <Button variant="danger" onClick={onClose}>Cancel</Button>
                </Modal.Footer>
                
                </Modal>
            </Form>
        </>
    );
}

export default PengeluaranModal;