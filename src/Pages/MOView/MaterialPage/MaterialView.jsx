import { useEffect, useState } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

//Import API
import { GetAllMaterialUse } from "../../../api/apiBahanBaku";

const MaterialView = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [material, setMaterial] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchMaterial = () => {
        setIsLoading(true);
        GetAllMaterialUse().then((response) => {
            setMaterial(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchMaterial();
    }, [])

    return(
        <>
            <Container className="top-container">
                <Row>
                    <Col>
                        <InputGroup>
                            <input className="search" type="search" name="" id="" placeholder="Search Material Name..." onChange={(e) => setSearch(e.target.value)} />
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
                    material?.length > 0 ? (
                        <>
                            <Container className="list-product">
                                <table>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <th>Tanggal</th>
                                            <th>Nama Bahan</th>
                                            <th>Kuantitas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {material?.filter((item) => {
                                            return search.toLowerCase() === '' 
                                            ? item 
                                            : item.tblbahanbaku.Nama_Bahan.toLowerCase().includes(search.toLowerCase());
                                        }).map((raw) => (
                                            <tr key={raw.ID_Produk} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                                <td>{raw.Tanggal}</td>
                                                <td>{raw.tblbahanbaku.Nama_Bahan}</td>
                                                <td>{raw.Kuantitas}</td>
                                            </tr> 
                                        ))}
                                        
                                    </tbody>
                                </table>
                            </Container>
                        </>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Material Use Yet
                        </Alert>
                    )
                )}
            </Container>
        </>
    );
};

export default MaterialView;