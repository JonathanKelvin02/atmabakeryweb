import { useEffect, useState } from "react";
import { Container, Spinner, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

// Import Css
import './Product.css';

//Import API
import { GetAllHampers, GetAllRecipe } from "../../../api/apiProduk";

const HampersView = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [resep, setResep] = useState([]);
    
    const fetchProducts = () => {
        setIsLoading(true);
        GetAllHampers().then((response) => {
            setProducts(response);
            setIsLoading(false);
            console.log(products);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const getAllRecipe = async () => {
        setIsLoading(true);
        await GetAllRecipe().then((response) => {
            setResep(response);
            setIsLoading(false);
            console.log(resep);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchProducts();
        getAllRecipe();
    }, [])

    return(
        <>
            <Container className="top-container">
                <Row>
                    <Col>
                        <InputGroup>
                            <input className="search" type="search" name="" id="" placeholder="Search..." />
                            <button type="button" className="search-button">
                                <FaSearch style={{ color: 'white' }} />
                            </button>
                        </InputGroup>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <button className="add-product border-0" type="button" onClick={() => navigate('/admin/create-hampers')}>
                            <FaPlus className="mr-1" /> <b>Add Product</b>
                        </button>
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
                    products?.length > 0 && resep?.length > 0 ? (
                        <Container className="list-product">
                            <table>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Limit/Day</th>
                                        <th>Product List</th>
                                        <th>Quantity</th>
                                        <th style={{ width: '20%'}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map((hampers, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                                            <td>{hampers.tblproduk.Nama_Produk}</td>
                                            <td>Rp.{hampers.tblproduk.Harga}</td>
                                            <td>{hampers.tblproduk.Stok}</td>
                                            <td>
                                                <ul className="m-0 p-0" style={{listStyleType: 'none'}}>
                                                    {/* loading here */}
                                                    {hampers.resep.map((myresep, index) => (
                                                        <li key={index}>{resep.find(recipe => recipe.ID_Produk === myresep.ID_Produk)?.tblproduk.Nama_Produk}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>
                                                <ul className="m-0 p-0" style={{listStyleType: 'none'}}>
                                                    {/* loading here */}
                                                    {hampers.resep.map((myresep, index) => (
                                                        <li key={index}>
                                                            {myresep.pivot.Kuantitas}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>
                                                <button className="edit-action">Edit</button>
                                                <button className="delete-action">Delete</button>
                                            </td>
                                        </tr> 
                                    ))}
                                    
                                </tbody>
                            </table>
                        </Container>
                    ) : (
                        <Alert variant="dark" className="mt-3 text-center">
                            No Products Yet
                        </Alert>
                    )
                )}
            </Container>
        </>
    );
};

export default HampersView;