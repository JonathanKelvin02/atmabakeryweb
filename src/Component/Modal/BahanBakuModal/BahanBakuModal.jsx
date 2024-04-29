import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner, Modal } from 'react-bootstrap';

import { PostBahanBaku, UpdateBahanBaku } from '../../../api/apiBahanBaku';

const BahanBakuModal = ({ show, onClose, onRefresh, initialData, isUpdate }) => {

    const [isDisabled, setIsDisabled] = useState(true);
    const [data, setData] = useState(
        initialData || {Nama_Bahan: "", Stok: "", Satuan: ""}
    );

    useEffect(() => {
        setData(initialData || {Nama_Bahan: "", Stok: "", Satuan: ""});
    }, [initialData]);

    const handleChange = (event) => {
        const newData = { ...data, [event.target.name]: event.target.value};
        setData(newData);
        if (newData.Nama_Bahan.trim().length > 0 && newData.Stok > 0 && newData.Satuan.trim().length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }

    const SendDataBahan = (event) => {
        event.preventDefault();
        console.log(isUpdate);

        const apiFunction = isUpdate ? UpdateBahanBaku : PostBahanBaku;

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
                        Add Ingredients Data
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form onSubmit={SendDataBahan} className='roboto'> */}
                        <Form.Group className="mb-2">
                            <div className='roboto-bold' style={{ marginLeft: '1%' }}>Ingredients Name</div>
                            <Form.Control style={{ borderColor: '#3C4242' }} type="text" name='Nama_Bahan' placeholder="Enter ingredients name" onChange={handleChange}/>
                        </Form.Group>
                        
                        <Form.Group className="mb-2">
                            <div className='roboto-bold' style={{ marginLeft: '1%' }}>Quantity</div>
                            <Form.Control style={{ borderColor: '#3C4242' }} type="number" name='Stok' placeholder="Enter the quantity" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <div className='roboto-bold' style={{ marginLeft: '1%' }}>Unit</div>
                            <Form.Control style={{ borderColor: '#3C4242' }} type="text" name='Satuan' placeholder="Enter the unit" onChange={handleChange}/>
                        </Form.Group>
                    {/* </Form> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" type="submit" onClick={SendDataBahan}>Save</Button>
                    <Button variant="outline-danger" onClick={onClose}>Cancel</Button>
                </Modal.Footer>
                </Modal>
            </Form>
        </>
    );
}

export default BahanBakuModal;