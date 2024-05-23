import {useState, useEffect} from 'react';
import {Table, Button, Spinner, Alert} from 'react-bootstrap';

//Import API
import { GetTransaksiCustomer } from '../../../api/apiTransaksi';

//Import Component
import UpdateStatusTransaksi from './UpdateStatusTransaksi';

const ConfirmPesanan = () => {
    const [pesanan, setPesanan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        fetchPesanan();
    }, [])

    return (
        <>
            <Table className='mt-3 mx-3' style={{width : '97.4%'}} striped bordered hover responsive>
                {isLoading ? (
                    <tr>
                        <td colSpan={9} className='text-center'>
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
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody className='text-center align-middle'>
                            {pesanan.length === 0 ? (
                                <tr>
                                    <td colSpan={9}>
                                        <Alert variant='warning' className='text-center m-0'>
                                            Data Pesanan Kosong
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
        </>
    )
}

export default ConfirmPesanan;