import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

import "./ShowBuktiPembayaran.css";
import { SendProofPayment } from '../../../api/apiCustomer';

const ShowBuktiPesanan = ({ show, onClose, initialData }) => {

    const cld = new Cloudinary({cloud: {cloudName: 'dui6wroks'}});
    const img = cld.image(initialData.Bukti_Pembayaran)
          .format('auto')
          .quality('auto')
          .resize(auto().gravity(autoGravity()).width(500).height(500));

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
                        The Proof of Your Payment, {initialData.tblcustomer.Nama_Customer}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className='showBuktiPembayaranField'>
                        <div className='imageContainer'>
                            <AdvancedImage cldImg={img}/>
                        </div>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-success" type="button" onClick={onClose}>Save</Button>
                    <Button variant="danger" onClick={onClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
}

export default ShowBuktiPesanan;