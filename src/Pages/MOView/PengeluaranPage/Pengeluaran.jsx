import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert} from "react-bootstrap";
import { FaSearch, FaPlus } from 'react-icons/fa';
import Pagination from "react-js-pagination";
import Popup from 'reactjs-popup';

import PengeluaranModal from "../../../Component/Modal/PengeluaranModal/PengeluaranModal";
import DeleteModal from "../../../Component/Modal/DeleteConfirmationModal";

// Import Css
import '../../AdminView/ProductView/Product.css';
import '../../AdminView/PenitipPage/Penitip.css';

//Import API
import { GetAllPengeluaran, DeletePengeluaran, SearchPengeluaran } from "../../../api/apiPengeluaran";

const PenitipView = () => {
    // Fetch, Show, and Loading Purpose
    const [pengeluaran, setPengeluaran] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Pagination Purpose
    const [activePage, setActivePage] = useState(1);
    const itemsCountPerPage = 10;

    const indexOfLastItem = activePage * itemsCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
    const currentItems = pengeluaran.slice(indexOfFirstItem, indexOfLastItem);

    // Search Purpose
    const inputCari = useRef("");

    // Refresh Purpose
    const [refresh, setRefresh] = useState(false);

    // Update Purpose
    const [isUpdate, setIsUpdate] = useState(false);
    const [editData, setEditData] = useState(null);

    // Delete Purpose
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [deletedData, setDeletedData] = useState(null);

    const fetchPengeluaran = () => {
        setIsLoading(true);
        GetAllPengeluaran().then((response) => {
            setPengeluaran(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const deletePengeluaran = (deletedData) => {
        DeletePengeluaran(deletedData).then((response) => {
            console.log(response);
            setShowDeleteModal(false);
            setRefresh(oldRefresh => !oldRefresh);
        }).catch((err) => {
            console.log(err);
            setShowDeleteModal(false);
        })
    }

    const searchToPagination = () => {
        const newData = {
            Nama: inputCari.current.value
        }

        if(inputCari.current.value === ""){
            fetchPengeluaran();
        }else{
            setIsLoading(true);
            SearchPengeluaran(newData).then((response) => {
                setPengeluaran(response);
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
        }

        inputCari.current.value = "";
    }
    
    useEffect(() => {
        fetchPengeluaran();
    }, [refresh])

    useEffect(() => {
        if (deleteConfirmation) {
            deletePengeluaran(deletedData);
            setRefresh(refresh => !refresh);
            setDeleteConfirmation(false);
        }
    }, [deleteConfirmation]);

    return(
        <>
            {showModal && <PengeluaranModal show={showModal} onClose={() => setShowModal(false)} onRefresh={() => setRefresh(oldRefresh => !oldRefresh)} initialData={editData} isUpdate={isUpdate} />}
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
                    <Button onClick={() => { setShowModal(true); setIsUpdate(false); setEditData(null)}} variant="success"><FaPlus className="mr-1" /> <b>Add Expense Data</b></Button>
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
                    pengeluaran?.length > 0 ? (

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                        <th>Expenditure name</th>
                                        <th>Price</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems?.map((data, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <td>{data.Nama}</td>
                                            <td>{data.Harga}</td>
                                            <td>{data.Tanggal}</td>
                                            <td style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <Button style={{width:'68px', marginRight: '10px'}} variant="outline-success" onClick={() => { setShowModal(true); setIsUpdate(true); setEditData(data) }}>Edit</Button>
                                                <Button style={{width:'68px'}} variant="danger" onClick={() => { setShowDeleteModal(true); setEditData(data); setDeletedData(data); }}>Delete</Button>
                                            </td>
                                        </tr> 
                                    ))}
                                </tbody>
                            </table>
                                <div className="PaginationDesign">
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
                                </div>
                        </div>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Expenses Yet
                        </Alert>
                    )
                )}
            </Container>
        </>
    );
};

export default PenitipView;