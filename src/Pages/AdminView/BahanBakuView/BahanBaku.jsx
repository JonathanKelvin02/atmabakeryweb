import { useEffect, useState } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { FaSearch, FaPlus } from 'react-icons/fa';
import Pagination from "react-js-pagination";

// Import Css
import '../ProductView/Product.css';
import './BahanBaku.css';

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

    useEffect(() => {
        fetchBahan();
    }, [])

    return(
        <>
            <Container className="top-container">
                <Row>
                    <Col>
                        <InputGroup style={{display:'flex'}}>
                            <input className="search" type="search" name="" id="" placeholder="Search..." />
                            <button type="button" className="search-button">
                                <FaSearch style={{ color: 'white' }} />
                            </button>
                        </InputGroup>
                    </Col>
                    <Col className="d-flex justify-content-end">
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
                                                <Button variant="outline-success">Show Products</Button>
                                            </td>
                                            <td style={{display: 'flex'}}>
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