import { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { PostPengeluaran, UpdatePengeluaran } from '../../../api/apiPengeluaran';

const PengeluaranModal = ({ show, onClose, onRefresh, initialData, isUpdate }) => {

    const [nama, setNama] = useState(initialData ? initialData.Nama : "");
    const [harga, setHarga] = useState(initialData ? initialData.Harga : "");
    const [tanggal, setTanggal] = useState(initialData ? initialData.Tanggal : "");

    const [errors, setErrors] = useState({});

    const [isDisabled, setIsDisabled] = useState(true);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [data, setData] = useState(
        initialData 
        ? {
            ID_Pengeluaran: initialData.ID_Pengeluaran,

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
                    ID_Pengeluaran: initialData.ID_Pengeluaran,

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

    const handleConfirmationChange = (event) => {
        setIsConfirmed(event.target.checked);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let errors = {};

        if (!nama.trim()) {
            errors.Nama = 'Name is required';
        }

        if (!harga || harga < 0) {
            errors.Harga = 'Price is required and should be 0 or more';
        }

        if (!tanggal.trim()) {
            errors.Tanggal = 'Date is required';
        }

        setErrors(errors);
        return errors;
    }
    
    const SendDataPengeluaran = (event) => {
        event.preventDefault();
        console.log(data);

        const errors = handleSubmit(event);

        if (Object.keys(errors).length > 0) {
            return;
        }else{
            const apiFunction = isUpdate ? UpdatePengeluaran : PostPengeluaran;

            apiFunction(data).then((response) => {
                console.log(response);
                toast.success("Expenses Data " + (isUpdate ? "Update" : "Add") + " Successfully");
                onClose();
                onRefresh();
            }).catch((err) => {
                console.log(err);
                toast.error("Expenses Data " + (isUpdate ? "Update" : "Add") + " Failed");
                // onClose();
            })
        }
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
                        {errors.Nama && <div style={{ color: 'red' }}>{errors.Nama}</div>}
                    </Form.Group>
                    
                    <Form.Group className="mb-2">
                        <div className='roboto-bold' style={{ marginLeft: '1%' }}>Price</div>
                        <Form.Control style={{ borderColor: '#3C4242' }} type="number" name='Harga' placeholder="Enter the price" onChange={handleChange} value={harga}/>
                        {errors.Harga && <div style={{ color: 'red' }}>{errors.Harga}</div>}
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <div className='roboto-bold' style={{ marginLeft: '1%' }}>Date</div>
                        <Form.Control style={{ borderColor: '#3C4242' }} type="date" name='Tanggal' placeholder="Enter the date" onChange={handleChange} value={tanggal}/>
                        {errors.Tanggal && <div style={{ color: 'red' }}>{errors.Tanggal}</div>}
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Check 
                            type="checkbox" 
                            label="I confirm the data is correct" 
                            onChange={handleConfirmationChange}
                        />
                    </Form.Group>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="outline-success" type="submit" onClick={SendDataPengeluaran} disabled={!isConfirmed}>Save</Button>
                    <Button variant="danger" onClick={onClose}>Cancel</Button>
                </Modal.Footer>
                
                </Modal>
            </Form>
        </>
    );
}

export default PengeluaranModal;