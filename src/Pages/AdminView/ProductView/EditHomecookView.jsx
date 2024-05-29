import { useState } from 'react';
import { Container, Col, Form, Row, Button, Spinner, Modal } from 'react-bootstrap';
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
import { UpdateProduct, UpdateHomecook } from "../../../api/apiProduk";

const EditResep = () => {
    const cld = new Cloudinary({cloud: {cloudName: 'dui6wroks'}});
    const location =useLocation();
    const resep = location.state.resep;
    const navigate = useNavigate();
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [isPending, setIsPending] = useState(false);
    const [data, setData] = useState({
        ID_Produk: resep.ID_Produk,
        ID_Kategori: resep.tblproduk.ID_Kategori,
        Nama_Produk: resep.tblproduk.Nama_Produk,
        Harga: resep.tblproduk.Harga,
        Stok: resep.tblproduk.Stok,
        StokReady: resep.tblproduk.StokReady,
        Gambar: resep.tblproduk.Gambar,
        Waktu_Memproses: resep.Waktu_Memproses
    });

    const img = cld.image(data.Gambar).format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));
    

    const handleConfirmationChange = (event) => {
        setIsConfirmed(event.target.checked);
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const submitData = (event) => {
        event.preventDefault();
        setIsPending(true);

        UpdateProduct(data)
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
                <a href="/admin/edit-resep"  style={{textDecoration: 'none', color: 'black'}}> Homecook Details</a>
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
                                    value={data?.Nama_Produk}
                                    onChange={handleChange}
                                />

                                <Form.Group className="mb-3" controlId="kategori">
                                    <Form.Label className="fw-bold text-dark">Category</Form.Label>
                                    <Form.Select
                                        className="text-dark bg-transparent border-secondary" 
                                        name="ID_Kategori" 
                                        onChange={handleChange}
                                        value={data?.ID_Kategori}
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
                                        <InputForm
                                            type="number"
                                            label= "Stock Quantity"
                                            name= "Stok"
                                            placeholder="Enter Stock Quantity"
                                            value={data?.Stok}
                                            onChange={handleChange}
                                        />
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
                                            label= "Sale Price"
                                            name= "Harga"
                                            placeholder="Enter Sale Price"
                                            value={data?.Harga}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col>
                                        <InputForm
                                            type="number"
                                            label= "Cook Time (m)"
                                            name= "Waktu_Memproses"
                                            placeholder="Enter Cook Time"
                                            value={data?.Waktu_Memproses}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
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
                                <Button variant="secondary" style={{width: '100px'}} onClick={() => navigate('/admin/Homecook')}>Cancel</Button>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
}

export default EditResep;