import {useState, useEffect} from 'react';
import {Modal, Button, Form, Spinner} from 'react-bootstrap';
import { toast } from "react-toastify";

//Import API
import { PutResep } from "../../../api/apiResep";
import { GetAllRecipe } from "../../../api/apiProduk";
import { GetBahanBaku } from "../../../api/apiBahanBaku";

const ModalEditResep = ({dataResep, onSuccess, getProduk}) => {
    const[show, setShow] = useState(false);
    const[loading, setLoading] = useState(false);
    const[validated, setValidated] = useState(false);
    const [valid, setValid] = useState(true);

    const[data, setData] = useState(dataResep);
    
    const[dataProduk, setDataProduk] = useState([]);
    const[dataBahanBaku, setDataBahanBaku] = useState([]);

    const handleClose = () => {
        setShow(false);
        onSuccess();
    };
    const handleShow = () => {
        setShow(true)
        fetchProduk();
        fetchBahanBaku();
    };

    const handleChangeValid = () => {
        setValid(!valid);
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const fetchProduk = () => {
        setLoading(true);
        GetAllRecipe().then((response) => {
            setLoading(false);
            setDataProduk(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    const fetchBahanBaku = () => {
        GetBahanBaku().then((response) => {
            setDataBahanBaku(response);
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    const SubmitData = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            setLoading(true);
            PutResep(data).then((response) => {
                setLoading(false);
                toast.success("Resep Berhasil Diubah");
                handleClose();
            }).catch((err) => {
                setLoading(false);
                toast.error(err.response.data);
            })
        }
        setValidated(true);
    }

    // useEffect(() => {
        
    // }, []);

    return (
        <>
            <Button variant='success' size='sm' className='me-2' onClick={handleShow}>
                {loading ? (
                    <Spinner animation='border' variant='light' size='sm' />
                ) : (
                    <span>Edit</span>
                )}
            </Button>
            
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Edit Resep</b></Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={SubmitData}>
                    <Modal.Body>
                        <Form.Group className='mb-3'>
                            <Form.Label>Nama Produk</Form.Label>
                            <Form.Select name='ID_Produk' value={data.ID_Produk} disabled required>
                                {loading ? (
                                    <Spinner animation='border' variant='dark' size='sm' />
                                ) : (
                                    <>
                                        <option selected hidden>Pilih Produk</option>
                                        {dataProduk.map((item, index) => (
                                            <option key={index} value={item.ID_Produk}>{item.tblproduk.Nama_Produk}</option>
                                        ))}
                                    </>
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Nama Bahan Baku</Form.Label>
                            <Form.Select name='ID_Bahan_Baku' value={data.ID_Bahan_Baku} disabled required>
                                {loading ? (
                                    <Spinner animation='border' variant='dark' size='sm' />
                                ) : (
                                    <>
                                        <option selected hidden>Pilih Produk</option>
                                        {dataBahanBaku.map((item, index) => (
                                            <option key={index} value={item.ID_Bahan_Baku}>{item.Nama_Bahan}</option>
                                        ))}
                                    </>
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Kuantitas</Form.Label>
                            <Form.Control type='number' name='Kuantitas' value={data.Kuantitas} onChange={handleChange} required/>
                            <Form.Control.Feedback type='invalid'>Masukan Kuantitas</Form.Control.Feedback>
                        </Form.Group>   

                        <Form.Group className="ms-1">
                            <Form.Check 
                                    type="checkbox" 
                                    label="I confirm the data is correct" 
                                    onChange={handleChangeValid}
                                />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='primary' type='submit' disabled={valid}>
                            {loading ? (
                                <Spinner animation='border' variant='light' size='sm' />
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalEditResep;