import { Modal, Form, Button, InputGroup, Dropdown, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

//Import API
import { GetAllJabatan} from "../../api/apiJabatan";
import { PostKaryawan } from "../../api/apiKaryawan";

//Import Component

const TambahKaryawan = ({ onSuccess }) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const [jabatan, setJabatan] = useState([]);
    const [data, setData] = useState({
        ID_Jabatan: "",
        Nama_Pegawai: "",
        Nomor_Rekening:"",
        email: "",
        password: "",
        Nomor_Telepon:"",
    });

    const handleClose = () => {
        setShow(false);
        onSuccess();
        setValidated(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const fetchJabatan = () => {
        GetAllJabatan().then((response) => {
            setJabatan(response);
        }).catch((err) => {
            console.log(err);
        })
    }

    const submitData = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            setIsLoading(true);
            PostKaryawan(data).then((response) => {
                setIsLoading(false);
                toast.success("Karyawan Berhasil Ditambahkan");
                handleClose();  
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
        }
        setValidated(true);
    }

    useEffect(() => {
        fetchJabatan();
    }, [])

    return (
        <>
            <Button onClick={handleShow} className='ms-3' style={{ backgroundColor: '#8e6f8e', borderColor:'#8e6f8e' }}>
                Tambah Karyawan
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Karyawan Baru (MO)</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={submitData}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicNama">
                            <Form.Label>Nama Karyawan</Form.Label>
                            <Form.Control type="text" placeholder="Masukkan Nama Karyawan" name="Nama_Pegawai" onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">Harap masukkan <b>Nama Karyawan</b></Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicJabatan">
                            <Form.Label>Jabatan</Form.Label>
                            <Form.Control as="select" type="select" name="ID_Jabatan" onChange={handleChange} required>
                                <option selected hidden value=''>Pilih Jabatan</option>
                                {jabatan.map((jabatan, index) => (
                                    <option key={index} value={jabatan.ID_Jabatan}>{jabatan.Nama_Jabatan}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Harap masukkan <b>Jabatan</b></Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRekening">
                            <Form.Label>Nomor Rekening</Form.Label>
                            <Form.Control type="text" placeholder="Masukkan Nomor Rekening" name="Nomor_Rekening" onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">Harap masukkan Nomor Rekening</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Masukkan Email" name="email" onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">Harap masukkan <b>Email</b></Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Masukkan Password" name="password" onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">Harap masukkan <b>Password</b></Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicNomorTelepon">
                            <Form.Label>Nomor Telepon</Form.Label>
                            <Form.Control type="text" placeholder="Masukkan Nomor Telepon" name="Nomor_Telepon" onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">Harap masukkan <b>Nomor Telepon</b></Form.Control.Feedback>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                {isLoading ? (
                                    <Spinner animation="border" variant="light" size="sm" role="status" aria-hidden="true" />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </Modal.Footer>
                    </Modal.Body>
                </Form>
            </Modal>
        </>
    )
}

export default TambahKaryawan;