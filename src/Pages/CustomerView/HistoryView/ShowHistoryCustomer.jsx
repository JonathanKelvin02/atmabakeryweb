import { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Row, Col, Card, Spinner, OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

//Import CSS
import '../HistoryView/styleHistory.css';

//Import API
import { GetHistory, SearchHistory, GetTransaksiSelesai, GetDetailTransaksiSelesai } from '../../../api/apiCustomer';

//Import Component
import UpdateStatusTransaksiCustomer from './UpdateStatusTransaksiCustomer';

const ShowHistoryCustomer = () => {
    const [loading, setLoading] = useState(false);
    const [proses, setProses] = useState(false);
    const [muter, setMuter] = useState(false);
    const [data, setData] = useState([]);
    const [transaksi, setTransaksi] = useState([]);
    const [detailTransaksi, setDetailTransaksi] = useState([]);
    const [statusDibawaKurir, setStatusDibawaKurir] = useState([]);
    const [statusSelesai, setStatusSelesai] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const popover = (
        <Popover>
            <Popover.Header as='h3'>Data Produk</Popover.Header>
            {muter ? (
                <Spinner animation="border" variant="dark" className="mx-auto d-block my-2" />
            ) : (
                <Popover.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Nama Produk</th>
                                <th>Kuantitas</th>
                            </tr>
                        </thead>
                        {detailTransaksi?.length > 0 ? (
                            <tbody>
                                {detailTransaksi?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.tblproduk.Nama_Produk}</td>
                                        <td>{item.Kuantitas}</td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tr>
                                <td colSpan={2} className="text-center">Data Kosong</td>
                            </tr>
                        )}
                    </Table>
                </Popover.Body>
            )}
        </Popover>
    );

    const handleClose = () => {
        setDetailTransaksi([]);
    }

    const DibawaKurir = () => {
        setStatusDibawaKurir(transaksi.filter((item) => item.Status == 'Dibawa Kurir'));
    }

    const Selesai = () => {
        setStatusSelesai(transaksi.filter((item) => item.Status == 'Selesai'));
    }

    const getHistory = () => {
        setLoading(true);
        GetHistory().then((response) => {
            setData(response);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    };

    const searchHistory = (e) => {
        e.preventDefault();
        setLoading(true);
        SearchHistory(searchQuery).then((response) => {
            setData(response);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    };

    const showTransaksiSelesai = () => {
        setProses(true);
        GetTransaksiSelesai().then((response) => {
            setTransaksi(response);
            setProses(false);
            setStatusDibawaKurir(transaksi.filter((item) => item.Status == 'Dibawa Kurir'));
            setStatusSelesai(transaksi.filter((item) => item.Status == 'Selesai'));
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    };

    const showDetailTransaksi = (id) => {
        setMuter(true);
        GetDetailTransaksiSelesai(id).then((response) => {
            setDetailTransaksi(response);
            setMuter(false);
        }).catch((err) => {
            console.log(err);
            setMuter(false);
        });
    };

    useEffect(() => {
        getHistory();
        showTransaksiSelesai();
    }, []);

    return (
        <div className="m-3">
            <h2 className='my-3 text-center'><b>History Pembelian</b></h2>
            <hr className="my-3" />

            <div className='mb-3 w-50'>
                <Form onSubmit={searchHistory}>
                    <InputGroup>
                        <Form.Control
                            placeholder='Search...'
                            aria-label='Search'
                            aria-describedby='basic-addon2'
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button id="button-addon2" style={{ backgroundColor: '#8e6f8e', borderColor: '#8e6f8e' }} type='submit'>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </InputGroup>
                </Form>
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
                <tbody className='text-center align-middle'>
                    {loading ? (
                        <tr>
                            <td colSpan={7} className="text-center">
                                <Spinner animation="border" variant="primary" className="mx-auto d-block" />
                            </td>
                        </tr>
                    ) : data?.length > 0 ? (
                        data?.map((item, index) => {
                            let rowspan = 1;
                            if (index > 0 && item.ID_Transaksi === data[index - 1].ID_Transaksi) {
                                rowspan = 0;
                            } else {
                                for (let i = index + 1; i < data.length; i++) {
                                    if (item.ID_Transaksi === data[i].ID_Transaksi) {
                                        rowspan++;
                                    } else {
                                        break;
                                    }
                                }
                            }
                            return (
                                <tr key={index}>
                                    {rowspan === 0 ? null : <td rowSpan={rowspan}>{item.ID_Transaksi}</td>}
                                    <td>{item.tblpegawai.Nama_Pegawai}</td>
                                    <td>{item.Tanggal_Transaksi}</td>
                                    <td>{item.Nama_Produk}</td>
                                    <td>{item.Status}</td>
                                    <td>{item.Total_Transaksi}</td>
                                    <td>{item.tblalamat.Alamat}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center">Data Kosong</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <hr className="my-3" />
            <h2 className='my-3 text-center'><b>Pembelian On Delivery</b></h2>
            
            <div className='w-100'>
                <div className="overflow-scroll-container">
                    <Row className="g-4 flex-nowrap">
                        {proses ? (
                            <Spinner className='mx-auto d-block' animation="border" variant="primary" />
                        ) : (
                            statusDibawaKurir?.length > 0 ? (
                                statusDibawaKurir?.map((item, index) => (
                                    <Col key={index} xs="auto">
                                        <Card>
                                            <Card.Body>
                                                <Card.Title className='d-flex justify-content-center'><b>{item.ID_Transaksi}</b></Card.Title>
                                                <hr/>
                                                <Card.Text>
                                                    <OverlayTrigger trigger="click" placement='bottom' overlay={popover} onHide={handleClose}>
                                                        <div className='my-2 d-grid gap-2'>
                                                        <Button variant='dark' size='sm' onClick={() => showDetailTransaksi(item.ID_Transaksi)}>Show Produk</Button>
                                                        </div>
                                                    </OverlayTrigger>
                                                    <p><b>Status : </b> {item.Status}</p>
                                                    <p><b>Total akhir :</b> {item.Total_Bayar}</p>
                                                    <hr />
                                                    <p><b>Total bayar :</b> {item.Total_Pembayaran}</p>
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                {item.Status === 'Dibawa Kurir' ? (
                                                    <UpdateStatusTransaksiCustomer onSuccess={showTransaksiSelesai} dataHistory={item}/>
                                                ) : (
                                                    <div className='d-grid gap-2'>
                                                        <Button variant='dark' disabled>Done</Button>
                                                    </div>
                                                )}
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <p>Data Kosong</p>
                            )
                        )}
                    </Row>
                </div>
            </div>

            <hr className="my-3" />
            <h2 className='my-3 text-center'><b>Pembelian Selesai</b></h2>
            
            <div className='w-100'>
                <div className="overflow-scroll-container">
                    <Row className="g-4 flex-nowrap">
                        {proses ? (
                            <Spinner className='mx-auto d-block' animation="border" variant="primary" />
                        ) : (
                            statusSelesai?.length > 0 ? (
                                statusSelesai?.map((item, index) => (
                                    <Col key={index} xs="auto">
                                        <Card>
                                            <Card.Body>
                                                <Card.Title className='d-flex justify-content-center'><b>{item.ID_Transaksi}</b></Card.Title>
                                                <hr/>
                                                <Card.Text>
                                                    <OverlayTrigger trigger="click" placement='bottom' overlay={popover} onHide={handleClose}>
                                                        <div className='my-2 d-grid gap-2'>
                                                        <Button variant='dark' size='sm' onClick={() => showDetailTransaksi(item.ID_Transaksi)}>Show Produk</Button>
                                                        </div>
                                                    </OverlayTrigger>
                                                    <p><b>Status : </b> {item.Status}</p>
                                                    <p><b>Total akhir :</b> {item.Total_Bayar}</p>
                                                    <hr />
                                                    <p><b>Total bayar :</b> {item.Total_Pembayaran}</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <p>Data Kosong</p>
                            )
                        )}
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default ShowHistoryCustomer;
