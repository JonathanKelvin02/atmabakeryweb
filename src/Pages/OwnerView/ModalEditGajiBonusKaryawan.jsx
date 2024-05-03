import {Button, Modal, Form, Spinner} from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Import API
import { PutKaryawan } from "../../api/apiKaryawan";

const ModalEditGajiBonusKaryawan = ({ dataKaryawan, onSuccess}) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(dataKaryawan);

    const handleClose = () => {
        setShow(false);
        onSuccess();
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const submitData = (event) => {
        event.preventDefault();
        setIsLoading(true);
        PutKaryawan(data).then((response) => {
            setIsLoading(false);
            toast.success("Karyawan Berhasil Diubah");
            handleClose();
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
            toast.error(err);
        })
    }

    return (
        <>
            <Button variant="success" size="sm" onClick={handleShow}>
                Edit Gaji & Bonus
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Gaji dan Bonus Karyawan</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitData}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Karyawan</Form.Label>
                            <Form.Control type="text" name="Nama_Pegawai" value={data.Nama_Pegawai} onChange={handleChange} disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nomor Rekening</Form.Label>
                            <Form.Control type="text" name="Nomor_Rekening" value={data.Nomor_Rekening} onChange={handleChange} disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={data.email} onChange={handleChange} disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gaji</Form.Label>
                            <Form.Control type="number" name="Gaji" value={data.Gaji} onChange={handleChange} required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Bonus</Form.Label>
                            <Form.Control type="number" name="Bonus" value={data.Bonus} onChange={handleChange} required/>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" type="submit">
                                {isLoading ? (
                                    <>
                                        <Spinner animation="border" variant="light" size="sm" role="status"/>
                                        <span className="visually-hidden">Loading...</span>
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Form>
            </Modal>
        </>
    )
}

export default ModalEditGajiBonusKaryawan;