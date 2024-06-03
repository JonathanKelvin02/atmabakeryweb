import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import TestImage from '../../../assets/ImgCarousel/ImgCarousel(1).jpg';

import "./ShowPesananModal.css";
import { SendProofPayment } from '../../../api/apiCustomer';

const ShowPesananModal = ({ show, onClose, onRefresh, initialData }) => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [totalPayment, setTotalPayment] = useState('');

    const handleAddPicture = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(file);
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeletePicture = () => {
        setImage(null);
        setImagePreview(null);
    };

    const sendImageProof = () => {
        if (!image) {
            toast.error("Please add a picture first!");
            return;
        }

        if (!totalPayment) {
            toast.error("Please input your total payment");
            return;
        }

        if(initialData.Total_Bayar === null || initialData.Total_Bayar === 0){
            toast.error("Please wait for the admin!");
            return;
        }

        if(totalPayment < initialData.Total_Bayar) {
            toast.error("Your total payment must be equal or more than the total payment from admin");
            return;
        }

        const formData = new FormData();
        formData.append('ID_Transaksi', initialData.ID_Transaksi);
        formData.append('ID_Customer', initialData.ID_Customer);
        formData.append('Bukti_Pembayaran', image, image.name);
        formData.append('Total_pembayaran', totalPayment);

        SendProofPayment(formData)
            .then((response) => {
                console.log(response);
                toast.success("Proof of Payment Sent!");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Proof of Payment Failed!");
            });

        onRefresh();
        onClose();
    }

    return (
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
                        Send Proof of Payment, {initialData.tblcustomer.Nama_Customer}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group>
                        <div className='UploadGambarField'>
                            <input
                                type="file"
                                accept="image/*"
                                id="fileInput"
                                style={{ display: 'none' }}
                                onChange={handleAddPicture}
                            />

                            {/* <Form.Control
                                type='file'
                                name='imageData'
                                id='imageData'
                                className='d-none'
                                onClick={handleAddPicture}
                                accept='image/*'
                            /> */}

                            {!imagePreview ? (
                                <div className='UploadGambarFieldAddButton' onClick={() => document.getElementById('fileInput').click()}>
                                    <a>ADD PICTURE</a>
                                </div>
                            ) : (
                                <div className='UploadGambarFieldImage'>
                                    <img src={imagePreview} alt="Preview" />
                                </div>
                            )}

                            <div className='UploadGambarFieldDeleteButton' onClick={handleDeletePicture}>
                                <a>DELETE PICTURE</a>
                            </div>
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="formBasicRekening">
                        <Form.Label>Dari Admin</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="You must pay this amout" 
                            name="Dari Admin" 
                            value={initialData.Total_Bayar}
                            disabled={true}
                        />
                        <Form.Control.Feedback type="invalid">Please Input Your Total Payment</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="formBasicRekening">
                        <Form.Label>Total Payment</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Input Your Total Payment" 
                            name="Total_pembayaran" 
                            value={totalPayment}
                            onChange={(e) => setTotalPayment(e.target.value)}
                            required 
                        />
                        <Form.Control.Feedback type="invalid">Please Input Your Total Payment</Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-success" type="button" onClick={sendImageProof}>Save</Button>
                    <Button variant="danger" onClick={onClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
}

export default ShowPesananModal;
