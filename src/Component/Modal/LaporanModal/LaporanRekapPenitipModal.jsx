import { useEffect, useState } from 'react';
import { Form, Button, Modal, Row, Col, } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { PDFViewer } from '@react-pdf/renderer';

import LaporanPresensi from '../../PDF/LaporanTransaksiRekapPDF';
import './LaporanPresensiModal.css';

import { GetLaporanTransaksiPenitip } from '../../../api/apiLaporan';

const LaporanRekapPenitip = ({ show, onClose }) => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [showPDF, setShowPDF] = useState(false);
    const [dataFetched, setData] = useState({});
    const [totalGajiPegawai, setTotalGajiPegawai] = useState(0);

    const months = [
        { name: 'January', value: '1' },
        { name: 'February', value: '2' },
        { name: 'March', value: '3' },
        { name: 'April', value: '4' },
        { name: 'May', value: '5' },
        { name: 'June', value: '6' },
        { name: 'July', value: '7' },
        { name: 'August', value: '8' },
        { name: 'September', value: '9' },
        { name: 'October', value: '10' },
        { name: 'November', value: '11' },
        { name: 'December', value: '12' },
    ];

    const years = Array.from(new Array(10), (val, index) => new Date().getFullYear() - index);

    const generetingDataToPDF = () => {
        if (selectedMonth === '' || selectedYear === '') {
            toast.error('Please select month and year');
        } else {
            const toData = {
                bulan: selectedMonth,
                tahun: selectedYear,
            };

            setIsLoading(true);
            GetLaporanTransaksiPenitip(toData).then((res) => {
                setData(res);
                setIsLoading(false);
                setShowPDF(true);
            })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                });
        }
    }

    return (
        <>
            <Form className='roboto'>
                <Modal
                    show={show}
                    onHide={onClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Depositor Transaction Recap Report
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group controlId="formMonth">
                            <Form.Label>Bulan</Form.Label>
                            <Form.Select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                            >
                                <option value="">Pilih Bulan</option>
                                {months.map((month) => (
                                    <option key={month.value} value={month.value}>
                                        {month.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formYear" className="mt-3">
                            <Form.Label>Tahun</Form.Label>
                            <Form.Select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                            >
                                <option value="">Pilih Tahun</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="buttonAccept" className="mt-3">
                            <Button variant="outline-success" className="w-100" onClick={generetingDataToPDF} disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Create PDF'}
                            </Button>
                        </Form.Group>

                        {/* {showPDF && (
                        // {data.data.map((penitip, index) => (
                            
                        // ))}

                        <div className="pdf-modal-body mt-4">
                            {showPDF && (
                                <PDFViewer className="pdf-viewer">
                                    <LaporanPresensi 
                                        initialData={dataFetched}
                                    />
                                </PDFViewer>
                            )}
                        </div>
                    )} */}

                        {showPDF && (
                                <div className="pdf-modal-body mt-4">
                                    {dataFetched.data.map((penitip, index) => (
                                        <PDFViewer className="pdf-viewer" key={index}>
                                            <LaporanPresensi
                                                dataPenitip={penitip}
                                                bulan={dataFetched.bulan}
                                                tahun={dataFetched.tahun}
                                                tgl_cetak={dataFetched.tgl_cetak}
                                            />
                                        </PDFViewer>
                                    ))}
                                </div>

                        )}



                        {/* <div className="pdf-modal-body mt-4">
    {showPDF && Array.isArray(data) && data.map((penitipData, index) => (
        <PDFViewer key={index} className="pdf-viewer">
            <LaporanPresensi 
                initialData={penitipData}
            />
        </PDFViewer>
    ))}
</div> */}



                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="outline-success" type="submit">Save</Button>
                        <Button variant="danger" onClick={onClose}>Cancel</Button>
                    </Modal.Footer>

                </Modal>
            </Form>
        </>
    );
}

export default LaporanRekapPenitip;
