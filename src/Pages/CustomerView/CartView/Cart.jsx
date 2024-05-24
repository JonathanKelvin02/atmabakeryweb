import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/ShoppingCartContext";
import { Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { FaTrash } from 'react-icons/fa';
import { toast } from "react-toastify";

import { getGambar } from '../../../api/indexApi';
import { CreateTransCust } from '../../../api/apiTransCust';


import "./Cart.css";
import { useNavigate } from 'react-router-dom';

function Cart () {
    const cld = new Cloudinary({cloud: {cloudName: 'dui6wroks'}});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [data, setData] = useState({
        'Total_Transaksi': ""
    });

    const [products, setProducts] = useState([{
        ID_Produk: "",
        Kuantitas: "",
        Sub_Total: ""
    }]);

    const [discount, setDiscount] = useState(0);
    const {cartItems, poin, addToCart, removeFromCart, increasePoin, decreasePoin, getCartTotal, removeItem } = useContext(CartContext);
    console.log("Cart Items : ", cartItems);
    const countDiscount = () => {
        setDiscount(poin * 100);
    }

    const submitData = (event) => {
        event.preventDefault();
        setIsPending(true);

        //const totalHarga = getCartTotal() - discount;
        const requestData = {
            Total_Transaksi: getCartTotal() - discount,
            products: cartItems.map(item => ({
                ID_Produk: item.ID_Produk,
                Kuantitas: parseFloat(item.Kuantitas),
                Sub_Total: parseInt(item.Kuantitas * item.Harga)
            }))
        };

        CreateTransCust(requestData)
            .then((response) => {
                setIsPending(false);
                navigate('/customer/Produk');
                toast.success(response.message);
                localStorage.removeItem('cartItems');
            }).catch((e) => {
                console.log(e);
                setIsPending(false);
                toast.dark(JSON.stringify(e.message));
            })
    }

    return (
            <div className='cart-items'>
                <table>
                    <thead>
                        <tr style={{backgroundColor: "#313131", color: 'white'}}>
                            <th style={{width: '45%'}}>Product Details</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sub Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.ID_Produk} style={{ borderBottom: '1px solid #E3E3E3'}}>
                                <td className='px-5 py-3'>
                                    <div className='d-flex flex-row justify-content-start'>
                                        <AdvancedImage cldImg={cld.image(item.Gambar)} className='cart-image m-2' />
                                        {/* <img src={getGambar(item.Gambar)} alt={item.Nama_Produk} className="cart-image m-2" /> */}
                                        <div className='p-4 text-start'>
                                            <h6><strong>{item.Nama_Produk}</strong></h6>
                                            <p style={{fontSize: 'smaller'}}>Type: </p>
                                        </div>
                                    </div>
                                </td>
                                <td><b>Rp{item.Harga}</b></td>
                                <td>
                                    <div className="qty-container">
                                        <Button variant="light" className="qty-button" onClick={() => removeFromCart(item)}>-</Button>
                                        <div className="d-flex justify-content-center align-text-center">
                                            {item.Kuantitas}
                                        </div>
                                        <Button variant="light" className="qty-button" onClick={() => {addToCart(item)}}>+</Button>
                                    </div>
                                </td>
                                <td>
                                    <b>Rp{item.Kuantitas * item.Harga}</b>
                                </td>
                                <td>
                                    <Button variant='outline-light' onClick={() => removeItem(item)}>
                                        <FaTrash color='#C67C4E' />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                        <Row className='bg-light w-100'>
                            <Col className='text-start'>
                                <div className='m-5'>
                                    <h5><b>Discount Points</b></h5>
                                    <div className='rounded p-3 mb-4' style={{border: '1px solid #E3E3E3'}}>
                                        <p className='text-secondary'>Use your point to get a discount</p>
                                        <div className="d-flex justify-content-start align-items-center" style={{gap: '0.5rem'}}>
                                            <Button variant="light" className="qty-button" style={{backgroundColor: '#E3E3E3'}} onClick={() => decreasePoin()}>-</Button>
                                            <div className="d-flex justify-content-center align-text-center">
                                                {poin}
                                            </div>
                                            <Button variant="light" className="qty-button" style={{backgroundColor: '#E3E3E3'}} onClick={() => increasePoin()}>+</Button>

                                            <Button variant='light' className='mx-4' style={{backgroundColor: '#C67C4E', color: "white"}} onClick={countDiscount}>Apply Point</Button>
                                        </div>
                                    </div>

                                    <Button variant='outline-secondary' onClick={() => navigate('/customer/Produk')}>Continue Shopping</Button>
                                </div>
                            </Col>
                            <Col className='d-flex justify-content-center'>
                                {cartItems.length > 0 ? (
                                        <div className='d-flex flex-column justify-content-center align-items-center p-4' style={{width: '75%', height: '100%', backgroundColor: '#E3E3E3'}}>
                                            <h6 className="text-lg font-bold">Sub Total: Rp{getCartTotal()}</h6>
                                            <h6 className="text-lg font-bold">Discount: Rp{discount}</h6>
                                            
                                            <h6 ><b>Total: Rp{getCartTotal() - discount}</b></h6>
                                            <hr style={{width: '100%'}} />
                                            <Button variant='light' className='mx-4' style={{backgroundColor: '#C67C4E', color: "white"}} onClick={submitData}>Proceed To Checkout</Button>
                                        </div>
                                        
                                    ) : (
                                    <h6 className="text-lg font-bold">Your cart is empty</h6>
                                    )
                                }
                            </Col>
                        </Row>
                
                
            </div>
        
    )
}

Cart.propTypes = {
    showModal: PropTypes.bool,
    toggle: PropTypes.func
}

export default Cart;