import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";

import './tempPdf.css';

const TempPdfView = () => {

    return (
        <>
            <div className="MainBackGroundFiller">
                <div className="MainPdfPageArea">
                    <div className="MainPdfPageAreaMainBorder">
                        <div className="MainPdfPageAreaMainBorderMainTitle">
                            <b>List Pesanan Harian</b>
                            <a>Tanggal : 18/02/2024</a>

                            <div className="horizontalLineToFull"/>

                            <div className="firstRowData">
                                <div className="firstRowDataPerSide">
                                    <div className="firstRowDataPerSideMainTitle">
                                        List Pesanan:
                                    </div>
                                    <div className="firstRowDataPerSideMainContent">
                                        <div>No Nota: 24.02.101</div>
                                        <div>Nama: Catherine Sienna</div>
                                        <div>Jam 10.00</div>
                                        <div style={{ marginBottom: "18px" }}>1 Hampers Paket A</div>
                                    </div>

                                    <div className="firstRowDataPerSideMainContent">
                                        <div>No Nota: 24.02.102</div>
                                        <div>Nama: Milley</div>
                                        <div>Jam 08.00</div>
                                        <div style={{ marginBottom: "18px" }}>1 Lapis Surabaya 1/2 Loyang</div>
                                    </div>

                                    <div className="firstRowDataPerSideMainContent">
                                        <div>No Nota: 24.02.104</div>
                                        <div>Nama: Brandon</div>
                                        <div>Jam 12.00</div>
                                        <div>1 Lapis Surabaya 1 Loyang</div>
                                    </div>
                                </div>

                                <div className="firstRowDataPerSideRight">
                                    <div className="firstRowDataPerSideMainTitle">
                                        Rekap:
                                    </div>
                                    <div className="firstRowDataPerSideMainContent">
                                        <div>1 Brownies ½ Loyang</div>
                                        <div>1 Lapis Legit ½ Loyang</div>
                                        <div>1 Lapis Surabaya ½ Loyang</div>
                                        <div>1 Lapis Surabaya 1 Loyang</div>
                                        <div style={{ marginBottom: "18px", marginTop: "18px" }}>================================</div>                                        
                                    </div>

                                    <div className="firstRowDataPerSideMainTitle">
                                        Yang Perlu Dibuat:
                                    </div>
                                    <div className="firstRowDataPerSideMainContent">
                                        <div>Brownies 1 Loyang </div>
                                        <div>Lapis Legit 1 Loyang</div>
                                        <div>Lapis Surabaya 1½ Loyang </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TempPdfView;