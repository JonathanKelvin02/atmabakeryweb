import { useEffect, useState } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

// Import Css
import './Product.css';

//Import API
import { DeleteProduct, GetAllTitipan } from "../../../api/apiProduk";

const TitipanView = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); 
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    
    const deleteTitipan = (id) => {
        setIsLoading(true);
        DeleteProduct(id).then((response) => {
            setIsLoading(false);
            toast.success(response.message);
            fetchProducts();
            handleCloseModal();
        }).catch((e) => {
            console.log(e);
            setIsLoading(false);
            toast.dark(e.message);
        })
    }

    const fetchProducts = () => {
        setIsLoading(true);
        GetAllTitipan().then((response) => {
            setProducts(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const handleEdit = (titipan) => {
        navigate('/admin/edit-titipan', { state: {titipan} });
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
        fetchProducts();
    }, [])

    return(
        <>
            <Container className="top-container">
                <Row>
                    <Col>
                        <InputGroup>
                            <input className="search" type="search" name="" id="" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
                            <button type="button" className="search-button">
                                <FaSearch style={{ color: 'white' }} />
                            </button>
                        </InputGroup>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <button className="add-product border-0" type="button" onClick={() => navigate('/admin/create-titipan')}>
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
                    products?.length > 0 ? (
                        <Container className="list-product">
                            <table>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Penitip</th>
                                        <th>Ready Stock</th>
                                        <th style={{ width: '24%'}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.filter((item) => {
                                            return search.toLowerCase() === '' 
                                            ? item 
                                            : item.tblproduk.Nama_Produk.toLowerCase().includes(search.toLowerCase());
                                        }).map((homecook, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <td>{homecook.tblproduk.Nama_Produk}</td>
                                            <td>Rp.{homecook.tblproduk.Harga}</td>
                                            <td>{homecook.penitip.Nama_Penitip}</td>
                                            <td>{homecook.tblproduk.StokReady}</td>
                                            <td>
                                                <button className="edit-action" onClick={() => handleEdit(homecook)}>Edit</button>
                                                <button className="delete-action" onClick={() => handleShowModal(homecook.ID_Produk)}>Delete</button>
                                            </td>
                                        </tr> 
                                    ))}
                                    
                                </tbody>
                            </table>
                        </Container>
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
                    <Button variant="danger" onClick={() => deleteTitipan(productIdToDelete)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TitipanView;