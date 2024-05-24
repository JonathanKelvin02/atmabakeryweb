import { useEffect, useState } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import './ShowAllProduct.css';

import { getGambar } from '../../../api/indexApi';
import { GetAllProducts } from "../../../api/apiProduk";

const ShowProductCust = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = () => {
        setIsLoading(true);
        GetAllProducts().then((response) => {
            setProducts(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const goToDetails = (product) => {
        navigate('/customer/Produk-details', { state: {product} })
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="page-container">
            <Container>
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
                    products.length > 0 ? (
                        <Container className="product-list">
                            <Row className="m-3 product-row">
                                {products.map((product, index) => (
                                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 product-col" onClick={() => goToDetails(product)}>
                                        <div className="product-card">
                                                <img src={getGambar(product.Gambar)} alt={product.name} className="img-fluid product-image" />
                                                <div className="product-info">
                                                    <div className="product-name">
                                                        <h6 className="mt-2 m-0"><strong>{product.Nama_Produk}</strong></h6>
                                                        <p style={{fontSize: 12}}>{product.kategori.Nama_Kategori}</p>
                                                    </div>
                                                    <p className="product-price"><strong>Rp{product.Harga}</strong></p>
                                                </div>
                                            </div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Products Yet
                        </Alert>
                    )
                ) }
            </Container>
        </div>
    );
}

export default ShowProductCust;