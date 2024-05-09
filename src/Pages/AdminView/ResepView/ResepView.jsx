import { Table, Container, Spinner, Alert, Form, InputGroup, Button } from 'react-bootstrap';
import { useState, useEffect, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Lazy load the component
// const ModalAddResep = React.lazy(() => import('./ModalAddResep'));
// const ModalDeleteResep = React.lazy(() => import('./ModalDeleteResep'));
// const ModalEditResep = React.lazy(() => import('./ModalEditResep'));

//Import API
import { GetAllResep, SearchResep } from '../../../api/apiResep';

//Import Component
import ModalAddResep from './ModalAddResep';
import ModalDeleteResep from './ModalDeleteResep';
import ModalEditResep from './ModalEditResep';

const ResepView = () => {
    const [reseps, setResep] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchResep = () => {
        setIsLoading(true);
        GetAllResep().then((response) => {
            setResep(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const searchResep = (e) => {
        e.preventDefault();
        setIsLoading(true);
        SearchResep(searchQuery).then((response) => {
            setResep(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchResep();
    }, []);

    return (
        <>
        <Container>
            <div className='d-flex justify-content-between'>
                <div className='mt-2 mb-2 w-50'>
                    <Form onSubmit={searchResep}>
                        <InputGroup>
                            <Form.Control
                                placeholder='Search...'
                                aria-label='Search'
                                aria-describedby='basic-addon2'
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button id="button-addon2" style={{ backgroundColor: '#8e6f8e', borderColor:'#8e6f8e' }} type='submit'>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </InputGroup>
                    </Form>
                </div>
                <div className='m-2'>
                    <ModalAddResep onSuccess={fetchResep} />
                </div>
            </div>
            <div>
                {isLoading ? (
                    <div className='text-center'>
                        <Spinner animation='border' variant='dark' size='lg' role='status' aria-hidden='true'/>
                        <h6 className='mt-2 mb-0'>Loading...</h6>
                    </div>
                ) : (
                    reseps?.length > 0 ? (
                        <Table responsive='xl' hover bordered>
                            <thead>
                                <tr>
                                    <th>Nama Produk</th>
                                    <th>Nama Bahan Baku</th>
                                    <th>Jumlah</th>
                                    <th>Satuan</th>
                                    <th>Lama Memasak</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-center align-middle'>
                            {reseps?.map((resep, index) => {
                                var rowspan = 1;
                                if (index > 0 && resep.tblproduk?.Nama_Produk === reseps[index - 1].tblproduk?.Nama_Produk) {
                                    rowspan = 0;
                                } else {
                                    for (let i = index + 1; i < reseps.length; i++) {
                                        if (resep.tblproduk?.Nama_Produk === reseps[i].tblproduk?.Nama_Produk) {
                                            rowspan++;
                                        } else {
                                            break;
                                        }
                                    }
                                }
                                return (
                                    <tr key={index}>
                                        {rowspan === 0 ? null : <td rowSpan={rowspan}>{resep.tblproduk?.Nama_Produk}</td>}
                                        <td>{resep.tblbahanbaku?.Nama_Bahan}</td>
                                        <td>{resep.Kuantitas}</td>
                                        <td>{resep.tblbahanbaku?.Satuan}</td>
                                        {rowspan === 0 ? null : <td rowSpan={rowspan}>{resep.tblresep?.Waktu_Memproses}</td>}
                                        <td><ModalEditResep dataResep={resep} onSuccess={fetchResep}/></td>
                                        {rowspan === 0 ? null : <td rowSpan={rowspan}><ModalDeleteResep dataResep={resep} onSuccess={fetchResep}/></td>}
                                    </tr>
                                );
                            })}
                            </tbody>
                        </Table>
                    ) : (
                        <Alert variant='warning' className='text-center'>
                            Data Resep Kosong 
                        </Alert>
                    )
                )}
            </div>
        </Container>
        </>
    )
}

export default ResepView;