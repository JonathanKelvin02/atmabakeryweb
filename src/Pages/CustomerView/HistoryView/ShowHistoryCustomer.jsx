import {useState, useEffect} from 'react';
import {Table, Button, Form, InputGroup, Spinner} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

//Import API
import { GetHistory, SearchHistory } from '../../../api/apiCustomer';

const ShowHistoryCustomer = () => {
    const [Loading, setLoading] = useState(false);
    const [Data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const getHistory = () => {
        setLoading(true);
        GetHistory().then((response) => {
            setData(response);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    const searchHistory = (e) => {
        e.preventDefault();
        setLoading(true);
        SearchHistory(searchQuery).then((response) => {
            setData(response);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    useEffect(() => {
        getHistory();
    }, [])

    console.log(Data);

    return (
        <>
            <div className="mx-2">
                <div className="d-flex justify-content-between">
                    <div className='mt-2 mb-2 w-50'>
                        <Form onSubmit={searchHistory}>
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
                </div>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID Transaksi</th>
                            <th>Nama Pegawai</th>
                            <th>Tanggal Pembelian</th>
                            <th>Nama Produk</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Alamat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Loading ? (
                            <tr>
                                <td colSpan={7} className="text-center">
                                    <Spinner animation="border" variant="primary" />
                                </td>
                            </tr>
                        ) : Data?.length > 0 ? (
                            Data?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ID_Transaksi}</td>
                                    <td>{item.tblpegawai.Nama_Pegawai}</td>
                                    <td>{item.Tanggal_Transaksi}</td>
                                    <td>{item.Nama_Produk}</td>
                                    <td>{item.Status}</td>
                                    <td>{item.Total_Transaksi}</td>
                                    <td>{item.tblalamat.Alamat}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center">Data Kosong</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ShowHistoryCustomer;