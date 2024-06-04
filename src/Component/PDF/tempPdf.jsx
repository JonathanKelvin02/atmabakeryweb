import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";

import './tempPdf.css';

const TempPdfView = () => {

    return (
        <>
            <div className="mainBackground">
                <div className="mainHVS">
                    <div className="mainHVSMainBoxContent">
                        <div className="mainHVSMainBoxContentAtmaKitchen">
                            Atma Kitchen
                        </div>
                        <div className="mainHVSMainBoxContentJln">
                            Jl. Centralpark No. 10 Yogyakarta
                        </div>

                        <div className="mainHVSMainBoxContentLaporanTitle">
                            LAPORAN TRANSAKSI PENITIP
                        </div>

                        <div className="mainHVSMainBoxContentJln">
                            ID Penitip : Penitip01
                            Nama Penitip : Celine
                            Bulan : Januari
                            Tahun: 2024
                            Tanggal cetak: 10 Februari 2024
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};

export default TempPdfView;