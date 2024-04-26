import { useState, useEffect } from 'react';
import { Container, Col, Form, Row, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import InputForm from '../../../Component/InputComponent/InputForm';
import { FaUpload } from "react-icons/fa6";
import { toast } from 'react-toastify';

// Import Css
import './Product.css';

//Import API
import { CreateProdukTitipan, UpdateTitipan, GetAllPenitip } from "../../../api/apiProduk";

const CreateTitipan = ( ) => {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [penitip, setPenitip] = useState([]);
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        Nama_Produk: "",
        ID_Kategori: "",
        StokReady: "",
        Harga: "",
        Gambar: "",
        ID_Penitip: "",
        Harga_Beli: "",
        Tanggal_Stok: ""
    });

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }
    
    const handleFile = (event) => {
        setImage(event.target.files[0]);
    }

    const fetchPenitip = () => {
        setIsLoading(true);
        GetAllPenitip().then((response) => {
            setPenitip(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const submitData = (event) => {
        event.preventDefault();
        setIsPending(true);
        

        const formData = new FormData();
        formData.append("Nama_Produk", data.Nama_Produk);
        formData.append("ID_Kategori", data.ID_Kategori);
        formData.append("Harga", data.Harga);
        formData.append("StokReady", data.StokReady);
        formData.append("Gambar", image);
        

        CreateProdukTitipan(formData)
            .then((response) => {
                console.log(response.data);
                const updatedData = { 
                    ...response.data, 
                    ID_Penitip: data.ID_Penitip,
                    Harga_Beli: data.Harga_Beli,
                    Tanggal_Stok: data.Tanggal_Stok
                };
                UpdateTitipan(updatedData);
                toast.success(response.message);
                navigate('/admin/Titipan');
            })
            .catch((err) => {
                console.log(err);
                setIsPending(false);
                toast.dark(JSON.stringify(err.message));
            })
    }

    useEffect(() => {
        fetchPenitip();
    }, [])

    return (
        <>
            <h3 style={{margin: '32px', marginBottom: '0px', fontWeight: 'bold'}}>Product Details</h3>
            <p style={{margin: '32px', marginTop: '0px'}}>
                <a href="/admin/Titipan" style={{textDecoration: 'none', color: 'black'}}>Titipan</a> &gt;  
                <a href="/admin/create-titipan"  style={{textDecoration: 'none', color: 'black'}}> Titipan Details</a>
            </p>
            <Container className='details-container'>
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
                    penitip?.length > 0 ? (
                        <Form onSubmit={submitData}>
                            <Row>
                                <Col>
                                        <InputForm
                                            type="text"
                                            label= "Product Name"
                                            name= "Nama_Produk"
                                            placeholder="Enter Product Name"
                                            onChange={handleChange}
                                        />

                                        <Form.Group className="mb-3" controlId="kategori">
                                            <Form.Label className="fw-bold text-dark">Category</Form.Label>
                                            <Form.Select
                                                className="text-dark bg-transparent border-secondary" 
                                                name="ID_Kategori" 
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Category</option>
                                                <option value="1">Roti</option>
                                                <option value="2">Cake</option>
                                                <option value="3">Minuman</option>
                                                <option value="4">Titipan</option>
                                                <option value="5">Hampers</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="penitip">
                                                    <Form.Label className="fw-bold text-dark">Penitip</Form.Label>
                                                    <Form.Select
                                                        className="text-dark bg-transparent border-secondary" 
                                                        name="ID_Penitip" 
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select Penitip</option>
                                                        {penitip?.map((penitip, index) => (
                                                            <option value={penitip.ID_Penitip}>{penitip.Nama_Penitip}</option>
                                                        ))}
                                                        
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <InputForm
                                                    type="number"
                                                    label= "Ready Stock Quantity"
                                                    name= "StokReady"
                                                    placeholder="Enter Ready Stock Quantity"
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <InputForm
                                                    type="number"
                                                    label= "Regular Price"
                                                    name= "Harga_Beli"
                                                    placeholder="Enter Reguler Price"
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col>
                                                <InputForm
                                                    type="number"
                                                    label= "Sale Price"
                                                    name= "Harga"
                                                    placeholder="Enter Sale Price"
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                        <InputForm
                                            type="date"
                                            label= "Supply Date"
                                            name= "Tanggal_Stok"
                                            placeholder="Enter Supply Date"
                                            onChange={handleChange}
                                        />
                                    </Col>
                                <Col className="d-flex flex-column align-items-end justify-content-end">
                                    <div className='uploader'>
                                        {image && (
                                            <img src={URL.createObjectURL(image)} 
                                            alt="Gambar Produk"
                                            style={{width: '100%', maxHeight: '200px', marginBottom: '16px'}} />
                                        )}
                                        <Button
                                            variant='light' 
                                            type='button'
                                            disabled={isPending}
                                            className='upload'
                                            onClick={() => document.getElementById('gambar').click()}
                                        >
                                            <FaUpload /> Add Picture
                                        </Button>
                                        <input 
                                            type="file" 
                                            name='Gambar'
                                            id='gambar'
                                            onChange={handleFile}
                                            className='upload-file'
                                            accept='image/'
                                        />
                                    </div>
                                    <Row className="" style={{marginTop: '20px', marginRight: '8px'}}>
                                        <Button type='submit' disabled={isPending} variant='light' style={{width: '100px', marginRight: '10px', border: '2px solid #8E6F60', color: '#8E6F60', fontWeight: 'bold'}}>
                                            {isPending ? (
                                                <>
                                                    <Spinner 
                                                        as="span"
                                                        animation='grow'
                                                        size='sm'
                                                        role='status'
                                                        aria-hidden="true"
                                                    />
                                                    Loading
                                                </>
                                            ) : (
                                                <span>Save</span>
                                            )}
                                        </Button>
                                        <Button variant="secondary" style={{width: '100px'}} onClick={() => navigate('/admin/Homecook')}>Cancel</Button>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Penitip Yet
                        </Alert>
                    )
                )}
                
            </Container>
        </>
    );
}

export default CreateTitipan;