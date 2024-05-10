import { useState, useEffect } from 'react';
import { Container, Col, Form, Row, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import InputForm from '../../../Component/InputComponent/InputForm';
import { FaPlus, FaTrash } from "react-icons/fa6";
import { toast } from 'react-toastify';

// Import Css
import './Product.css';

//Import API
import { getGambar } from '../../../api/indexApi';
import { UpdateProduct, UpdateHamper, GetAllRecipe } from "../../../api/apiProduk";

const EditHampers = () => {
    const location =useLocation();
    const hamper = location.state.hamper;
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [resep, setResep] = useState([]);
    const [data, setData] = useState({
        ID_Produk: hamper.ID_Produk,
        ID_Kategori: hamper.tblproduk.ID_Kategori,
        Nama_Produk: hamper.tblproduk.Nama_Produk,
        Harga: hamper.tblproduk.Harga,
        Stok: hamper.tblproduk.Stok,
        StokReady: hamper.tblproduk.StokReady,
        Gambar: hamper.tblproduk.Gambar,
        Kartu_Ucapan: hamper.Kartu_Ucapan
    });

    const [inputProduct, setInputProduct] = useState([{ 
        ID_Produk: "",
        Kuantitas: ""
    }])

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const handleFile = (event) => {
        setImage(event.target.files[0]);
    }

    const handleValueChange = (index, event) => {
        const { name, value } = event.target;
        const values = [...inputProduct];
        values[index] = {
            ...values[index],
            [name]: value
        }
        setInputProduct(values);
    }

    const handleAddProduct = () => {
        setInputProduct([...inputProduct, { ID_Produk: "", Kuantitas: "" }])
    }

    const handleRemoveProduct = (index) => {
        const newInputProduct = [...inputProduct];
        newInputProduct.splice(index, 1);
        setInputProduct(newInputProduct);
    }

    const fetchRecipe = () => {
        setIsLoading(true);
        GetAllRecipe().then((response) => {
            setResep(response);
            setIsLoading(false);
        }).catch((e) => {
            console.log(e);
            setIsLoading(false);
        })
    }

    const submitData = (event) => {
        event.preventDefault();
        setIsPending(true);

        UpdateProduct(data)
            .then((response) => {
                console.log(response.data);
                const updatedData = { 
                    ...response.data, 
                    Kartu_Ucapan: data.Kartu_Ucapan,
                    recipes: inputProduct
                };
                UpdateHamper(updatedData);
                toast.success(response.message);
                navigate('/admin/Hampers');
            })
            .catch((err) => {
                console.log(err);
                setIsPending(false);
                toast.dark(JSON.stringify(err.message));
            })
    }

    useEffect(() => {
        fetchRecipe();
    }, [])

    useEffect(() => {
        if (hamper.resep) {
            const mappedRecipes = hamper.resep.map(recipe => ({
                ID_Produk: recipe.ID_Produk,
                Kuantitas: recipe.pivot.Kuantitas
            }));
            setInputProduct(mappedRecipes);
        }
    }, [hamper.resep]);

    return (
        <>
            <h3 style={{margin: '32px', marginBottom: '0px', fontWeight: 'bold'}}>Product Details</h3>
            <p style={{margin: '32px', marginTop: '0px'}}>
                <a href="/admin/Hampers" style={{textDecoration: 'none', color: 'black'}}>Hampers</a> &gt;  
                <a href="/admin/edit-hampers"  style={{textDecoration: 'none', color: 'black'}}> Hampers Details</a>
            </p>
            <Form onSubmit={submitData}>
                {isLoading ? (
                    <Container className='details-container'>
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
                    </Container>
                ) : (
                    resep?.length > 0 ? (
                        <>
                            <Container className='details-container'>
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
                                                        type="text"
                                                        label= "Greeting Card"
                                                        name= "Kartu_Ucapan"
                                                        placeholder="Enter Greeting Card"
                                                        value={data?.Kartu_Ucapan}
                                                        onChange={handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    <Col className="d-flex flex-column align-items-end justify-content-end">
                                        <div className='uploader'>
                                            <img src={getGambar(data?.Gambar)} alt="Gambar Produk" className='w-100 h-100' />
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
                                            <Button variant="secondary" style={{width: '100px'}} onClick={() => navigate('/admin/Hampers')}>Cancel</Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                            <Container className='bottom-container'>
                                <button type='button' className='add-button' onClick={handleAddProduct}>
                                    <FaPlus className="mr-1" /> <b>Add Product</b>
                                </button>
                                {inputProduct?.map((isi, index) => (
                                    <Row key={index}>
                                        <Col xs={5}>
                                            <Form.Group className='mb-3' controlId={`resep${index}`}>
                                                <Form.Select
                                                    className='text-dark bg-white'
                                                    name='ID_Produk'
                                                    value={isi.ID_Produk}
                                                    onChange={(e) => handleValueChange(index, e)}
                                                    required
                                                >
                                                    <option value="">Select Product</option>
                                                    {resep?.map((resep, i) => (
                                                        <option key={i} value={resep.ID_Produk}>{resep.tblproduk.Nama_Produk}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={5}>
                                            <Form.Group className="mb-3" controlId={`kuantitas${index}`}>
                                                <Form.Control
                                                    type='number'
                                                    className="text-dark bg-white"
                                                    placeholder="Enter Quantity"
                                                    name='Kuantitas'
                                                    value={isi.Kuantitas}
                                                    onChange={(e) => handleValueChange(index, e)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={2} className='text-center'>
                                            <button type='button' className='delete-button' onClick={() => {handleRemoveProduct(index)}}>
                                                <FaTrash /> Delete
                                            </button>
                                        </Col>
                                    </Row>
                                ))}
                            </Container>
                        </>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Resep Yet
                        </Alert>
                    )
                )}
            </Form>
        </>
    );
}

export default EditHampers;