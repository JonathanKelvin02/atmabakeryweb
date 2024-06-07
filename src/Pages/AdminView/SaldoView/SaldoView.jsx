import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert} from "react-bootstrap";
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';

import PopUpShowRelated from '../../../Component/PopUp/PopUpForCustomerAlamat/PopUpContent.jsx';
import ApproveModal from "../../../Component/Modal/AdminSaldoModal/ApproveModal.jsx";
import RejectModal from "../../../Component/Modal/AdminSaldoModal/RejectModal.jsx";

// Import Css
import '../ProductView/Product.css';
import '../../../Component/PopUp/PopUp.css';

//Import API
import { GetAllHistorySaldo, AcceptSaldo, RejectSaldo } from "../../../api/apiHistorySaldo.jsx";

const SaldoView = () => {
    const navigate = useNavigate();
    const[showFirstModal, setShowFirstModal] = useState(false);
    const[showSecondModal, setShowSecondModal] = useState(false);
    const[initialData, setInitialData] = useState({});

    // Fetch, Show, and Loading Purpose
    const [dataFetch, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Pagination Purpose
    const [activePage, setActivePage] = useState(1);
    const itemsCountPerPage = 10;

    const indexOfLastItem = activePage * itemsCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
    const currentItems = dataFetch.slice(indexOfFirstItem, indexOfLastItem);

    // Search Purpose
    const inputCari = useRef("");

    // Refresh Purpose
    const [refresh, setRefresh] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        GetAllHistorySaldo().then((response) => {
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

        if(inputCari.current.value === ""){
            fetchData();
            return;
        }

        setIsLoading(true);
        // SearchGetCustomer(data).then((response) => {
        //     setData(response);
        //     toast.success("Customer Data Searched Successfully");
        //     setIsLoading(false);
        // }).catch((err) => {
        //     console.log(err);
        //     toast.error("Customer Data Searched Failed");
        //     setIsLoading(false);
        // })

        inputCari.current.value = "";
    }

    const AdminAcceptSaldo = (id) => {
        console.log(id);

        AcceptSaldo(id).then((response) => {
            toast.success("Saldo Accepted Successfully");
        }).catch((err) => {
            console.log(err);
        })

        setRefresh(!refresh);
    }

    const AdminRejectSaldo = (id) => {
        console.log(id);

        RejectSaldo(id).then((response) => {
            toast.success("Saldo Rejected Successfully");
        }).catch((err) => {
            console.log(err);
        })

        setRefresh(!refresh);
    }
    
    useEffect(() => {
        fetchData();
    }, [refresh])

    return(
        <>
            {showFirstModal && <ApproveModal show={showFirstModal} onClose={() => setShowFirstModal(false)} initialData={initialData} />}
            {showSecondModal && <RejectModal show={showSecondModal} onClose={() => setShowSecondModal(false)} initialData={initialData} />}

            <Container className="top-container">
                <Row>
                    <Col xs={12} md={8}>
                        <InputGroup style={{display:'flex', flexDirection: 'row', width: '100%'}}>
                            <input className="search" type="search" name="" id="" placeholder="Search..." style={{flexGrow: 1}} ref={inputCari}/>
                            <button type="button" className="search-button" onClick={() => searchToPagination()}>
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
                    dataFetch?.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                        <th>Customer Name</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems?.map((data, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <td>{data.tblcustomer.Nama_Customer}</td>
                                            <td>{data.Tanggal}</td>
                                            <td>{data.Total}</td>
                                            <td style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <Button style={{marginRight: '10px'}} variant="outline-success" onClick={() => {
                                                    setShowFirstModal(true);
                                                    setInitialData(data);
                                                }}>Approve</Button>
                                                <Button variant="danger" onClick={() => {
                                                    setShowSecondModal(true);
                                                    setInitialData(data);
                                                }}>Reject</Button>
                                            </td>
                                        </tr> 
                                    ))}                                
                                </tbody>
                            </table>
                            <div className="PaginationDesign">
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={dataFetch.length}
                                    pageRangeDisplayed={5}
                                    onChange={page => setActivePage(page)}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    prevPageText="Prev"
                                    nextPageText="Next"
                                    firstPageText="First"
                                    lastPageText="Last"
                                />
                            </div>                            
                        </div>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Customer Yet
                        </Alert>
                    )
                )}
            </Container>
        </>
    );
};

export default SaldoView;