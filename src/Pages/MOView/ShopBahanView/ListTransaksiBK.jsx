import { useEffect, useState } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

//Import Css
import './ListTransaksi.css';

//Import API
import { getAllTransBahan  } from "../../../api/apiTransBahan";

const TransaksiBahan = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    // const deleteHomecook = (id) => {
    //     setIsLoading(true);
    //     DeleteProduct(id).then((response) => {
    //         setIsLoading(false);
    //         toast.success(response.message);
    //         fetchProducts();
    //         handleCloseModal();
    //     }).catch((e) => {
    //         console.log(e);
    //         setIsLoading(false);
    //         toast.dark(e.message);
    //     })
    // }
    
    const fetchTrans = () => {
        setIsLoading(true);
        getAllTransBahan().then((response) => {
            setTransactions(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const sumSubTotal = (trans) => {
        let total = 0;
        trans.bahanbaku.forEach((mytrans) => {
            total += mytrans.pivot.Sub_Total;
        });
        return total;
    }

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }

    const handleEdit = (resep) => {
        navigate('/admin/edit-resep', { state: {resep} });
    }

    const handleShowModal = (productId) => {
        setProductIdToDelete(productId);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setProductIdToDelete(null);
        setShowModal(false);
    }

    useEffect(() => {
        fetchTrans();
    }, [])

    return(
        <>
            <Container className="top-container">
                <Row>
                    <Col>
                        <InputGroup>
                            <input className="search" type="search" name="" id="" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                            <button type="button" className="search-button">
                                <FaSearch style={{ color: 'white' }} />
                            </button>
                        </InputGroup>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <button className="add-product border-0" type="button" onClick={() => navigate('/admin/create-resep')}>
                            <FaPlus className="mr-1" /> <b>Add Product</b>
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
                    transactions?.length > 0 ? (
                        <>
                            <Container className="list-product">
                                <table>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <th>Tanggal</th>
                                            <th>List Bahan Baku</th>
                                            <th>Kuantitas</th>
                                            <th>Total</th>
                                            <th style={{ width: '24%'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions?.map((trans) => (
                                            <tr key={trans.ID_Transaksi_Baku} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                                <td>{formatDate(trans.Tanggal)}</td>
                                                <td>
                                                    <ul className="m-0 p-0" style={{listStyleType: 'none'}}>
                                                        {trans.bahanbaku.map((mytrans, index) => (
                                                            <li key={index}>{mytrans.Nama_Bahan}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    <ul className="m-0 p-0" style={{listStyleType: 'none'}}>
                                                        {trans.bahanbaku.map((mytrans, index) => (
                                                            <li key={index}>{mytrans.pivot.Kuantitas}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    Rp.{sumSubTotal(trans)}
                                                </td>
                                                <td>
                                                    <button className="edit-action" onClick={() => handleEdit(trans)}>Edit</button>
                                                    <button className="delete-action" onClick={() => handleShowModal(trans.ID_Transaksi_Baku)}>Delete</button>
                                                </td>
                                            </tr> 
                                        ))}
                                        
                                    </tbody>
                                </table>
                            </Container>
                        </>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Products Yet
                        </Alert>
                    )
                )}
            </Container>
            {/* Modal Confirmation Delete */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this product?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => deleteHomecook(productIdToDelete)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TransaksiBahan;