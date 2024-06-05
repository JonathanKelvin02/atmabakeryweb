import { useEffect, useState } from 'react';
import { Form, Button, Modal, Spinner, Badge  } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { GetAllBahanBakuWithTransaksi, MOAccept, MOReject } from '../../../api/apiBahanBaku';

const RejectTransaction = ({ show, onClose, onRefresh, initialData }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isConfirmed, setIsConfirmed] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        GetAllBahanBakuWithTransaksi(initialData.ID_Transaksi)
            .then((response) => {
                if (response && response.ingredients) {
                    const ingredientsArray = Object.values(response.ingredients);
                    setData(ingredientsArray);
                } else {
                    setData([]);
                    console.error("Ingredients data is missing or not in expected format:", response);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setIsLoading(false);
            });
    };

    const MORejectTransaction = () => {
        MOReject(initialData.ID_Transaksi).then(() => {
            toast.success("Transaction has been rejected!");
            onRefresh();
            onClose();
        })
        .catch((err) => {
            toast.error("Failed to reject transaction!");
            console.error("Error rejecting transaction:", err);
        });
    }

    const handleConfirmationChange = (event) => {
        setIsConfirmed(event.target.checked);
    }

    useEffect(() => {
        fetchData();
    }, [initialData.ID_Transaksi]);

    return (
        <>
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
                           Reject Transaction Data {initialData.ID_Transaksi}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {isLoading ? (
                            <div className="d-flex justify-content-center">
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <div className='table-responsive'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama Bahan</th>
                                            <th>Jumlah</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.Nama_Bahan}</td>
                                                <td>{item.Kuantitas}</td>
                                                <td>
                                                    {item.Kuantitas > item.Stok ? (
                                                        <Badge pill bg="danger">Warning!</Badge>
                                                    ) : (
                                                        <Badge pill bg="success">Safe!</Badge>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <Form.Group className="mb-2">
                            <Form.Check 
                                type="checkbox" 
                                label="I want to reject this transaction" 
                                onChange={handleConfirmationChange}
                            />
                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="outline-success" type="submit" disabled={!isConfirmed} onClick={MORejectTransaction}>Save</Button>
                        <Button variant="danger" onClick={onClose}>Cancel</Button>
                    </Modal.Footer>

                </Modal>
            </Form>
        </>
    );
}

export default RejectTransaction;
