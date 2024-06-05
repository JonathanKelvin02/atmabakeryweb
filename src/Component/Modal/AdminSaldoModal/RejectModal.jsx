import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { GetAllHistorySaldo, AcceptSaldo, RejectSaldo } from "../../../api/apiHistorySaldo.jsx";

const ApproveModal = ({show, onClose, initialData }) => {

    const RejectSaldoO = (id) => {
        console.log(id);

        RejectSaldo(id).then((response) => {
            toast.success("Saldo Rejected Successfully");
        }).catch((err) => {
            console.log(err);
        })

        onClose();
    }

    return (
        <>
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
                    Reject Modal
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                Are you sure you want to reject this data? <br/>
                <b>{`${Object.values(initialData).length > 3 ? Object.values(initialData).slice(1).join(', ') : Object.values(initialData).join(', ')}`}</b>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-success" onClick={() => { RejectSaldoO(initialData.ID_History) }}>Reject</Button>
                <Button variant="danger" onClick={() => { onClose(); }}>Cancel</Button>
            </Modal.Footer>

            {/* <Modal.Footer>
                <Button variant="outline-success" onClick={() => { onClose(); onConfirm(true); }}>Delete</Button>
                <Button variant="danger" onClick={() => { onClose(); onConfirm(false); }}>Cancel</Button>
            </Modal.Footer> */}

            </Modal>
        </>
    );
}

export default ApproveModal;