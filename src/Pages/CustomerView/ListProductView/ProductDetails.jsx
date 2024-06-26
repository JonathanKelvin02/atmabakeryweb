import { useContext, useEffect, useState } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert, Modal, Form } from "react-bootstrap";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../../context/ShoppingCartContext";
import { formatRupiah } from "../../../Component/Currency/FormatCurency";

import './ShowAllProduct.css';

import { GetOneProduct } from "../../../api/apiProduk"; 

const ProductDetails = () => {
    const cld = new Cloudinary({cloud: {cloudName: 'dui6wroks'}});
    const location = useLocation();
    const product = location.state.product;
    const { addToCart, removeFromCart, getItemQty } = useContext(CartContext);
    const [selectedSize, setSelectedSize] = useState("1");
    const [showModal, setShowModal] = useState(false);

    //Set Image
    const img = cld.image(product.Gambar).format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));

    //Size Disable
    const isDisabled = product.kategori.Nama_Kategori === "Cake"  ? false : true ;

    //Styling label
    const styleLabelBorder = product.Stok > 0 ? "stock-in" : "stock-out";
    const styleLabelText = product.Stok > 0 ? "In Stock" : "Out of Stock";

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    }

    return (
        <div className="page-container d-flex align-items-center justify-content-center">
            <Row className="details-container">
                {/* <div className="details-container"> */}
                    <Col xs={12} md={6} className="d-flex justify-content-center p-4" style={{height: 'fit-content'}}>
                        <AdvancedImage cldImg={img} className='product-img' />
                        {/* <img src={getGambar(product.Gambar)} alt={product.Nama_Produk} className="product-img"/> */}
                    </Col>
                    <Col xs={12} md={6} className="d-flex flex-column justify-content-start p-4" style={{height: 'fit-content'}}>
                        <div className={`label-stock ${styleLabelBorder}`}>
                            {styleLabelText}
                        </div>
                        <h2><strong>{product.Nama_Produk}</strong></h2>
                        <p style={{fontSize: 'small'}}>Select Size</p>
                        <Form>
                            <div className="size-container mb-3">
                                <input 
                                    type="radio" 
                                    name="radio" 
                                    id="opt1" 
                                    value= "1"
                                    checked={selectedSize === "1"}
                                    onChange={handleSizeChange} 
                                />
                                <label htmlFor="opt1" className="label1">
                                    <span>1</span>
                                </label>
                                <input 
                                    type="radio" 
                                    name="radio" 
                                    id="opt2"
                                    value= "0.5"
                                    checked={selectedSize === "0.5"}
                                    onChange={handleSizeChange}
                                    disabled={isDisabled}
                                />
                                <label htmlFor="opt2" className={`label2 ${isDisabled ? 'disabled' : ''}`}>
                                    <span>1/2</span>
                                </label>
                            </div>
                            <div className="d-flex flex-row justify-content-start align-items-center">
                                <div className="label-stock p-2 m-0" style={{border: '1px solid #313131', color: '#313131'}}>
                                    {selectedSize === "1" ? (
                                        <p className="m-0 p-0">{formatRupiah(product.Harga)}</p>
                                    ) : (
                                        <p className="m-0 p-0">{formatRupiah((product.Harga + 50000)/2)}</p>
                                    )}
                                </div>
                                
                                {getItemQty(product, selectedSize) > 0 ?
                                    <div className="qty-container">
                                            <Button variant="light" className="qty-button" onClick={() => removeFromCart(product, selectedSize)}>-</Button>
                                            <div className="d-flex justify-content-center align-text-center">
                                                {getItemQty(product, selectedSize)}
                                            </div>
                                            <Button variant="light" className="qty-button" onClick={() => {addToCart(product, selectedSize)}}>+</Button>
                                    </div>
                                    : <Button variant="dark" className="border-0 mx-3" style={{backgroundColor: "#C67C4E"}}
                                        onClick={() => {
                                            addToCart(product, selectedSize)
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                }
                                
                            </div>
                            <hr />
                            <p className="m-0" style={{fontSize: '12px'}}>
                                <b>Kuota</b>: {product.Stok}<br />
                                <b>Ready</b>: {product.StokReady}
                            </p>
                        </Form>
                    </Col>
                {/* </div> */}
            </Row>
            {/* {!showModal && <button className='px-4 py-2 bg-dark text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
                onClick={toggle}
            >Cart ({cartItems.length})</button>}
            <Cart showModal={showModal} toggle={toggle} /> */}
        </div>
    );
}

export default ProductDetails;