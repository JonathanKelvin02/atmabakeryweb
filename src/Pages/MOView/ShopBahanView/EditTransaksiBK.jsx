import { Modal, Form, Button, Spinner, Row, Col, Alert, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaTrash } from 'react-icons/fa';

//Import API
import { GetBahanBaku } from "../../../api/apiBahanBaku";
import { UpdateTransBahan } from "../../../api/apiTransBahan";

const EditTransaksiBahan = ({ dataTransaksi, onSuccess }) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [listBahan, setListBahan] = useState([{
        ID_Bahan_Baku: "",
        Kuantitas: "",
        Sub_Total: ""
    }])

    const [bahanBaku, setBahanBaku] = useState([]);
    const [data, setData] = useState({
        ID_transaksi_Baku: dataTransaksi.ID_Transaksi_Baku,
        Tanggal: dataTransaksi.Tanggal
    });

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const handleClose = () => {
        setShow(false);
        onSuccess();
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleConfirmationChange = (event) => {
        setIsConfirmed(event.target.checked);
    }

    const handleValueChange = (index, event) => {
        const { name, value } = event.target;
        const values = [...listBahan];
        values[index] = {
            ...values[index],
            [name]: value
        }
        setListBahan(values);
    }

    const handleAddBahan = () => {
        setListBahan([...listBahan, { ID_Bahan_Baku: "", Kuantitas: "", Sub_Total: "" }])
    }

    const handleRemoveBahan = (index) => {
        const newInputBahan = [...listBahan];
        newInputBahan.splice(index, 1);
        setListBahan(newInputBahan);
    }

    const fetchBahan = () => {
        setIsLoading(true);
        GetBahanBaku().then((response) => {
            setBahanBaku(response);
            setIsLoading(false);
        }).catch((e) => {
            console.log(e);
            setIsLoading(false);
        })
    }

    const submitData = (event) => {
        event.preventDefault();
        setIsPending(true);

        const requestData = {
            ID_Transaksi_Baku: data.ID_transaksi_Baku,
            Tanggal: data.Tanggal,
            bahanbaku: listBahan
        };

        UpdateTransBahan(requestData)
            .then((response) => {
                setIsPending(false);
                toast.success(response.message);
                handleClose();
            })
            .catch((err) => {
                console.log(err);
                setIsPending(false);
                toast.dark(JSON.stringify(err.message));
            })
    }

    useEffect(() => {
        fetchBahan();
    }, []);

    useEffect(() => {
        if (dataTransaksi.bahanbaku) {
            const mappedBahan = dataTransaksi.bahanbaku.map(bahan => ({
                ID_Bahan_Baku: bahan.ID_Bahan_Baku,
                Kuantitas: bahan.pivot.Kuantitas,
                Sub_Total: bahan.pivot.Sub_Total
            }));
            setListBahan(mappedBahan);
        }
    }, [dataTransaksi.bahanbaku])

    return (
        <>
            <button className="edit-action" onClick={handleShow}>Edit</button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Pasokan Bahan Baku</Modal.Title>
                </Modal.Header>
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
                        bahanBaku?.length > 0 ? (
                            <Modal.Body>
                                <Form.Group className="mb-3" controlId="formTanggal">
                                    <Form.Label>Tanggal</Form.Label>
                                    <Form.Control type="date" placeholder="Masukkan Tanggal Pasok" name="Tanggal" value={data?.Tanggal} onChange={handleChange} required/>
                                </Form.Group>
                                <button type='button' className='add-button' onClick={handleAddBahan}>
                                    <FaPlus className="mr-1" /> <b>Add Material</b>
                                </button>
                                {listBahan.map((isi, index) => (
                                    <Row key={index}>
                                        <Col xs={4}>
                                            <Form.Group className="mb-3" controlId={`bahanbaku${index}`}>
                                                <Form.Select 
                                                    className="text-dark bg-white"
                                                    name="ID_Bahan_Baku"
                                                    value={isi.ID_Bahan_Baku}
                                                    onChange={(e) => handleValueChange(index, e)}
                                                    required
                                                >
                                                    <option value="">Select Material</option>
                                                    {bahanBaku?.map((bahan, i) => (
                                                        <option key={i} value={bahan.ID_Bahan_Baku}>{bahan.Nama_Bahan}</option>
                                                    ))}
                                                    {}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={3}>
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
                                        <Col xs={3}>
                                            <Form.Group className="mb-3" controlId={`sub_total${index}`}>
                                                <Form.Control
                                                    type='number'
                                                    className="text-dark bg-white"
                                                    placeholder="Enter Sub Total"
                                                    name='Sub_Total'
                                                    value={isi.Sub_Total}
                                                    onChange={(e) => handleValueChange(index, e)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={2} className='text-center'>
                                            <button type='button' className='delete-button' onClick={() => {handleRemoveBahan(index)}}>
                                                <FaTrash /> Delete
                                            </button>
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Group className='mb-2'>
                                            <Form.Check 
                                                type='checkbox'
                                                label="I confirm the data is correct"
                                                onChange={handleConfirmationChange}
                                            />
                                        </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" disabled={isPending || !isConfirmed} type="submit">
                                        {isPending ? (
                                                    <>
                                                        <Spinner 
                                                            as="span"
                                                            animation='grow'
                                                            size='sm'
                                                            role='status'
                                                            aria-hidden="true"
                                                        />
                                                    </>
                                                ) : (
                                                    <span>Submit</span>
                                                )}
                                    </Button>
                                </Modal.Footer>
                            </Modal.Body>
                        ) : (
                            <Alert variant="dark" className="mt-3 text-center">
                                No Material Yet
                            </Alert>
                        )
                    )}
                    
                </Form>
            </Modal>
        </>
    );
}

export default EditTransaksiBahan;