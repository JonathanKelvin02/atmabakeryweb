import {useState, useEffect} from 'react';
import {Table, Spinner, Alert} from 'react-bootstrap';

//Import API
import { GetTransaksiDiproses, GetTransaksiDikirim } from '../../../api/apiTransaksi';

//Import Component
import UpdateTransaksiDikirim from './UpdateTransaksiDikirim';
import UpdateTransaksiSelesai from './UpdateTransaksiSelesai';

const ShowProcessPesanan = () => {
    const [loading, setLoading] = useState(false);
    const [proses, setProses] = useState(false);
    const [transaksi, setTransaksi] = useState([]);
    const [pesanan, setPesanan] = useState([]);

    const fetchTransaksi = () => {
        setLoading(true);
        GetTransaksiDiproses().then((response) => {
            setTransaksi(response);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            setTransaksi([]);
        })
    }

    const fetchPesanan = () => {
        setProses(true);
        GetTransaksiDikirim().then((response) => {
            setPesanan(response);
            setProses(false);
        }).catch((error) => {
            console.log(error);
            setProses(false);
            setPesanan([]);
        })
    }

    const fetchAll = () => {
        fetchTransaksi();
        fetchPesanan();
    }

    useEffect(() => {
        fetchTransaksi();
        fetchPesanan();
    },[])

    return (
        <>
            <h2 className='m-3 text-center'><b>Data Transaksi 'Diproses'</b></h2>
            <Table className='mt-3 mx-3' style={{width : '97.4%'}} striped bordered hover responsive>
                {loading ? (
                    <td colSpan={6} className='text-center'>
                        <Spinner animation='border' variant='dark' />
                    </td>
                ) : (
                    <>
                        <thead>
                            <tr>
                                <th>ID Transaksi</th>
                                <th>Nama Customer</th>
                                <th>Status</th>
                                <th>Jenis Pengiriman</th>
                                <th>Tanggal Ambil</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody className='text-center align-middle'>
                            {transaksi.length === 0 ? (
                                <tr>
                                <td colSpan={6}>
                                    <Alert variant='warning' className='text-center m-0'>
                                        Data Pesanan dengan status Diproses Kosong
                                    </Alert>
                                </td>
                            </tr>
                            ) : (
                                transaksi.map((data, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{data.ID_Transaksi}</td>
                                            <td>{data.Nama_Customer}</td>
                                            <td><b>{data.Status}</b></td>
                                            <td>{data.Nama_Pengiriman}</td>
                                            <td>{data.Tanggal_Ambil}</td>
                                            <td><UpdateTransaksiDikirim onSuccess={fetchAll} dataTransaksi={data}/></td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </>
                )}
            </Table>
            <hr className="my-4 mx-3" />
            <h2 className='m-3 text-center'><b>Data Transaksi 'Siap Dipick-Up' / 'Siap Dikirim'</b></h2>
            <Table className='mt-3 mx-3' style={{width : '97.4%'}} striped bordered hover responsive>
                {proses ? (
                    <td colSpan={6} className='text-center'>
                        <Spinner animation='border' variant='dark' />
                    </td>
                ) : (
                    <>
                        <thead>
                            <tr>
                                <th>ID Transaksi</th>
                                <th>Nama Customer</th>
                                <th>Status</th>
                                <th>Jenis Pengiriman</th>
                                <th>Tanggal Ambil</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody className='text-center align-middle'>
                            {pesanan.length === 0 ? (
                                <tr>
                                <td colSpan={6}>
                                    <Alert variant='warning' className='text-center m-0'>
                                        Data Pesanan dengan status Siap Dipick-Up / Siap Dikirim Kosong
                                    </Alert>
                                </td>
                            </tr>
                            ) : (
                                pesanan.map((order, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{order.ID_Transaksi}</td>
                                            <td>{order.Nama_Customer}</td>
                                            <td><b>{order.Status}</b></td>
                                            <td>{order.Nama_Pengiriman}</td>
                                            <td>{order.Tanggal_Ambil}</td>
                                            <td><UpdateTransaksiSelesai onSuccess={fetchAll} dataTransaksi={order}/></td>
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

export default ShowProcessPesanan;