import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert} from "react-bootstrap";
import { FaSearch, FaPlus } from 'react-icons/fa';
import Pagination from "react-js-pagination";
import Popup from 'reactjs-popup';

import PopUpShowRelated from '../../../Component/PopUp/PopUpForPenitip/PopUpContent.jsx';
import BahanBakuModal from "../../../Component/Modal/PenitipModal/PenitipModal.jsx";
import DeleteModal from "../../../Component/Modal/DeleteConfirmationModal.jsx";

// Import Css
import '../ProductView/Product.css';
import './Penitip.css';
import '../../../Component/PopUp/PopUpForBahanBaku/PopUp.css';

//Import API
import { DeleteBahanBaku } from "../../../api/apiBahanBaku";
import { GetAllPenitip, DeletePenitip } from "../../../api/apiPenitip";

const PenitipView = () => {
    // Fetch, Show, and Loading Purpose
    const [bahan, setBahan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    // Update Purpose
    const [isUpdate, setIsUpdate] = useState(false);
    const [editData, setEditData] = useState(null);

    // Delete Purpose
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchBahan = () => {
        setIsLoading(true);
        GetAllPenitip().then((response) => {
            setBahan(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const deleteBahan = (idValue) => {
        DeletePenitip(idValue).then((response) => {
            console.log(response);
            setShowDeleteModal(false);
            setRefresh(oldRefresh => !oldRefresh);
        }).catch((err) => {
            console.log(err);
            setShowDeleteModal(false);
        })
    }

    const searchToPagination = () => {
        let posisi = 0;
        for (let i = 0; i < bahan.length; i++) {
            if(bahan[i].Nama_Penitip === inputCari.current.value) {
                posisi = i;
                break;
            }
        }

        inputCari.current.value = "";
        setActivePage(Math.ceil((posisi + 1) / itemsCountPerPage));
    }
    
    useEffect(() => {
        fetchBahan();
    }, [refresh])

    useEffect(() => {
        if (deleteConfirmation) {
            deleteBahan(deleteId);
            setRefresh(refresh => !refresh);
            setDeleteConfirmation(false);
        }
    }, [deleteConfirmation]);

    return(
        <>
            {showModal && <BahanBakuModal show={showModal} onClose={() => setShowModal(false)} onRefresh={() => setRefresh(oldRefresh => !oldRefresh)} initialData={editData} isUpdate={isUpdate} />}
            {showDeleteModal && <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} initialData={editData} onConfirm={setDeleteConfirmation}/>}

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
                    <Button onClick={() => { setShowModal(true); setIsUpdate(false); setEditData(null); }} variant="success"><FaPlus className="mr-1" /> <b>Add Depositor Data</b></Button>
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
                                        <th>Depositor Name</th>
                                        <th>Related Products</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems?.map((data, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <td>{data.Nama_Penitip}</td>
                                            <td>
                                                {/* <Button variant="outline-success">Show Products</Button> */}
                                                <Popup
                                                    trigger={<Button variant="outline-success">Entrusted Goods</Button>} 
                                                    position="bottom center"
                                                    className="popup-content"
                                                >
                                                    <PopUpShowRelated data={data}/>
                                                </Popup>
                                            </td>
                                            <td style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <Button style={{width:'68px', marginRight: '10px'}} variant="outline-success" onClick={() => { setShowModal(true); setIsUpdate(true); setEditData(data) }}>Edit</Button>
                                                <Button style={{width:'68px'}} variant="danger" onClick={() => { setShowDeleteModal(true); setEditData(data); setDeleteId(data.ID_Penitip) }}>Delete</Button>
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
                            No Depositors Yet
                        </Alert>
                    )
                )}
            </Container>
        </>
    );
};

export default PenitipView;