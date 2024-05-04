import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert} from "react-bootstrap";
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination";

import ModalTransaksi from '../../../Component/Modal/OrderHistoryModal/TransaksiDetailModal.jsx';
// import ModalReceipt from '../../../Component/Modal/OrderHistoryModal/NotaModal.jsx';

//Import API
import { GetCustomerHistoryByID } from "../../../api/apiCustomer.jsx";

const OrderHistoryView = () => {
    // Import Data Using Location
    const location = useLocation();
    const dataNow = location.state.dataNow;

    // Modal Purpose
    const [showModalTransaction, setShowModalTransaction] = useState(false);
    const [showModalReceipt, setShowModalReceipt] = useState(false);
    const [modalData, setModalData] = useState({});

    // Fetch, Show, and Loading Purpose
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Pagination Purpose
    const [activePage, setActivePage] = useState(1);
    const itemsCountPerPage = 10;

    const indexOfLastItem = activePage * itemsCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
    // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const currentItems = data?.tbltransaksi?.slice(indexOfFirstItem, indexOfLastItem);

    // Search Purpose
    const inputCari = useRef("");

    // Refresh Purpose
    const [refresh, setRefresh] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        GetCustomerHistoryByID(dataNow.ID_Customer).then((response) => {
            setData(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const searchToPagination = () => {
        const data = {
            search: inputCari.current.value
        }

        console.log(data);

        // setIsLoading(true);
        // SearchGetCustomer(data).then((response) => {
        //     setData(response);
        //     setIsLoading(false);
        // }).catch((err) => {
        //     console.log(err);
        //     setIsLoading(false);
        // })

        inputCari.current.value = "";
    }
    
    useEffect(() => {
        fetchData();
    }, [refresh])

    return(
        <>
            {showModalTransaction && <ModalTransaksi show={showModalTransaction} onClose={() => setShowModalTransaction(false) } data={modalData}/>}

            <Container className="top-container">
                <Row>
                    <Col xs={12} md={8}>
                        <InputGroup style={{display:'flex', flexDirection: 'row', width: '100%'}}>
                            <input className="search" type="search" name="" id="" placeholder="Search..." style={{flexGrow: 1}} ref={inputCari}/>
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
                    data?.tbltransaksi?.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                        <th>Receipt Number</th>
                                        <th>Total Transaction</th>
                                        <th>Total Payment</th>
                                        <th>Transaction Details</th>
                                        <th>Print Receipt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems?.map((data, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <td>{data.ID_Transaksi}</td>
                                            <td>{data.Total_Transaksi}</td>
                                            <td>{data.Total_pembayaran}</td>
                                            <td>
                                                <Button variant="outline-success" onClick={() => { setShowModalTransaction(true); setModalData(data); }}>Transaction Details</Button>
                                            </td>
                                            <td>
                                                <Button variant="outline-success" >Receipt</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="PaginationDesign">
                                {/* <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={data.length}
                                    pageRangeDisplayed={5}
                                    onChange={page => setActivePage(page)}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    prevPageText="Prev"
                                    nextPageText="Next"
                                    firstPageText="First"
                                    lastPageText="Last"
                                /> */}
                            </div>                            
                        </div>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Order History Yet
                        </Alert>
                    )
                )}
            </Container>
        </>
    );
};

export default OrderHistoryView;