import { useState } from 'react';
import { Container, Col, Form, Row, Button, Spinner, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import InputForm from '../../../Component/InputComponent/InputForm';
import { FaUpload } from "react-icons/fa6";
import { toast } from 'react-toastify';

// Import Css
import './Product.css';

//Import API
import { CreateHomecook, UpdateHomecook } from "../../../api/apiProduk";

const CreateResep = ( ) => {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const [image, setImage] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [data, setData] = useState({
        Nama_Produk: "",
        ID_Kategori: "",
        Stok: "",
        StokReady: "",
        Harga: "",
        Gambar: "",
        Waktu_Memproses: ""
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

    const handleConfirmationChange = (event) => {
        setIsConfirmed(event.target.checked);
    }

    const submitData = (event) => {
        event.preventDefault();
        setIsPending(true);

        if (!image) { 
            toast.dark("Image is required");
            setIsPending(false); 
            return; 
        }
        

        const formData = new FormData();
        formData.append("Nama_Produk", data.Nama_Produk);
        formData.append("ID_Kategori", data.ID_Kategori);
        formData.append("Harga", data.Harga);
        formData.append("Stok", data.Stok);
        formData.append("StokReady", data.StokReady);
        formData.append("Gambar", image);
        

        CreateHomecook(formData)
            .then((response) => {
                console.log(response.data);
                const updatedData = { ...response.data, Waktu_Memproses: data.Waktu_Memproses };
                UpdateHomecook(updatedData);
                toast.success(response.message);
                navigate('/admin/Homecook');
            })
            .catch((err) => {
                console.log(err);
                setIsPending(false);
                toast.dark(JSON.stringify(err.message));
            })
    }

    return (
        <>
            <h3 style={{margin: '32px', marginBottom: '0px', fontWeight: 'bold'}}>Product Details</h3>
            <p style={{margin: '32px', marginTop: '0px'}}>
                <a href="/admin/Homecook" style={{textDecoration: 'none', color: 'black'}}>Homecook</a> &gt;  
                <a href="/admin/create-resep"  style={{textDecoration: 'none', color: 'black'}}> Homecook Details</a>
            </p>
            <Container className='details-container'>
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
                                        required
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
                                        <InputForm
                                            type="number"
                                            label= "Stock Quantity"
                                            name= "Stok"
                                            placeholder="Enter Stock Quantity"
                                            onChange={handleChange}
                                        />
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
                                            label= "Sale Price"
                                            name= "Harga"
                                            placeholder="Enter Sale Price"
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col>
                                        <InputForm
                                            type="number"
                                            label= "Cook Time (m)"
                                            name= "Waktu_Memproses"
                                            placeholder="Enter Cook Time"
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
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

                            <Form.Group className='mb-2'>
                                <Form.Check 
                                    type='checkbox'
                                    label="I confirm the data is correct"
                                    onChange={handleConfirmationChange}
                                />
                            </Form.Group>

                            <Row className="" style={{marginTop: '20px', marginRight: '8px'}}>
                                <Button type='submit' disabled={isPending || !isConfirmed} variant='light' style={{width: '100px', marginRight: '10px', border: '2px solid #8E6F60', color: '#8E6F60', fontWeight: 'bold'}}>
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
            </Container>
        </>
    );
}

export default CreateResep;