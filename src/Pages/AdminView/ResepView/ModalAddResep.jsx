import {useState, useEffect} from 'react';
import {Button, Form, Modal, Spinner} from 'react-bootstrap';
import { toast } from 'react-toastify';

//Import API
import {PostResep} from '../../../api/apiResep';
import {GetAllRecipe} from '../../../api/apiProduk';
import {GetBahanBaku} from '../../../api/apiBahanBaku';


const ModalAddResep = ({onSuccess}) => {
    const[isLoading, setIsLoading] = useState(false);
    const[show, setShow] = useState(false);
    const[validated, setValidated] = useState(false);

    const[produk, setProduk] = useState([]);
    const[bahanBaku, setBahanBaku] = useState([]);

    const[resep, setResep] = useState([
        {ID_Bahan_Baku:'', ID_Produk:'', Kuantitas:''}
    ])

    const handleClose = () => {
        setShow(false);
        onSuccess();
        setResep([
            {ID_Bahan_Baku:'', ID_Produk:'', Kuantitas:''}
        ]);
        setValidated(false);
    };

    const handleShow = () => setShow(true);

    const handleChange = (e, index) => {
        e.preventDefault();
        let dataResep = [...resep];
        dataResep[index][e.target.name] = e.target.value;
        setResep(dataResep);
    }

    const addBahanBaku = () => {
        let newResep = {ID_Bahan_Baku:'', ID_Produk:'', Kuantitas:''};
        setResep([...resep, newResep]);
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

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log(form.checkValidity());
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
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
        setValidated(true);
    }

    useEffect(() => {
        fetchProduk();
        fetchBahanBaku();
    },[])

    return (
        <>
            <Button onClick={handleShow} className='ms-3' style={{ backgroundColor: '#8e6f8e', borderColor:'#8e6f8e' }}>
                Tambah Resep
            </Button>

            <Modal size='xl' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Resep</Modal.Title>
                </Modal.Header>

                <Button className='m-3' onClick={addBahanBaku}>Add Resep</Button>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        {resep.map((detailResep, index) => {
                            return (
                                <>
                                    <div className='m-3 row' key={index}>
                                        <div className='col'>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Nama Produk</Form.Label>
                                                <Form.Control name="ID_Produk" type='select' as="select" value={detailResep.ID_Produk} onChange={e => handleChange(e, index)} required>
                                                    <option selected hidden value=''>
                                                        Pilih Produk
                                                    </option>
                                                    {produk.map((item, index) => (
                                                        <option key={index} value={item.ID_Produk}>
                                                            {item.tblproduk.Nama_Produk}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                                <Form.Control.Feedback type='invalid'>Pilih Produk</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>

                                        <div className='col'>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Bahan Baku</Form.Label>
                                                <Form.Control name="ID_Bahan_Baku" type='select' as="select" value={detailResep.ID_Bahan_Baku} onChange={e => handleChange(e, index)} required>
                                                    <option selected hidden value="">
                                                        Pilih Bahan Baku
                                                    </option>
                                                    {bahanBaku.map((item, index) => (
                                                        <option key={index} value={item.ID_Bahan_Baku}>
                                                            {item.Nama_Bahan}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                                <Form.Control.Feedback type='invalid'>Pilih Bahan Baku</Form.Control.Feedback>
                                            </Form.Group>
                                        </div>

                                        
                                        <Form.Group className="mb-3">
                                            <Form.Label>Kuantitas</Form.Label>
                                            <Form.Control type="number" placeholder="Masukkan Kuantitas" name="Kuantitas" value={detailResep.Kuantitas} onChange={e => handleChange(e, index)} required />
                                            <Form.Control.Feedback type='invalid'>Masukan Kuantitas</Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </>
                            )
                        })}
                    </Modal.Body>
                    
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