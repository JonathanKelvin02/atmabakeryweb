import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';
import { GetAllTransaction } from "../../../api/apiTransaksi";
import MyDocument from "../../../Component/PDF/ingredientsMOPDF";
import { pdf } from '@react-pdf/renderer';

import ListBahanBakuMOPesanan from "../../../Component/Modal/MOShowPesanan/ListBahanBaku";

const KonfirmasiPesananView = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const itemsCountPerPage = 10;
    const indexOfLastItem = activePage * itemsCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const inputCari = useRef("");
    const [refresh, setRefresh] = useState(false);

    const [initialSendedData, setInitialSendedData] = useState();
    const [showModalFirst, setShowModalFirst] = useState(false);
    const [showModalSecond, setShowModalSecond] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        GetAllTransaction().then((response) => {
            setData(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
    };

    const handlePrint = async () => {
        try {
            const doc = pdf(<MyDocument />);
            const blob = await doc.toBlob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'example.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    return (
        <>
            {showModalFirst && <ListBahanBakuMOPesanan show={showModalFirst} onClose={() => setShowModalFirst(false)} onRefresh={() => setRefresh(!refresh)} initialData={initialSendedData} />}

            <Container className="top-container">
                <Row>
                    <Col xs={12} md={8}>
                        <InputGroup style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <input className="search" type="search" name="" id="" placeholder="Search..." style={{ flexGrow: 1 }} ref={inputCari} />
                            <button type="button" className="search-button">
                                <FaSearch style={{ color: 'white' }} />
                            </button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
            <Container className="big-container">
                {isLoading ? (
                    <div className="text-center">
                        <Spinner as="span" animation="border" variant="dark" size="lg" role="status" aria-hidden="true" />
                        <h6 className="mt-2 mb-0">Loading...</h6>
                    </div>
                ) : (
                    data?.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                        <th>Transaction ID</th>
                                        <th>Transaction Date</th>
                                        <th>Customer Name</th>
                                        <th>Total Transaction</th>
                                        <th>Ingredients Receipt</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems?.map((data, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <td>{data.ID_Transaksi}</td>
                                            <td>{data.Total_Transaksi}</td>
                                            <td>{data.tblcustomer.Nama_Customer}</td>
                                            <td>dsadad</td>
                                            <td>
                                                <Button style={{ width: '68px', marginRight: '10px' }} variant="outline-success" onClick={handlePrint}>Print</Button>
                                            </td>
                                            <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Row>
                                                    <Button style={{ width: '68px', marginRight: '10px' }} variant="outline-success" onClick={() => {
                                                        setShowModalFirst(!showModalFirst);
                                                        setInitialSendedData(data);
                                                    }}>Accept</Button>
                                                    <Button style={{ width: '68px' }} variant="danger">Reject</Button>
                                                </Row>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Expenses Yet
                        </Alert>
                    )
                )}
            </Container>
        </>
    );
};

export default KonfirmasiPesananView;
