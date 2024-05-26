import { useEffect, useState, useContext } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert, Badge } from "react-bootstrap";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/ShoppingCartContext";
import InputForm from "../../../Component/InputComponent/InputForm";

import { GetAllProducts, GetProductByDate, GetAllKategori } from "../../../api/apiProduk";

const ShoppingView = () => {
    const cld = new Cloudinary({cloud: {cloudName: 'dui6wroks'}});
    const navigate = useNavigate();
    const { selectedDate, setSelectedDate } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [kategori, setKategori] = useState([]);
    const [selectedKategori, setSelectedKategori] = useState([]);

    const today = new Date();
    const lusa = new Date(today.getTime() + 48 * 60 * 60 * 1000).toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });

    const fetchProducts = (date) => {
        setIsLoading(true);
        GetProductByDate(date).then((response) => {
            setProducts(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const fetchKategori = () => {
        setIsLoading(true);
        GetAllKategori().then((response) => {
            setKategori(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const handleChangeDate = (event) => {
        setSelectedDate(new Date(event.target.value));
    };

    const goToDetails = (product) => {
        if ((product.kategori.Nama_Kategori !== 'Titipan' && product.Stok > 0) ||
            (product.kategori.Nama_Kategori === 'Titipan' && product.StokReady > 0)) {
            navigate('/customer/Produk-details', { state: { product } });
        }
    }

    useEffect(() => {
        fetchProducts(selectedDate);
    }, [selectedDate]);

    useEffect(() => {
        fetchProducts(selectedDate);
    }, []);

    console.log(products);

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
                            <Row className=" m-3 d-flex justify-content-end">
                                <div className="w-25">
                                    <InputForm 
                                        type="date"
                                        value={new Date(selectedDate).toISOString().split('T')[0]}
                                        label="Pre-Order on "
                                        onChange={handleChangeDate}
                                        min={lusa}
                                    />
                                </div>
                                {/* <input
                                    type="date"
                                    value={new Date(selectedDate).toISOString().split('T')[0]}
                                    onChange={handleChangeDate}
                                    min={lusa}
                                /> */}
                            </Row>
                            <Row className="m-3 product-row">
                                {products.map((product, index) => {
                                const isOutOfStock = product.kategori.Nama_Kategori !== 'Titipan' ? product.Stok === 0 : product.StokReady === 0;
                                return (
                                    <Col key={index} xs={12} sm={6} md={4} lg={3} className={`mb-4 product-col ${isOutOfStock ? 'out-of-stock' : ''}`} onClick={() => goToDetails(product)}>
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
                                                    <p className="product-price"><strong>Rp{product.Harga}</strong></p>
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

export default ShoppingView;