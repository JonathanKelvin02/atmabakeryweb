import {useState, useEffect} from 'react';
import {Table, Button, Spinner, Alert,  OverlayTrigger, Popover } from 'react-bootstrap';

//Import API
import { GetTransaksiCustomer, GetTransaksiTelatBayar, GetDetailTransaksiBatal } from '../../../api/apiTransaksi';

//Import Component
import UpdateStatusTransaksi from './UpdateStatusTransaksi';
import ShowBuktiPembayaran from './ShowBuktiPembayaran';
import UpdateTransaksiBatal from './UpdateTransaksiBatal'; 

const ConfirmPesanan = () => {
    const [pesanan, setPesanan] = useState([]);
    const [order, setOrder] = useState([]);
    const [detailTransaksi, setDetailTransaksi] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [proses, setProses] = useState(false);
    const [muter, setMuter] = useState(false);

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

    const hitungTelatBayar = (ambil, pelunasan) => {
        const dateAmbil = new Date(ambil);
        const datePelunasan = new Date(pelunasan);
        const timeDiff = dateAmbil - datePelunasan;

        const daysLate = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hoursLate = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLate = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        return `${daysLate} Hari, ${hoursLate} Jam, ${minutesLate} Menit`;
    };

    const fetchPesanan = () => {
        setIsLoading(true);
        GetTransaksiCustomer().then((response) => {
            setPesanan(response);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const fetchOrderTelatBayar = () => {
        setProses(true);
        setDetailTransaksi([]);
        GetTransaksiTelatBayar().then((response) => {
            setOrder(response);
            setProses(false);
        }).catch((error) => {
            console.log(error);
            setProses(false);
        })
    }

    const fetchDetailTransaksi = (id) => {
        setMuter(true);
        GetDetailTransaksiBatal(id).then((response) => {
            setDetailTransaksi(response);
            setMuter(false);
        }).catch((error) => {
            console.log(error);
            setMuter(false);
        })
    }

    useEffect(() => {
        fetchPesanan();
        fetchOrderTelatBayar();
        fetchDetailTransaksi();
    }, [])

    return (
        <>
            <h2 className=' mt-3 text-center'><b>Data Transaksi Sudah Membayar</b></h2>
            <hr className='mx-3' />
            <Table className='mt-3 mx-3' style={{width : '97.4%'}} striped bordered hover responsive>
                {isLoading ? (
                    <tr>
                        <td colSpan={10} className='text-center'>
                            <Spinner animation='border' variant='primary' />
                        </td>
                    </tr>
                ) : (
                    <>
                        <thead>
                            <tr>
                                <th>ID Transaksi</th>
                                <th>Nama Customer</th>
                                <th>Status</th>
                                <th>Jenis Pengambilan</th>
                                <th>Tanggal Ambil</th>
                                <th>Total Bayar</th>
                                <th>Total Pembayaran</th>
                                <th>Tip</th>
                                <th>Bukti Pembayaran</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody className='text-center align-middle'>
                            {pesanan.length === 0 ? (
                                <tr>
                                    <td colSpan={10}>
                                        <Alert variant='warning' className='text-center m-0'>
                                            Data Pesanan Untuk Dikonfirmasi Kosong
                                        </Alert>
                                    </td>
                                </tr>
                            ) : (
                                pesanan.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data?.ID_Transaksi}</td>
                                            <td>{data?.tblcustomer.Nama_Customer}</td>
                                            <td>{data?.Status}</td>
                                            <td>{data?.tbljenispengiriman.Nama_Pengiriman}</td>
                                            <td>{data?.Tanggal_Ambil}</td>
                                            <td>{data?.Total_Transaksi}</td>
                                            <td>{data?.Total_pembayaran}</td>
                                            <td>{data?.Total_pembayaran - data?.Total_Transaksi}</td>
                                            <td>
                                                <ShowBuktiPembayaran dataTransaksi={data} />
                                            </td>
                                            <td>
                                                <UpdateStatusTransaksi dataTransaksi={data} onSuccess={fetchPesanan} />
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </>
                )}
            </Table>
            <h2 className=' mt-3 text-center'><b>Data Transaksi Telat Bayar</b></h2>
            <hr className='mx-3' />
            <Table className='mt-3 mx-3' style={{width : '97.4%'}} striped bordered hover responsive>
                {proses ? (
                    <tr>
                        <td colSpan={6} className='text-center'>
                            <Spinner animation='border' variant='primary' />
                        </td>
                    </tr>
                ) : (
                    <>
                        <thead>
                            <tr>
                                <th>ID Transaksi</th>
                                <th>Data Produk</th>
                                <th>Tanggal Ambil</th>
                                <th>Tanggal Ambil</th>
                                <th>Tanggal Pelunasan</th>
                                <th>Lama Telat Bayar</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-center align-middle'>
                            {order.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        <Alert variant='warning' className='text-center m-0'>
                                            Data Pesanan Telat Bayar Kosong
                                        </Alert>
                                    </td>
                                </tr>
                            ) : (
                                order.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.ID_Transaksi}</td>
                                            <td>
                                                <OverlayTrigger trigger="click" placement='bottom' overlay={popover} onHide={handleClose}>
                                                    <div className='my-2 d-grid gap-2'>
                                                    <Button variant='dark' size='sm' onClick={() => fetchDetailTransaksi(data.ID_Transaksi)}>Show Produk</Button>
                                                    </div>
                                                </OverlayTrigger>
                                            </td>
                                            <td>{data.Tanggal_Transaksi}</td>
                                            <td>{data.Tanggal_Ambil}</td>
                                            <td>{data.Tanggal_Pelunasan}</td>
                                            <td>{hitungTelatBayar(data.Tanggal_Ambil, data.Tanggal_Pelunasan)}</td>
                                            <td>
                                                <UpdateTransaksiBatal dataTransaksi={data} onSuccess={fetchOrderTelatBayar} />
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </>
                )}
            </Table>
        </>
    )
}

export default ConfirmPesanan;