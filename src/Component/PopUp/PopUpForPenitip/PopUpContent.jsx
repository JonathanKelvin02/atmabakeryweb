import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert} from "react-bootstrap";
import { FaSearch, FaPlus } from 'react-icons/fa';

//Import API
import { GetProductBySpesificPenitip } from "../../../api/apiPenitip";

const PopupContent = ({ data }) => {
  const [produk, setProduk] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = window.innerWidth <= 600;
  const maxHeight = isMobile ? '28vh' : '40vh';

  const fetchProduct = () => {
    setIsLoading(true);
    GetProductBySpesificPenitip(data).then((response) => {
      setProduk(response);
      setIsLoading(false);
    }).catch((err) => {
        console.log(err);
        setIsLoading(false);
    })
  }

  useEffect(() => {
    fetchProduct();
  }, [])

  return (
    <>
      <div className="table-responsive" style={{ maxHeight, overflowY: 'auto' }}>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
              <table className="table">
                  <thead>
                      <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                          <th style={{ textAlign: 'left' }}>Product Name</th>
                          <th style={{ textAlign: 'right' }}>Buying Price</th>
                          <th style={{ textAlign: 'right' }}>Selling Price</th>
                          <th style={{ textAlign: 'right' }}>Unit</th>
                      </tr>
                  </thead>
                  <tbody>
                      {produk?.map((data, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                              <td style={{ textAlign: 'left' }}>{data.Nama_Produk}</td>
                              <td style={{ textAlign: 'right' }}>{data.Harga_Beli}</td>
                              <td style={{ textAlign: 'right' }}>{data.Harga}</td>
                              <td style={{ textAlign: 'right' }}>{data.Stok}</td>
                          </tr> 
                      ))}
                  </tbody>
              </table>
            )}
        </div>
      </>
  );
};

export default PopupContent;