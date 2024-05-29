import { useState, useEffect } from 'react';
import { Container, Col, Form, Row, Button, Spinner, Alert, Modal } from 'react-bootstrap';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { useNavigate, useLocation } from 'react-router-dom';
import InputForm from '../../../Component/InputComponent/InputForm';
import { FaUpload } from "react-icons/fa6";
import { toast } from 'react-toastify';

// Import Css
import './Product.css';

//Import API
import { getGambar } from '../../../api/indexApi';
import { UpdateProduct, UpdateTitipan, GetAllPenitip } from "../../../api/apiProduk";

const EditTitipan = () => {
    const cld = new Cloudinary({cloud: {cloudName: 'dui6wroks'}});
    const location =useLocation();
    const titipan = location.state.titipan;
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [penitip, setPenitip] = useState([]);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [data, setData] = useState({
        ID_Produk: titipan.ID_Produk,
        ID_Kategori: titipan.tblproduk.ID_Kategori,
        Nama_Produk: titipan.tblproduk.Nama_Produk,
        Harga: titipan.tblproduk.Harga,
        Stok: titipan.tblproduk.Stok,
        StokReady: titipan.tblproduk.StokReady,
        Gambar: titipan.tblproduk.Gambar,
        ID_Penitip: titipan.ID_Penitip,
        Harga_Beli: titipan.Harga_Beli,
        Tanggal_Stok: titipan.Tanggal_Stok
    });

    const img = cld.image(data.Gambar).format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const handleConfirmationChange = (event) => {
        setIsConfirmed(event.target.checked);
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

        if(data.StokReady == 0) {
            toast.dark("Stok Ready must not be 0");
            setIsPending(false); 
            return; 
        }

        UpdateProduct(data)
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
                                            value={data?.Nama_Produk}
                                            onChange={handleChange}
                                        />

                                        <Form.Group className="mb-3" controlId="kategori">
                                            <Form.Label className="fw-bold text-dark">Category</Form.Label>
                                            <Form.Select
                                                className="text-dark bg-transparent border-secondary" 
                                                name="ID_Kategori" 
                                                value={data?.ID_Kategori}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                <option value="1">Cake</option>
                                                <option value="2">Roti</option>
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
                                                        value={data?.ID_Penitip}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select Penitip</option>
                                                        {penitip?.map((penitip, index) => (
                                                            <option key={index} value={penitip.ID_Penitip}>{penitip.Nama_Penitip}</option>
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
                                                    value={data?.StokReady}
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
                                                    value={data?.Harga_Beli}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                            <Col>
                                                <InputForm
                                                    type="number"
                                                    label= "Sale Price"
                                                    name= "Harga"
                                                    placeholder="Enter Sale Price"
                                                    value={data?.Harga}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                        <InputForm
                                            type="date"
                                            label= "Supply Date"
                                            name= "Tanggal_Stok"
                                            placeholder="Enter Supply Date"
                                            value={data?.Tanggal_Stok}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                <Col className="d-flex flex-column align-items-end justify-content-end">
                                    <div className='uploader'>
                                        <AdvancedImage cldImg={img} className='w-100 h-100' />
                                        {/* <img src={getGambar(data?.Gambar)} alt="Gambar Produk" className='w-100 h-100' /> */}
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
                                        <Button variant="secondary" style={{width: '100px'}} onClick={() => navigate('/admin/Titipan')}>Cancel</Button>
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

export default EditTitipan;