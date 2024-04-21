import { Container, Button, Table, Form, InputGroup, Badge, Alert, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSearch } from '@fortawesome/free-solid-svg-icons';

//Import CSS
import './Badge.css';

//Import API
import { DeleteKaryawan, GetAllKaryawan } from '../../api/apiKaryawan';

//Import Page
import TambahKaryawan from './TambahKaryawan';

const RUDSKaryawan = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [karyawan, setKaryawan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchKaryawan = () => {
        setIsLoading(true);
        GetAllKaryawan().then((response) => {
            setKaryawan(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const deleteKaryawan = (id) => {
        setIsLoading(true);
        DeleteKaryawan(id).then((response) => {
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const importingCSS = async () => {
        try {
            const module = await import('./Badge.css');
            console.log('CSS file imported:', module);
        } catch (error) {
            console.error('Error importing CSS file:', error);
        }
    }

    useEffect(() => {
        fetchKaryawan();
        importingCSS();
    }
    , [])

    return (
        <>
            <Container>
                <InputGroup className='m-3 w-25'>
                    <Form.Control
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                    />
                    <Button id="button-addon2" style={{ backgroundColor: '#8e6f8e', borderColor:'#8e6f8e' }}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </InputGroup>
                <TambahKaryawan />
                {isLoading ? (
                    <div className='text-center'>
                        <Spinner animation="border" variant="dark" size="lg" role="status" aria-hidden="true" />
                        <h6 className='mt-2 mb-0'>Loading...</h6>
                    </div>
                ) : (
                    karyawan?.length > 0 ? (
                        <Table className='mt-3 ms-3' striped hover style={{width:'97.5%'}}>
                            <thead className='text-center'>
                                <tr>
                                    <th>Nama Karyawan</th>
                                    <th>Nama Jabatan</th>
                                    <th>Nomor Rekening</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Gaji</th>
                                    <th>Bonus</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-center align-middle'>
                                {karyawan?.map((karyawan, index) => (
                                    <tr key={karyawan.ID_Pegawai}>
                                        <td>{karyawan.Nama_Pegawai}</td>
                                        <td>
                                            <Badge 
                                                pill 
                                                className={karyawan.ID_Jabatan === 1 ? "px-3 py-2 custom-badge1" : karyawan.ID_Jabatan === 2 ? "px-3 py-2 custom-badge2" : karyawan.ID_Jabatan === 3 ? "px-3 py-2 custom-badge3" : karyawan.ID_Jabatan === 4 ? "px-3 py-2 custom-badge4" : "px-3 py-2 custom-badge5"} 
                                                key={karyawan.ID_Jabatan}
                                            >
                                                {karyawan.jabatan ? karyawan.jabatan.Nama_Jabatan : 'Unknown'}
                                            </Badge>
                                        </td>
                                        <td>{karyawan.Nomor_Rekening}</td>
                                        <td className='underline'>{karyawan.email}</td>
                                        <td>
                                            <InputGroup size='sm'>
                                                <Form.Control disabled
                                                    type={showPassword ? "text" : "password"}
                                                    value={karyawan.password}
                                                    style={{ backgroundColor: 'transparent', border: 'none' }}
                                                />
                                                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} style={{ backgroundColor: 'transparent', border: 'none' }}>
                                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                                </Button>
                                            </InputGroup>
                                        </td>
                                        <td>{karyawan.Gaji}</td>
                                        <td>{karyawan.Bonus}</td>
                                        <td className='d-flex justify-content-center'>
                                            <Button variant='success' size='sm' className='me-2'>Edit</Button>
                                            <Button variant='danger' size='sm'>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <Alert variant='warning' className='text-center'>
                            Data Karyawan Kosong
                        </Alert>
                    )
                )}
            </Container>
        </>
    )
}


export default RUDSKaryawan;
