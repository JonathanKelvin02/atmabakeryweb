import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { FaSearch, FaPlus } from 'react-icons/fa';
import Pagination from "react-js-pagination";
import Popup from 'reactjs-popup';
import { ToastContainer, toast } from 'react-toastify';

import PengeluaranModal from "../../../Component/Modal/PengeluaranModal/PengeluaranModal";
import DeleteModal from "../../../Component/Modal/DeleteConfirmationModal";

import LaporanPresensiModal from "../../../Component/Modal/LaporanModal/LaporanPresensiModal";
import LaporanPemasukanPengeluaranModal from "../../../Component/Modal/LaporanModal/LaporanPemasukanPengeluaranModal";

// Import Css
import '../../AdminView/ProductView/Product.css';
import '../../AdminView/PenitipPage/Penitip.css';
import './Laporan.css';

const LaporanViewMO = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showValueModal1, setShowValueModal1] = useState(false);
    const [showValueModal2, setShowValueModal2] = useState(false);
    const [showValueModal3, setShowValueModal3] = useState(false);

    const listLaporan =
        [
            {
                nama: 'Laporan Presensi dan Gaji Pegawai Bulanan',
                valueBool: 1,
            },
            {
                nama: 'Laporan Pemasukan dan Pengeluaran Bulanan',
                valueBool: 2,
            },
            {
                nama: 'Laporan Rekap Transaksi Penitip',
                valueBool: 3,
            },
        ];

    const handleShowValueModal = (event) => {
        if (event === 1) {
            setShowValueModal1(true);
        } else if (event === 2) {
            setShowValueModal2(true);
        } else if (event === 3) {
            setShowValueModal3(true);
        }
    }

    return (
        <>
            {showValueModal1 && <LaporanPresensiModal show={showValueModal1} onClose={() => setShowValueModal1(false)} />}
            {showValueModal2 && <LaporanPemasukanPengeluaranModal show={showValueModal2} onClose={() => setShowValueModal2(false)} />}

            <Container className="top-container">
                <Row>
                    <Col xs={12} md={8}>
                        <InputGroup style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <input className="search" type="search" name="" id="" placeholder="Search..." style={{ flexGrow: 1 }} />
                            <button type="button" className="search-button">
                                <FaSearch style={{ color: 'white' }} />
                            </button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
            <Container className="big-container">
                {listLaporan.map((laporan, index) => {
                    return (
                        <div key={index} className="boxForItemLaporan">
                            <div className="boxForItemLaporanContent">
                                <div className="boxForItemLaporanContentBadge">
                                    <a>{laporan.nama}</a>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <Button style={{ marginRight: "10px" }} variant="outline-success" onClick={() => handleShowValueModal(laporan.valueBool)}>Live Preview</Button>
                                    <Button variant="outline-success">Print</Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Container>
        </>
    )
}

export default LaporanViewMO;