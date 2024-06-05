import React, {useState} from 'react';
import {Button, Form, InputGroup, Spinner} from 'react-bootstrap';
import {toast} from 'react-toastify';

//Import API
import { LaporanPenggunaanBahanBaku } from '../../../../api/apiBahanBaku';

//Import Component
import LaporanPBBPDF from './LaporanPBBPDF';

const LaporanPBBView = () => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [data, setData] = useState([]);
    const [tanggal, setTanggal] = useState({
        tglAwal: '',
        tglAkhir: '',
    });

    const handleChange = (e) => {
        setTanggal({
            ...tanggal,
            [e.target.name]: e.target.value,
        });
    }

    const generatePDF = (data) => {
        LaporanPBBPDF(data);
    }

    const handleSubmit = async (e) => {  
        e.preventDefault();
        if (tanggal.tglAwal === '' || tanggal.tglAkhir === '') {
            toast.error('Tanggal tidak boleh kosong!');
        } else if (tanggal.tglAwal > tanggal.tglAkhir) {
            toast.error('Tanggal awal tidak boleh lebih besar dari tanggal akhir!');
        } else {
            setLoading(true);
            LaporanPenggunaanBahanBaku(tanggal).then((response) => {
                setLoading(false);
                setData(response);
                setDisabled(false);
                toast.success('Data Laporan berhasil diambil');
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            })
        }
    }

    return (
        <>
            <h2 className='m-2 text-center'><b>Laporan Penggunaan Bahan Baku</b></h2>
            <hr className='m-2'/>
            <Form className='m-2' onSubmit={handleSubmit}>
                <InputGroup className='mb-3 mt-3'>
                    <InputGroup.Text>Input Tanggal</InputGroup.Text>
                    <Form.Control type='date' name='tglAwal' onChange={handleChange}/>
                    <Form.Control type='date' name='tglAkhir' onChange={handleChange}/>
                    <Button variant='primary' type='submit'>
                        {loading ? <Spinner animation='border' variant='light' size='sm' /> : 'Tampilkan'}
                    </Button>
                </InputGroup>
            </Form>
            <Button className='mx-2 d-grip' variant='success' disabled={disabled} onClick={() => generatePDF(data)}>Create PDF</Button>
        </>
    )
}

export default LaporanPBBView;