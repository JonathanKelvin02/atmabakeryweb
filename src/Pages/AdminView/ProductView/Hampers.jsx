import { useEffect, useState } from "react";
import { Container, Spinner, Row, Col, InputGroup, Alert, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

// Import Css
import './Product.css';

//Import API
import { GetAllHampers, GetAllRecipe, DeleteProduct } from "../../../api/apiProduk";

const HampersView = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [resep, setResep] = useState([]);
    const [showModal, setShowModal] = useState(false); 
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    const deleteHampers = (id) => {
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
        GetAllHampers().then((response) => {
            setProducts(response);
            setIsLoading(false);
            console.log(products);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const getAllRecipe = async () => {
        setIsLoading(true);
        await GetAllRecipe().then((response) => {
            setResep(response);
            setIsLoading(false);
            console.log(resep);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const handleEdit = (hamper) => {
        navigate('/admin/edit-hampers', { state: {hamper} });
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
        getAllRecipe();
    }, [])

    return(
        <>
            <Container className="top-container">
                <Row>
                    <Col>
                        <InputGroup>
                            <input className="search" type="search" name="" id="" placeholder="Search..." />
                            <button type="button" className="search-button">
                                <FaSearch style={{ color: 'white' }} />
                            </button>
                        </InputGroup>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <button className="add-product border-0" type="button" onClick={() => navigate('/admin/create-hampers')}>
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
                    products?.length > 0 && resep?.length > 0 ? (
                        <Container className="list-product">
                            <table>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Limit/Day</th>
                                        <th>Product List</th>
                                        <th>Quantity</th>
                                        <th style={{ width: '20%'}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map((hampers, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <td>{hampers.tblproduk.Nama_Produk}</td>
                                            <td>Rp.{hampers.tblproduk.Harga}</td>
                                            <td>{hampers.tblproduk.Stok}</td>
                                            <td>
                                                <ul className="m-0 p-0" style={{listStyleType: 'none'}}>
                                                    {/* loading here */}
                                                    {hampers.resep.map((myresep, index) => (
                                                        <li key={index}>{resep.find(recipe => recipe.ID_Produk === myresep.ID_Produk)?.tblproduk.Nama_Produk}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>
                                                <ul className="m-0 p-0" style={{listStyleType: 'none'}}>
                                                    {/* loading here */}
                                                    {hampers.resep.map((myresep, index) => (
                                                        <li key={index}>
                                                            {myresep.pivot.Kuantitas}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>
                                                <button className="edit-action" onClick={() => handleEdit(hampers)}>Edit</button>
                                                <button className="delete-action" onClick={() => handleShowModal(hampers.ID_Produk)}>Delete</button>
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
                    <Button variant="danger" onClick={() => deleteHampers(productIdToDelete)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default HampersView;