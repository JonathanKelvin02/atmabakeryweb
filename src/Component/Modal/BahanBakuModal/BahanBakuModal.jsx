import { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { PostBahanBaku, UpdateBahanBaku } from '../../../api/apiBahanBaku';

const BahanBakuModal = ({ show, onClose, onRefresh, initialData, isUpdate }) => {

    const [namaBahan, setNamaBahan] = useState(initialData ? initialData.Nama_Bahan : "");
    const [stok, setStok] = useState(initialData ? initialData.Stok : "");
    const [satuan, setSatuan] = useState(initialData ? initialData.Satuan : "");

    const [errors, setErrors] = useState({});

    const [isDisabled, setIsDisabled] = useState(true);
    const [data, setData] = useState(
        initialData || {Nama_Bahan: "", Stok: "", Satuan: ""}
    );

    useEffect(() => {
        setData(initialData || {Nama_Bahan: "", Stok: "", Satuan: ""});
    }, [initialData]);

    const handleChange = (event) => {
        if (event.target.name === 'Nama_Bahan') {
            setNamaBahan(event.target.value);
            setData(prevData => ({ ...prevData, Nama_Bahan: event.target.value }));
        }

        if (event.target.name === 'Stok') {
            setStok(event.target.value);
            setData(prevData => ({ ...prevData, Stok: event.target.value }));
        }

        if (event.target.name === 'Satuan') {
            setSatuan(event.target.value);
            setData(prevData => ({ ...prevData, Satuan: event.target.value }));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let errors = {};

        if (!namaBahan.trim()) {
            errors.Nama_Bahan = 'Ingredients name is required';
        }

        if (!stok || stok < 0) {
            errors.Stok = 'Quantity is required and should be 0 or more';
        }

        if (!satuan.trim()) {
            errors.Satuan = 'Unit is required';
        }

        setErrors(errors);
        return errors;
    }

    const SendDataBahan = (event) => {
        event.preventDefault();
        console.log(isUpdate);

        const errors = handleSubmit(event);

        if (Object.keys(errors).length > 0) {
            return;
        }else{
            const apiFunction = isUpdate ? UpdateBahanBaku : PostBahanBaku;

            apiFunction(data).then((response) => {
                console.log(response);
                toast.success("Ingredients Data " + (isUpdate ? "Update" : "Add") + " Successfully");
                onClose();
                onRefresh();
            }).catch((err) => {
                console.log(err);
                toast.error("Ingredients Data " + (isUpdate ? "Update" : "Add") + " Failed");
                // onClose();
            })
        }
    }

    return (
        <>
            <Form onSubmit={SendDataBahan} className='roboto'>
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
                        {isUpdate ? "Update" : "Add"} Ingredients Data
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-2">
                        <div className='roboto-bold' style={{ marginLeft: '1%' }}>Ingredients Name</div>
                        <Form.Control style={{ borderColor: '#3C4242' }} type="text" name='Nama_Bahan' placeholder="Enter ingredients name" onChange={handleChange} value={namaBahan}/>
                        {errors.Nama_Bahan && <div style={{ color: 'red' }}>{errors.Nama_Bahan}</div>}
                    </Form.Group>
                    
                    <Form.Group className="mb-2">
                        <div className='roboto-bold' style={{ marginLeft: '1%' }}>Quantity</div>
                        <Form.Control style={{ borderColor: '#3C4242' }} type="number" name='Stok' placeholder="Enter the quantity" onChange={handleChange} value={stok}/>
                        {errors.Nama_Bahan && <div style={{ color: 'red' }}>{errors.Stok}</div>}
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <div className='roboto-bold' style={{ marginLeft: '1%' }}>Unit</div>
                        <Form.Control style={{ borderColor: '#3C4242' }} type="text" name='Satuan' placeholder="Enter the unit" onChange={handleChange} value={satuan}/>
                        {errors.Nama_Bahan && <div style={{ color: 'red' }}>{errors.Satuan}</div>}
                    </Form.Group>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="outline-success" type="submit" onClick={SendDataBahan}>Save</Button>
                    <Button variant="danger" onClick={onClose}>Cancel</Button>
                </Modal.Footer>
                
                </Modal>
            </Form>
        </>
    );
}

export default BahanBakuModal;