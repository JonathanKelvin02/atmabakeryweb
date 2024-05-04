import { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

import { GetDetailTransaksi } from '../../../api/apiCustomer';

const TransaksiDetailModal = ({ show, onClose, data }) => {

    const [currentData, setCurrentData] = useState({});
    const [currentDataArray, setCurrentDataArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        GetDetailTransaksi(data.ID_Transaksi).then((response) => {
            setCurrentDataArray(response.tbldetailtransaksi);
            setCurrentData(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    };

    useEffect(() => {
        fetchData();
    }, [show]);

    console.log(currentDataArray);

    return (
        <>
            <Modal
                show={show}
                onHide={onClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

            <Modal.Header closeButton>
            </Modal.Header>

            <Modal.Body>
                
            </Modal.Body>

            </Modal>
        </>
    );
}

export default TransaksiDetailModal;