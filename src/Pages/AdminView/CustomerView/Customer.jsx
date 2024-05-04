import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert} from "react-bootstrap";
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Popup from 'reactjs-popup';

import PopUpShowRelated from '../../../Component/PopUp/PopUpForCustomerAlamat/PopUpContent.jsx';

// Import Css
import '../ProductView/Product.css';
import './Customer.css';
import '../../../Component/PopUp/PopUp.css';

//Import API
import { GetCustomerAll, SearchGetCustomer } from "../../../api/apiCustomer.jsx";

const CustomerView = () => {
    const navigate = useNavigate();

    // Fetch, Show, and Loading Purpose
    const [bahan, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Pagination Purpose
    const [activePage, setActivePage] = useState(1);
    const itemsCountPerPage = 10;

    const indexOfLastItem = activePage * itemsCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
    const currentItems = bahan.slice(indexOfFirstItem, indexOfLastItem);

    // Search Purpose
    const inputCari = useRef("");

    // Refresh Purpose
    const [refresh, setRefresh] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        GetCustomerAll().then((response) => {
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
        SearchGetCustomer(data).then((response) => {
            setData(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })

        inputCari.current.value = "";
    }
    
    useEffect(() => {
        fetchData();
    }, [refresh])

    return(
        <>
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
                    bahan?.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                        <th>Customer Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems?.map((data, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <td>{data.Nama_Customer}</td>
                                            <td>{data.email}</td>
                                            <td>{data.Nomor_telepon}</td>
                                            <td>
                                                {/* <Button variant="outline-success">Address</Button> */}
                                                <Popup
                                                    trigger={<Button variant="outline-success">Address Customer</Button>} 
                                                    position="bottom center"
                                                    className="popup-content"
                                                >
                                                    <PopUpShowRelated data={data}/>
                                                </Popup>
                                            </td>
                                            <td>
                                                <Button variant="outline-success" onClick={() => navigate('/admin/Customer/OrderHistory', { state: { dataNow: data } })}>Order History</Button>
                                            </td>
                                        </tr> 
                                    ))}                                
                                </tbody>
                            </table>
                            <div className="PaginationDesign">
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={bahan.length}
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

export default CustomerView;