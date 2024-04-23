import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert} from "react-bootstrap";
import { FaSearch, FaPlus } from 'react-icons/fa';
import Pagination from "react-js-pagination";
import Popup from 'reactjs-popup';

import PopUpShowRelated from '../../../Component/PopUp/PopUpForBahanBaku/PopUpContent.jsx'

// Import Css
import '../ProductView/Product.css';
import './BahanBaku.css';
import '../../../Component/PopUp/PopUpForBahanBaku/PopUp.css'

//Import API
import { GetBahanBaku } from "../../../api/apiBahanBaku";

const BahanBakuView = () => {
    const [bahan, setBahan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [activePage, setActivePage] = useState(1);
    const itemsCountPerPage = 10;

    const indexOfLastItem = activePage * itemsCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
    const currentItems = bahan.slice(indexOfFirstItem, indexOfLastItem);

    const inputCari = useRef("");

    const fetchBahan = () => {
        setIsLoading(true);
        GetBahanBaku().then((response) => {
            setBahan(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const searchToPagination = () => {
        let posisi = 0;
        for (let i = 0; i < bahan.length; i++) {
            if(bahan[i].Nama_Bahan === inputCari.current.value) {
                // console.log(inputCari.current.value);
                posisi = i;
                break;
            }
        }

        inputCari.current.value = "";
        setActivePage(Math.ceil((posisi + 1) / itemsCountPerPage));
        // console.log(Math.ceil((posisi + 1) / itemsCountPerPage));
    }

    // const passing = (bahanBakuPassing) => {
    //     console.log(bahanBakuPassing);
    // }

    useEffect(() => {
        fetchBahan();
    }, [])

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
                <Col xs={12} md={4} className="d-flex justify-content-md-end mt-3 mt-md-0">
                    <Button variant="success"><FaPlus className="mr-1" /> <b>Add Ingredients</b></Button>
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
                                        <th>Ingredients Name</th>
                                        <th>Stok</th>
                                        <th>Unit</th>
                                        <th>Related Products</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems?.map((data, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <td>{data.Nama_Bahan}</td>
                                            <td>{data.Stok}</td>
                                            <td>{data.Satuan}</td>
                                            <td>
                                                {/* <Button variant="outline-success">Show Products</Button> */}
                                                <Popup
                                                    trigger={<Button variant="outline-success">Show Product</Button>} 
                                                    position="bottom center"
                                                    className="popup-content"
                                                >
                                                    <PopUpShowRelated data={data}/>
                                                </Popup>
                                            </td>
                                            <td style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <Button style={{width:'68px', marginRight: '10px'}} variant="outline-success">Edit</Button>
                                                <Button style={{width:'68px'}} variant="success">Delete</Button>
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
                            No Ingredients Yet
                        </Alert>
                    )
                )}
            </Container>
        </>
    );
};

export default BahanBakuView;