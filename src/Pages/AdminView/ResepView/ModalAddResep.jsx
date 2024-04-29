import {useState, useEffect} from 'react';
import {Button, Form, Modal, Spinner} from 'react-bootstrap';
import { toast } from 'react-toastify';

//Import API
import {PostResep} from '../../../api/apiResep';
import {GetAllRecipe} from '../../../api/apiProduk';
import {GetBahanBaku} from '../../../api/apiBahanBaku';


const ModalAddResep = ({onSuccess}) => {
    const[show, setShow] = useState(false);
    const[tampil, setTampil] = useState(false);
    const[isLoading, setIsLoading] = useState(false);
    const[index, setIndex] = useState(0);

    const[produk, setProduk] = useState([]);
    const[bahanBaku, setBahanBaku] = useState([]);

    const[resep, setResep] = useState([]);
    const[data, setData] = useState({
        ID_Bahan_Baku: "",
        ID_Produk: "",
        Kuantitas: ""
    })

    const handleClose = () => {
        setShow(false);
        setTampil(false);
        onSuccess();
        setData({
            ID_Bahan_Baku: "",
            ID_Produk: "",
            Kuantitas: ""
        });
        setResep([]);
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleTampil = () => {
        setTampil(true);
        setShow(false);
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const handleChangeIndex = (event) => {
        setIndex(event.target.value);
    }

    const fetchProduk = () => {
        GetAllRecipe().then((response) => {
            setProduk(response);
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    const fetchBahanBaku = () => {
        GetBahanBaku().then((response) => {
            setBahanBaku(response);
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    const submitData = (event) => {
        event.preventDefault();
        setData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    
        setResep((prevResep) => [...prevResep, data]);
        console.log(typeof resep.length);
        console.log(typeof index);
        console.log(resep);
        if (resep.length === parseInt(index)) {
            setIsLoading(true);
            PostResep(resep)
                .then((response) => {
                    setIsLoading(false);
                    handleClose();
                    toast.success("Resep Berhasil Ditambahkan");
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        }
    };
    

    useEffect(() => {
        fetchProduk();
        fetchBahanBaku();
    },[resep])

    return (
        <>
            <Button onClick={handleShow} className='ms-3' style={{ backgroundColor: '#8e6f8e', borderColor:'#8e6f8e' }}>
                Tambah Resep
            </Button>

            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Resep</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className='mb-3' controlId='formBasicTotalInput'>
                            <Form.Label>Nama Produk</Form.Label>
                            <Form.Select name='ID_Produk' required>
                                <option selected hidden>Pilih Produk</option>
                                {produk.map((item, index) => (
                                    <option key={index} value={item.ID_Produk}>{item.tblproduk.Nama_Produk}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Total Resep</Form.Label>
                            <Form.Control type='number' placeholder='Masukkan Total Resep' name='index' onChange={handleChangeIndex} required/>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        
                        <Button variant='primary' onClick={handleTampil}>
                            Tambah Resep
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal size="lg" show={tampil} onHide={handleClose}>
                <Form onSubmit={submitData}>
                    {[...Array(index)].map((_, i) => (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>Tambah Bahan Baku {i+1}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                    <div key={i+1}>
                                        <Form.Group className="mb-3" controlId={`formBasicNamaProduk${i}`}>
                                            <Form.Label>Nama Produk</Form.Label>
                                            <Form.Select name="ID_Produk" onChange={handleChange} required>
                                                <option selected hidden>
                                                    Pilih Produk
                                                </option>
                                                {produk.map((item, index) => (
                                                    <option key={index} value={item.ID_Produk}>
                                                        {item.tblproduk.Nama_Produk}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId={`formBasicBahanBaku${i}`}>
                                            <Form.Label>Bahan Baku</Form.Label>
                                            <Form.Select name="ID_Bahan_Baku" onChange={handleChange} required>
                                                <option selected hidden>
                                                    Pilih Bahan Baku
                                                </option>
                                                {bahanBaku.map((item, index) => (
                                                    <option key={index} value={item.ID_Bahan_Baku}>
                                                        {item.Nama_Bahan}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId={`formBasicKuantitas${i}`}>
                                            <Form.Label>Kuantitas</Form.Label>
                                            <Form.Control type="number" placeholder="Masukkan Kuantitas" name="Kuantitas" onChange={handleChange} required />
                                        </Form.Group>
                                    </div>
                            </Modal.Body>
                        </>
                    ))}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                        <Button variant="primary" type="submit">
                            {isLoading ? (
                                <Spinner animation="border" variant="light" size="sm" role="status" aria-hidden="true" />
                            ) : (
                                "Tambah Bahan Baku"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalAddResep;