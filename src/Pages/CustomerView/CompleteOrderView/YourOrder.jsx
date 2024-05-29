import { useState, useEffect } from "react";
import { Container, Table, Alert, Spinner } from "react-bootstrap";

import { ShowCompleteOrder } from "../../../api/apiTransCust";
import { FaPrint } from "react-icons/fa";

import { formatRupiah } from "../../../Component/Currency/FormatCurency";
import PdfGenerator from "./NotaPdf";

const YourOrderView = () => {
    const generatePdf = (trans) => {
        PdfGenerator(trans);
    }

    const [transaksi, setTransaksi] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
 
    const fetchTransaksi = () => {
        setIsLoading(true);
        ShowCompleteOrder().then((res) => {
            console.log(res);
            setTransaksi(res);
            setIsLoading(false);
        }).catch((e) => {
            console.log(e);
            setIsLoading(false);
        })
    };

    useEffect(() => {
        fetchTransaksi();
    }, []);

    return (
        <>
            <Container>
                {isLoading ? (
                    <div className="text-center">
                        <Spinner
                            as="span"
                            animation="border"
                            variant="dark"
                            size="lg"
                            role="status"
                            aria-hidden="true"
                        />
                        <h6 className="mt-2 mb-0">Loading...</h6>
                    </div>
                ) : (
                    transaksi.length > 0 ? (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Tanggal Pembelian</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaksi.map((trans, index) => (
                                     <tr key={index}>
                                        <td>{trans.ID_Transaksi}</td>
                                        <td>{trans.Tanggal_Transaksi}</td>
                                        <td>{trans.Status}</td>
                                        <td>{formatRupiah(trans.Total_Transaksi)}</td>
                                        <td>
                                            <button className="edit-action" onClick={() => generatePdf(trans)}><FaPrint />Cetak Nota</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </Table>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Products Yet
                        </Alert>
                    )
                )}
            </Container>
        </>
    );
}

export default YourOrderView;