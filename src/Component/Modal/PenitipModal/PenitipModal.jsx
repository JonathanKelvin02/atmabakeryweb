import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { PostPenitip, UpdatePenitip } from '../../../api/apiPenitip';

const BahanBakuModal = ({ show, onClose, onRefresh, initialData, isUpdate }) => {
    const [namaPenitip, setNamaPenitip] = useState(initialData ? initialData.Nama_Penitip : "");

    const [errors, setErrors] = useState({});

    const [isDisabled, setIsDisabled] = useState(true);
    const [data, setData] = useState(
        initialData || {Nama_Penitip: ""}
    );

    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        setData(initialData || {Nama_Penitip: ""});
    }, [initialData]);

    const handleChange = (event) => {
        if (event.target.name === 'Nama_Penitip') {
            setNamaPenitip(event.target.value);
            setData(prevData => ({ ...prevData, Nama_Penitip: event.target.value }));
        }
    }

    const handleConfirmationChange = (event) => {
        setIsConfirmed(event.target.checked);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let errors = {};

        if (!namaPenitip.trim()) {
            errors.Nama_Penitip = 'Depositors name is required';
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
            const apiFunction = isUpdate ? UpdatePenitip : PostPenitip;

            apiFunction(data).then((response) => {
                console.log(response);
                toast.success("Depositor Data " + (isUpdate ? "Update" : "Add") + " Successfully");
                onClose();
                onRefresh();
            }).catch((err) => {
                console.log(err);
                toast.error("Depositor Data " + (isUpdate ? "Update" : "Add") + " Failed");
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
                        {isUpdate ? "Update" : "Add"} Depositors Data
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-2">
                        <div className='roboto-bold' style={{ marginLeft: '1%' }}>Depositor Name</div>
                        <Form.Control style={{ borderColor: '#3C4242' }} type="text" name='Nama_Penitip' placeholder="Enter depositor name" onChange={handleChange} value={namaPenitip}/>
                        {errors.Nama_Penitip && <div style={{ color: 'red' }}>{errors.Nama_Penitip}</div>}
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
                    <Button variant="outline-success" type="submit" onClick={SendDataBahan} disabled={!isConfirmed}>Save</Button>
                    <Button variant="danger" onClick={onClose}>Cancel</Button>
                </Modal.Footer>
                
                </Modal>
            </Form>
        </>
    );
}

export default BahanBakuModal;