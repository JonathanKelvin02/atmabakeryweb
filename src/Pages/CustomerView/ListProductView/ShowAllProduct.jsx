import { useEffect, useState, useContext } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert, Badge } from "react-bootstrap";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../../Component/Currency/FormatCurency";
import { CartContext } from "../../../context/ShoppingCartContext";

import './ShowAllProduct.css';

import { GetAllProducts, GetProductToday } from "../../../api/apiProduk";

const ShowProductCust = () => {
    const cld = new Cloudinary({cloud: {cloudName: 'dui6wroks'}});
    const { selectedDate, setSelectedDate } = useContext(CartContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = () => {
        setIsLoading(true);
        GetProductToday().then((response) => {
            setProducts(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    console.log("select date di show product", selectedDate);

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
                                {products.map((product, index) => {
                                const isOutOfStock = product.kategori.Nama_Kategori !== 'Titipan' ? product.Stok === 0 : product.StokReady === 0;
                                return (
                                    <Col key={index} xs={12} sm={6} md={4} lg={3} className={`mb-4 product-col ${isOutOfStock ? 'out-of-stock' : ''}`}>
                                        <div className="product-card">
                                            <AdvancedImage cldImg={cld.image(product.Gambar)} className='img-fluid product-image' />
                                                {/* <img src={getGambar(product.Gambar)} alt={product.name} className="img-fluid product-image" /> */}
                                                <div className="product-info">
                                                    <div className="product-name">
                                                        <h6 className="mt-2 m-0"><strong>{product.Nama_Produk}</strong></h6>
                                                        <p style={{fontSize: 12}}>{product.kategori.Nama_Kategori}
                                                            {isOutOfStock ? (
                                                                <Badge pill text="white" bg="dark" className="ms-2">
                                                                    Out of Stock
                                                                </Badge>
                                                            ) : (
                                                                <>
                                                                    <Badge pill text="white" bg="secondary" className="ms-2">
                                                                        {product.Stok}
                                                                    </Badge>
                                                                    {product.StokReady > 0 && (
                                                                        <Badge pill text="white" bg="warning" className="mx-2">
                                                                            {product.StokReady}
                                                                        </Badge>
                                                                    )}
                                                                </>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <p className="product-price"><strong>{formatRupiah(product.Harga)}</strong></p>
                                                </div>
                                            </div>
                                    </Col>
                                )})}
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