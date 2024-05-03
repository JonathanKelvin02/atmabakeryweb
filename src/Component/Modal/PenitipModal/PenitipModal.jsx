import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner, Modal } from 'react-bootstrap';

import { PostPenitip, UpdatePenitip } from '../../../api/apiPenitip';

const BahanBakuModal = ({ show, onClose, onRefresh, initialData, isUpdate }) => {

    const [namaBahan, setNamaBahan] = useState(initialData ? initialData.Nama_Penitip : "");

    const [isDisabled, setIsDisabled] = useState(true);
    const [data, setData] = useState(
        initialData || {Nama_Penitip: ""}
    );

    useEffect(() => {
        setData(initialData || {Nama_Penitip: ""});
    }, [initialData]);

    const handleChange = (event) => {
        if (event.target.name === 'Nama_Penitip') {
            setNamaBahan(event.target.value);
            setData(prevData => ({ ...prevData, Nama_Penitip: event.target.value }));
        }
    }

    const SendDataBahan = (event) => {
        event.preventDefault();
        console.log(data.ID_Penitip);
        console.log(isUpdate);

        const apiFunction = isUpdate ? UpdatePenitip : PostPenitip;

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
                        {isUpdate ? "Update" : "Add"} Depositors Data
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-2">
                        <div className='roboto-bold' style={{ marginLeft: '1%' }}>Depositor Name</div>
                        <Form.Control style={{ borderColor: '#3C4242' }} type="text" name='Nama_Penitip' placeholder="Enter depositor name" onChange={handleChange} value={namaBahan}/>
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