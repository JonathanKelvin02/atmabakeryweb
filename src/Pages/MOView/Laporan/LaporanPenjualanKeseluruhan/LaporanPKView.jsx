import React, { useState, useRef } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { BarChart } from '@mui/x-charts/BarChart';
import { toast } from 'react-toastify';
import html2canvas from 'html2canvas';

// Import API
import { LaporanPenjualanTahunan } from '../../../../api/apiTransaksi';
import LaporanPKPDF from './LaporanPKPDF';

const LaporanPKView = () => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [tahun, setTahun] = useState(0);
    const [header, setHeader] = useState({
        Tanggal_Cetak: '',
        Total_Penjualan: 0,
        data: [],
    });
    const [tempData, setTempData] = useState([]);
    const chartRef = useRef(null);

    const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const handleChange = (e) => {
        setTahun(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (tahun === 0) {
            toast.error('Tahun tidak boleh kosong!');
        } else if (tahun.length !== 4) {
            toast.error('Tahun harus 4 digit!');
        } else {
            setLoading(true);
            try {
                const response = await LaporanPenjualanTahunan(tahun);
                setLoading(false);
                setHeader(response);
                const temp = response.data;
                console.log(temp);
                for (let i = 1; i<=12; i++) {
                    let flag = false;
                    for (let j = 0; j<temp.length; j++) {
                        if (temp[j].bulan === i) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        temp.push({
                            bulan: i,
                            total_penjualan: 0,
                            total_pendapatan: 0,
                        });
                    }
                }
                temp.sort((a, b) => a.bulan - b.bulan);
                setTempData(temp.map((item) => item.total_pendapatan));
                setDisabled(false);
                toast.success('Data Laporan berhasil diambil');
            } catch (err) {
                setLoading(false);
                console.log(err);
                toast.error('Gagal mengambil data laporan');
            }
        }
    };

    const handleCreatePDF = async () => {
        try {
            // const chartElement = document.getElementsByTagName('svg')[0]; // Or use document.getElementsByClassName('chart-container')[0] for class name
            // if (!chartElement) {
            //     throw new Error('Chart element not found');
            // }
            // const canvas = await html2canvas(chartElement);
            // const chartImage = canvas.toDataURL('image/png');
            LaporanPKPDF({laporan: header });
        } catch (error) {
            console.error('Error capturing chart:', error);
            toast.error('Error capturing chart');
        }
    };

    console.log(header);

    return (
        <>
            <h2 className='m-2 text-center'><b>Laporan Penjualan Tahunan</b></h2>
            <hr className='m-2'/>

            <Form className='m-2' onSubmit={handleSubmit}>
                <InputGroup className='mb-3 mt-3'>
                    <InputGroup.Text>Tahun</InputGroup.Text>
                    <Form.Control type='number' name='tahun' onChange={handleChange} />
                    <Button variant='primary' type='submit'>
                        {loading ? <Spinner animation='border' variant='light' size='sm' /> : 'Submit'}
                    </Button>
                </InputGroup>
            </Form>
            <Button className='mx-2 mb-3 d-grip' variant='success' disabled={disabled} onClick={handleCreatePDF}>Create PDF</Button>
            <hr className='m-2 mt-3'/>
            <h2 className='m-2 text-center'><b>Overview Chart</b></h2>
            
            <BarChart
                ref={chartRef}
                series={[
                    { data: tempData, label: 'Total Pendapatan'},
                ]}
                xAxis={[{ data: bulan, scaleType: 'band' }]}
            />
        </>
    );
};

export default LaporanPKView;