import { useEffect, useState } from 'react';
import { Form, Button, Modal, Container, Spinner, ModalHeader } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";

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
                    <Modal.Title id="contained-modal-title-vcenter">
                        Detail Transaksi : {currentData?.ID_Transaksi}
                    </Modal.Title>
                </Modal.Header>        
                <Modal.Body>
                    <Container className="big-container">
                        {isLoading ? (
                            <div className="text-center">
                                <Spinner
                                    as="span"
                                    animation="border"
                                    variant="dark"
                                    size="lg"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <h6 className="mt-2 mb-0">Loading...</h6>
                            </div>
                        ) : (
                            currentDataArray?.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Sub_Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentDataArray?.map((data, index) => (
                                                <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                                    <td>{data.tblproduk.Nama_Produk}</td>
                                                    <td>{data.Kuantitas}</td>
                                                    <td>{data.Sub_Total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <h6>No Data Found</h6>
                                </div>
                            )
                        )}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TransaksiDetailModal;