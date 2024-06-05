import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, InputGroup, Modal, Alert, Button, Spinner, Badge } from "react-bootstrap";
import { FaShopify, FaCookie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ShowAcceptedOrder } from "../../../api/apiTransCust";
import { UpdateTransToProceed } from "../../../api/apiTransCust";

const ProcessingPesananView = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, setIsPending] = useState(true);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [transaksi, setTransaksi] = useState([]);
    const [showModal, setShowModal] = useState(false); 

    const fetchTransaksi = () => {
        setIsLoading(true);
        ShowAcceptedOrder().then((res) => {
            console.log(res);
            setTransaksi(res);
            setIsLoading(false);
        }).catch((e) => {
            console.log(e);
            setIsLoading(false);
        })
    };
    

    const proceedOrder = (trans) => {
        setIsPending(true);
        UpdateTransToProceed(trans)
        .then((response) => {
            console.log(response.data);
            toast.success(response.message);
            navigate('/MO/Processing');
        })
        .catch((err) => {
            console.log(err);
            setIsPending(false);
            toast.dark(JSON.stringify(err.message));
        })
    }

    const proceedSelectedOrders = () => {
        selectedOrders.forEach(order => {
            proceedOrder(order);
        });
        setSelectedOrders([]);
    };

    const handleCheckboxChange = (trans) => {
        if (selectedOrders.includes(trans)) {
            setSelectedOrders(selectedOrders.filter(order => order !== trans));
            
        } else {
            setSelectedOrders([...selectedOrders, trans]);
            
        }
        setIsPending(false);
    };

    const handleShowModal = (productId) => {
        //setProductIdToDelete(productId);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        //setProductIdToDelete(null);
        setShowModal(false);
    }

    useEffect(() => {
        fetchTransaksi();
    }, []);

    return (
        <>
            {/* <Container className="top-container w-50">
                <div className="d-flex justify-content-start align-items-center">
                    <h6>Ingredients</h6>
                </div>
            </Container>
            <Container className="big-container w-50">
                <Container className="list-product">
                    <table>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                <th>Ingredients</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </Container>
            </Container> */}
            <Container className="top-container">
                <Row>
                    <Col  className="d-flex justify-content-start align-items-center">
                        <h6><b>Proceed Order</b></h6>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <button className="add-product border-0" type="button" onClick={proceedSelectedOrders} disabled={isPending}>
                            <FaCookie className="mr-1" /> <b>Cook All</b>
                        </button>
                    </Col>
                </Row>
            </Container>
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
                    transaksi?.length > 0 ? (
                        <>
                            <Container className="list-product">
                                <table>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <th>Transaction ID</th>
                                            <th>Customer Name</th>
                                            <th>Product Details</th>
                                            <th>Ingredients Status</th>
                                            <th style={{ width: '24%'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transaksi?.map((trans) => (
                                            <tr key={trans.ID_Transaksi} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                                <td>{trans.ID_Transaksi}</td>
                                                <td>{trans.tblcustomer.Nama_Customer}</td>
                                                <td>
                                                    <ul className="m-0 p-0" style={{listStyleType: 'none'}}>
                                                        {/* loading here */}
                                                        {trans.products.map((myprod, index) => (
                                                            <li key={index}>{myprod.Nama_Produk}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    <ul className="m-0 p-0" style={{listStyleType: 'none'}}>
                                                        {trans.Status === "diterima" ? (
                                                            <Badge bg="warning" >Safe</Badge>
                                                        ) : (
                                                            <Badge bg="secondary">Yet ACC</Badge>
                                                        )}
                                                    </ul>
                                                </td>
                                                <td>
                                                    <input 
                                                        type="checkbox" 
                                                        checked={selectedOrders.includes(trans)}
                                                        disabled={trans.Status === "diterima" ? false : true} 
                                                        onChange={() => handleCheckboxChange(trans)}
                                                    />
                                                </td>
                                            </tr> 
                                        ))}
                                        
                                    </tbody>
                                </table>
                            </Container>
                        </>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Transaction Yet
                        </Alert>
                    )
                )}
            </Container>
            {/* Modal Confirmation Delete */}
            {/* <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Update Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to proceed this order?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={() => proceedOrder(order)}>
                        Proceed
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
}

export default ProcessingPesananView;