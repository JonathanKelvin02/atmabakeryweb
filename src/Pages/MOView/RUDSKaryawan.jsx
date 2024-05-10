import { Container, Button, Table, Form, Row, InputGroup, Badge, Alert, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

//Import CSS
// import './Badge.css'

//Import API
import { GetAllKaryawan, SeachKaryawan, ResetPasswordKaryawan } from '../../api/apiKaryawan';

//Import Page
import TambahKaryawan from './ModalAddKaryawan';
import EditKaryawan from './ModalEditKaryawan';
import ModalDeleteKaryawan from './ModalDeleteKaryawan';

const RUDSKaryawan = () => {
    const [karyawans, setKaryawan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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

    const searchKaryawan = (e) => {
        e.preventDefault();
        setIsLoading(true);
        SeachKaryawan(searchQuery).then((response) => {
            setKaryawan(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const resetPasswordKaryawan = (id) => {
        setIsLoading(true);
        console.log(id);
        ResetPasswordKaryawan(id).then((response) => {
            setIsLoading(false);
            toast.success("Password Berhasil Direset");
            fetchKaryawan();
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const importingCSS = async () => {
        try {
            const module = await import('./badge.css');
            console.log('CSS file imported:', module);
        } catch (error) {
            console.error('Error importing CSS file:', error);
        }
    }

    useEffect(() => {
        fetchKaryawan();
        importingCSS();

    }
    , []);

    const handleRefresh = () => {
        fetchKaryawan();
    };

    return (
        <>
            <Container>
            <div className='d-flex justify-content-between'>
                <div className='m-3 w-50'> 
                    <Form onSubmit={searchKaryawan}>
                        <InputGroup>
                            <Form.Control
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button id="button-addon2" style={{ backgroundColor: '#8e6f8e', borderColor:'#8e6f8e' }} type='submit'>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </InputGroup>
                    </Form>
                </div>
                <div className=' m-3'>
                    <TambahKaryawan onSuccess={handleRefresh} />
                </div>
            </div>
                {isLoading ? (
                    <div className='text-center'>
                        <Spinner animation="border" variant="dark" size="lg" role="status" aria-hidden="true" />
                        <h6 className='mt-2 mb-0'>Loading...</h6>
                    </div>
                ) : (
                    karyawans?.length > 0 ? (
                        <Table className='ms-3' striped hover responsive style={{width:'97.5%'}}>
                            <thead className='text-center'>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Karyawan</th>
                                    <th>Nama Jabatan</th>
                                    <th>Nomor Rekening</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-center align-middle'>
                                {karyawans?.map((karyawan, index) => (
                                    <tr key={karyawan.ID_Pegawai}>
                                        <td>{index + 1}</td>
                                        <td>{karyawan.Nama_Pegawai}</td>
                                        <td>
                                            <Badge 
                                                pill 
                                                className={
                                                    karyawan.ID_Jabatan === 1 ? "px-3 py-2 custom-badge1" : 
                                                    karyawan.ID_Jabatan === 2 ? "px-3 py-2 custom-badge2" : 
                                                    karyawan.ID_Jabatan === 3 ? "px-3 py-2 custom-badge3" : 
                                                    karyawan.ID_Jabatan === 4 ? "px-3 py-2 custom-badge4" : "px-3 py-2 custom-badge5"
                                                    } 
                                                key={karyawan.ID_Jabatan}
                                            >
                                                {karyawan.jabatan ? karyawan.jabatan.Nama_Jabatan : 'Unknown'}
                                            </Badge>
                                        </td>
                                        <td>{karyawan.Nomor_Rekening}</td>
                                        <td className='underline'>{karyawan.email}</td>
                                        <td className=''>
                                            <div className='d-grid gap-2'>
                                                <EditKaryawan dataKaryawan={karyawan} onSuccess={handleRefresh} />
                                                <ModalDeleteKaryawan dataKaryawan={karyawan} onSuccess={handleRefresh} />
                                                <Button variant='warning' className='me-2' size='sm' onClick={() => resetPasswordKaryawan(karyawan.ID_Pegawai)}>Reset Password</Button>
                                            </div>
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
