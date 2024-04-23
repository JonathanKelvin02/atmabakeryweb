import { useEffect, useState } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

// Import Css
import './Product.css';

//Import API
import { GetAllRecipe } from "../../../api/apiProduk";

const HomecookView = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchProducts = () => {
        setIsLoading(true);
        GetAllRecipe().then((response) => {
            setProducts(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
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
                            <input className="search" type="search" name="" id="" placeholder="Search..." />
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
                    products?.length > 0 ? (
                        <table>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Limit/Day</th>
                                    <th>Ready Stock</th>
                                    <th style={{ width: '24%'}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((homecook, index) => (
                                    <tr key={homecook.id} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                        <td>{homecook.tblproduk.Nama_Produk}</td>
                                        <td>Rp.{homecook.tblproduk.Harga}</td>
                                        <td>{homecook.tblproduk.Stok}</td>
                                        <td>{homecook.tblproduk.StokReady}</td>
                                        <td>
                                            <button className="edit-action">Recipe</button>
                                            <button className="edit-action">Edit</button>
                                            <button className="delete-action">Delete</button>
                                        </td>
                                    </tr> 
                                ))}
                                
                            </tbody>
                        </table>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Products Yet
                        </Alert>
                    )
                )}
            </Container>
        </>
    );
};

export default HomecookView;