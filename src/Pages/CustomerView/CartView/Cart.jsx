import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/ShoppingCartContext";
import { Button, Row, Col, Alert, Spinner, Modal, Form } from 'react-bootstrap';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { FaTrash } from 'react-icons/fa';
import { toast } from "react-toastify";

import { getGambar } from '../../../api/indexApi';
import { CreateTransCust, CreateReady } from '../../../api/apiTransCust';
import { formatRupiah } from '../../../Component/Currency/FormatCurency';

import "./Cart.css";
import { useNavigate } from 'react-router-dom';

import { GetProfile, GetAlamatUser } from '../../../api/apiCustomer';

function Cart () {
    const cld = new Cloudinary({cloud: {cloudName: 'dui6wroks'}});
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [addresses, setAddressess] = useState([]);
    const [alamat, setAlamat] = useState(0);
    const [jenis, setJenis] = useState(0);
    const {cartItems, poin, addToCart, removeFromCart, increasePoin, decreasePoin, getCartTotal, removeItem, selectedDate } = useContext(CartContext);
    console.log("Cart Items : ", cartItems);
    const countDiscount = () => {
        setDiscount(poin * 100);
    }

    const fetchAlamat = () => {
        setIsLoading(true);
        GetAlamatUser().then((res) => {
            setAddressess(res);
            setIsLoading(false);
        }).catch((e) => {
            setIsLoading(false);
        })
    }

    //Cek StokReady cukup ndak
    const checkStockReady = () => {
        return cartItems.every(item => item.Kuantitas <= item.StokReady);
    };

    const handleCheckout = (event) => {
            if (checkStockReady()) {
                setShowModal(true);
            } else {
                submitData(event);
            }
    }

    const handleAlamatChange = (event) => {
        setAlamat(event.target.value);
    }

    const handleJenisChange = (event) => {
        setJenis(event.target.value);
    }


    const submitData = (event) => {
        event.preventDefault();
        setIsPending(true);
        
        const discountPoin = discount > 0 ? poin : 0;
        console.log("Discout : " , discountPoin);
        const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
        console.log("Alamat", alamat);
        console.log("Jenis", jenis);
        const requestData = {
            Poin: discountPoin,
            ID_Alamat: alamat,
            ID_JenisPengiriman: jenis,
            Tanggal_Ambil: formattedDate,
            Total_Transaksi: getCartTotal() - discount,
            products: cartItems.map(item => ({
                ID_Produk: item.ID_Produk,
                Tipe: parseFloat(item.size),
                Kuantitas: parseInt(item.Kuantitas),
                Sub_Total: item.size === "0.5" 
                    ? parseInt(((item.Harga + 50000) / 2) * item.Kuantitas) 
                    : parseInt(item.Kuantitas * item.Harga)
            }))
        };

        CreateTransCust(requestData)
            .then((response) => {
                navigate('/customer/Produk');
                toast.success(response.message);
                console.log(response);
                setIsPending(false);
                setShowModal(false);
                localStorage.removeItem('cartItems');
                localStorage.removeItem('selectedDate');
                localStorage.setItem('poin', response.poin);
            }).catch((e) => {
                console.log(e);
                setIsPending(false);
                toast.dark(JSON.stringify(e.message));
            })
    }
    
    const submitDataReady = (event) => {
        event.preventDefault();
        setIsPending(true);

        const discountPoin = discount > 0 ? poin : 0;

        const requestData = {
            Poin: discountPoin,
            ID_Alamat: alamat,
            ID_JenisPengiriman: jenis,
            Total_Transaksi: getCartTotal() - discount,
            products: cartItems.map(item => ({
                ID_Produk: item.ID_Produk,
                Tipe: parseFloat(item.size),
                Kuantitas: parseInt(item.Kuantitas),
                Sub_Total: item.size === "0.5" 
                    ? parseInt(((item.Harga + 50000) / 2) * item.Kuantitas) 
                    : parseInt(item.Kuantitas * item.Harga)
            }))
        };

        CreateReady(requestData)
            .then((response) => {
                setIsPending(false);
                navigate('/customer/Produk');
                toast.success(response.message);
                setShowModal(false);
                localStorage.removeItem('cartItems');
                localStorage.removeItem('selectedDate');
            }).catch((e) => {
                console.log(e);
                setIsPending(false);
                toast.dark(JSON.stringify(e.message));
            })
    }

    useEffect(() => {
        fetchAlamat();
    }, []);

    console.log(addresses);

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
                                            <p style={{fontSize: 'smaller'}}>Type: {item.size}</p>
                                        </div>
                                    </div>
                                </td>
                                <td><b>Rp{item.Harga}</b></td>
                                <td>
                                    <div className="qty-container">
                                        <Button variant="light" className="qty-button" onClick={() => removeFromCart(item, item.size)}>-</Button>
                                        <div className="d-flex justify-content-center align-text-center">
                                            {item.Kuantitas}
                                        </div>
                                        <Button variant="light" className="qty-button" onClick={() => {addToCart(item, item.size)}}>+</Button>
                                    </div>
                                </td>
                                <td>
                                    <b>
                                        {item.size === "0.5"
                                            ? formatRupiah(((item.Harga + 50000) / 2 * item.Kuantitas))
                                            : formatRupiah((item.Harga * item.Kuantitas))
                                        }
                                    </b>
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
                        <Row className='p-4'>
                            <Col>
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
                                    addresses?.length > 0 ? (
                                        <Form.Group className="mb-3" controlId="kategori">
                                            <Form.Label className="fw-bold text-dark">Choose Address</Form.Label>
                                            <Form.Select
                                                className="text-dark bg-transparent border-secondary" 
                                                name="ID_Alamat" 
                                                onChange={handleAlamatChange}
                                                required
                                            >
                                                <option value="">Select Address</option>
                                                {addresses?.map((alamat, index) => (
                                                    <option key={index} value={alamat.ID_Alamat}>{alamat.Alamat}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    ) : (
                                        <Alert variant="dark" className="mt-3 text-center">
                                            No Address Yet
                                        </Alert>
                                    )
                                )}
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="kategori">
                                            <Form.Label className="fw-bold text-dark">Shipping Method</Form.Label>
                                            <Form.Select
                                                className="text-dark bg-transparent border-secondary" 
                                                name="ID_JenisPengiriman" 
                                                onChange={handleJenisChange}
                                                required
                                            >
                                                <option value="">Select Method</option>
                                                <option value="1">Pick Up</option>
                                                <option value="2">Gosend</option>
                                                <option value="3">Kurir Atma Kitchen</option>
                                            </Form.Select>
                                        </Form.Group>
                            </Col>
                        </Row>
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
                                        <div className='d-flex flex-column justify-content-center align-items-center p-5' style={{width: '70%', height: '100%', backgroundColor: '#E3E3E3'}}>
                                            <div className='d-flex justify-content-between w-100'>
                                                <h6>Order for:</h6>
                                                <h6>{new Date(selectedDate).toDateString()}</h6>
                                            </div>
                                            <div className='d-flex justify-content-between w-100'>
                                                <h6 className="text-lg font-bold">Sub Total:</h6>
                                                <h6 className="text-lg font-bold">{formatRupiah(getCartTotal())}</h6>
                                            </div>
                                            <div className='d-flex justify-content-between w-100'>
                                                <h6 className="text-lg font-bold">Discount:</h6>
                                                <h6 className="text-lg font-bold">{formatRupiah(discount)}</h6>
                                            </div>
                                            <div className='d-flex justify-content-between w-100'>
                                                <h6><b>Total:</b></h6>
                                                <h6><b>{formatRupiah(getCartTotal() - discount)}</b></h6>
                                            </div>
                                            <hr style={{width: '100%'}} />
                                            <Button variant='light' className='mx-4' style={{backgroundColor: '#C67C4E', color: "white"}} onClick={handleCheckout} disabled={isPending}>Proceed To Checkout</Button>
                                        </div>
                                        
                                    ) : (
                                        <h6 className="text-lg font-bold">Your cart is empty</h6>
                                    )
                                }
                            </Col>
                        </Row>
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Stock Availability</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>There is enough stock available for a direct transaction. Would you like to proceed with a direct transaction or a pre-order?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant='secondary' onClick={(event) => { submitData(event); }}>
                                    Pre-Order
                                </Button>
                                <Button variant='primary' onClick={(event) => { submitDataReady(event); }}>
                                    Direct Transaction
                                </Button>
                            </Modal.Footer>
                        </Modal>            
            </div>
    )
}

Cart.propTypes = {
    showModal: PropTypes.bool,
    toggle: PropTypes.func
}

export default Cart;