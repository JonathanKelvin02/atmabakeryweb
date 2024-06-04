import {useState, useEffect} from 'react';
import {Table, Button, Spinner, Alert} from 'react-bootstrap'

import {GetAllAlamatNoJarak} from '../../../api/apiAlamat'
import { GetTransaksiNoTotalBayar } from '../../../api/apiTransaksi';

import UpdateJarakBiaya from './UpdateJarakBiaya';
import UpdateTotalBayarTransaksi from './UpdateTotalBayarTransaksi';

const ShowAllAlamatNoJarak = () => {
    const [alamat, setAlamat] = useState([]);
    const [transaksi, setTransaksi] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllAlamatNoJarak = () => {
        setIsLoading(true);
        GetAllAlamatNoJarak().then((response) => {
            setAlamat(response);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const fetchAllTransaksiNoTotalBayar = () => {
        setIsLoading(true);
        GetTransaksiNoTotalBayar().then((response) => {
            setTransaksi(response);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchAllAlamatNoJarak();
        fetchAllTransaksiNoTotalBayar();
    }, [])

    return(
        <>
            <Table className='m-3' style={{width:'97%'}} striped bordered hover responsive>
                {isLoading ? (
                    <tr>
                        <td colSpan='5' className='text-center'>
                            <Spinner animation='border' variant='primary' />
                        </td>
                    </tr> 
                ) : (
                    <>
                        <thead>
                            <tr>
                                <th>Nomor</th>
                                <th>ID Transaksi</th>
                                <th>Nama Customer</th>
                                <th>Alamat</th>
                                <th>Jarak</th>
                                <th>Biaya</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-center align-middle'>
                            {alamat.length == 0 ? 
                                <tr>
                                    <td colSpan='7'>
                                        <Alert variant='warning' className='text-center m-0'>
                                            Data Alamat Kosong 
                                        </Alert>
                                    </td>
                                </tr> :
                                alamat.map((data, index) => {
                                    var rowspan = 1;
                                    if (index > 0 && data.Nama_Customer === alamat[index - 1].Nama_Customer) {
                                        rowspan = 0;
                                    } else {
                                        for (let i = index + 1; i < alamat.length; i++) {
                                            if (data.Nama_Customer === alamat[i].Nama_Customer) {
                                                rowspan++;
                                            } else {
                                                break;
                                            }
                                        }
                                    }
                                    return(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{data.ID_Transaksi} || {data.ID_Customer}</td>
                                            {rowspan === 0 ? null : <td rowSpan={rowspan}>{data.Nama_Customer}</td>}
                                            <td>{data.Alamat}</td>
                                            {data.Jarak === null ? <td>-</td> : <td>{data.Jarak}</td>}
                                            {data.Biaya === null ? <td>-</td> : <td>{data.Biaya}</td>}
                                            <td><UpdateJarakBiaya dataAlamat={data} onSuccess={fetchAllAlamatNoJarak}/></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </>
                )}
            </Table>
                <hr className="my-4 mx-3" />
            <Table className='m-3' style={{width:'97%'}} striped bordered hover responsive>
                {isLoading ? (
                    <tr>
                        <td colSpan='5' className='text-center'>
                            <Spinner animation='border' variant='primary' />
                        </td>
                    </tr> 
                ) : (
                    <>
                            <thead>
                            <tr>
                                <th>Nomor</th>
                                <th>ID Transaksi</th>
                                <th>Biaya Ongkir</th>
                                <th>Total Transaksi</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-center align-middle'>
                            {transaksi.length == 0 ? 
                                <tr>
                                    <td colSpan='7'>
                                        <Alert variant='warning' className='text-center m-0'>
                                            Data Transaksi Kosong 
                                        </Alert>
                                    </td>
                                </tr> :
                                transaksi.map((data, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{data.ID_Transaksi}</td>
                                            <td>{data.Biaya}</td>
                                            <td>{data.Total_Transaksi}</td>
                                            <td><UpdateTotalBayarTransaksi dataTransaksi={data} onSuccess={fetchAllTransaksiNoTotalBayar}/></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </>
                )}
            </Table>
        </>
    )
}

export default ShowAllAlamatNoJarak;