import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner, Modal } from 'react-bootstrap';

const DeleteConfirmationModal = ({show, onClose, initialData, onConfirm }) => {

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
                    Delete Data
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                Are you sure you want to delete this data? <br/>
                <b>{`${Object.values(initialData).length > 3 ? Object.values(initialData).slice(1).join(', ') : Object.values(initialData).join(', ')}`}</b>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-success" onClick={() => { onConfirm(true); onClose(); }}>Delete</Button>
                <Button variant="danger" onClick={() => { onConfirm(false); onClose(); }}>Cancel</Button>
            </Modal.Footer>

            {/* <Modal.Footer>
                <Button variant="outline-success" onClick={() => { onClose(); onConfirm(true); }}>Delete</Button>
                <Button variant="danger" onClick={() => { onClose(); onConfirm(false); }}>Cancel</Button>
            </Modal.Footer> */}

            </Modal>
        </>
    );
}

export default DeleteConfirmationModal;