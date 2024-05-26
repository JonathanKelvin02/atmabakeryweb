// Import Component dan Utility
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatternImage from '../../../assets/Pattern.svg';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner, Button } from "react-bootstrap";

import ShowPesananModal from '../../../Component/Modal/ShowPesananModal/ShowPesananModal';
import ShowProofModal from '../../../Component/Modal/ShowPesananModal/ShowBuktiPembayaran';

// Import CSS
import "./ShowPesananView.css";

// Import API
import { GetTransaksiByIdCustomer } from '../../../api/apiCustomer';

function ShowPesananView() {
    const navigate = useNavigate();
    const [dataFetched, setDataFetched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showModalProof, setShowModalProof] = useState(false);

    const [dataSendedToModal, setDataSendedToModal] = useState({});

    const headerTitleElement = [
        { title: 'Nomor Resi' },
        { title: 'Tanggal Transaksi' },
        { title: 'Total Transaksi' },
        { title: 'Total Membayar' },
        { title: 'Bukti Pembayaran' }
    ];

    const fetchData = async () => {
        let user = JSON.parse(sessionStorage.getItem("user"));
        let idCustomer = user.ID_Customer;

        setIsLoading(true);
        GetTransaksiByIdCustomer(idCustomer).then((response) => {
            setDataFetched(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })        
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {showModal && <ShowPesananModal show={showModal} onClose={() => setShowModal(false)} initialData={dataSendedToModal} onRefresh={() => setRefresh(oldRefresh => !oldRefresh)}/>}
            {showModalProof && <ShowProofModal show={showModalProof} onClose={() => setShowModalProof(false)} initialData={dataSendedToModal} onRefresh={() => setRefresh(oldRefresh => !oldRefresh)}/>}

            <div className='areaTable'>
                <div className='areaTableTopLeftPattern'>
                    <img src={PatternImage} alt='Pattern' className='patternImage'/>
                </div>

                <div className='areaTableBottomRightPattern'>
                    <img src={PatternImage} alt='Pattern' className='patternImage'/>
                </div>

                <div className='areaTableContent'>
                    <div className='areaTableContentContent'>
                    <div className="table-responsive" style={{ width: "100%" }}>
                            <table className="table">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                        <th>Nomor Resi</th>
                                        <th>Transaction Date</th>
                                        <th>Total Transactions</th>
                                        <th>Total Pay</th>
                                        <th>Proof of Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        // <div>Loading...</div>
                                        <tr>
                                            <td colSpan={5}>
                                                <Spinner animation="border" variant="dark" />
                                            </td>
                                        </tr>
                                    ) : (
                                        dataFetched?.map((data, index) => (
                                            <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                                <td>{data.ID_Transaksi}</td>
                                                <td>{data.Tanggal_Transaksi}</td>
                                                <td>{data.Total_Transaksi}</td>
                                                <td>
                                                    {data.Total_pembayaran === null || data.Total_pembayaran == 0 ? (
                                                        <Button variant="outline-danger" onClick={() => {
                                                            setShowModal(true);
                                                            setDataSendedToModal(data);
                                                        }}>Pay Now</Button>
                                                    ) : (
                                                        data.Total_pembayaran
                                                    )}
                                                </td>
                                                <td>
                                                    {data.Bukti_Pembayaran === null ? (
                                                        <Button variant="outline-danger" onClick={() => {
                                                            setShowModal(true)
                                                            setDataSendedToModal(data);
                                                        }}>
                                                            Pay Now
                                                        </Button>
                                                    ) : (
                                                        <Button variant="outline-danger" onClick={() => {
                                                            setShowModalProof(true)
                                                            setDataSendedToModal(data);
                                                        }}>
                                                            See Your Proof
                                                        </Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                                {/* <div className="PaginationDesign">
                                    <Pagination
                                        activePage={activePage}
                                        itemsCountPerPage={itemsCountPerPage}
                                        totalItemsCount={pengeluaran.length}
                                        pageRangeDisplayed={5}
                                        onChange={page => setActivePage(page)}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        prevPageText="Prev"
                                        nextPageText="Next"
                                        firstPageText="First"
                                        lastPageText="Last"
                                    />
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );    
}

export default ShowPesananView;