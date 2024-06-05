import {useState, useEffect} from 'react';
import {Modal, Button, Spinner} from 'react-bootstrap';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const SHowBuktiPembayaran = ({dataTransaksi}) => {
    const cld = new Cloudinary({cloud: {cloudName: 'dui6wroks'}});
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bukti] = useState(dataTransaksi.Bukti_Pembayaran);

    const img = cld.image(bukti).format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            <Button variant='secondary' size='sm' onClick={handleShow}>
                Tampil Bukti Pembayaran
            </Button>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Bukti Pembayaran</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        {loading ? (
                            <Spinner animation='border' variant='primary' />
                        ) : (
                            <AdvancedImage cldImg={img} />
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SHowBuktiPembayaran;