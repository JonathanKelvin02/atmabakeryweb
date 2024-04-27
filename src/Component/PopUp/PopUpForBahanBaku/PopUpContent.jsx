import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert} from "react-bootstrap";
import { FaSearch, FaPlus } from 'react-icons/fa';

//Import API
import { GetRelatedProduct } from "../../../api/apiBahanBaku";

const PopupContent = ({ data }) => {
  const [produk, setProduk] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = window.innerWidth <= 600;
  const maxHeight = isMobile ? '16vh' : '20vh';

  const fetchProduct = () => {
    setIsLoading(true);
    GetRelatedProduct(data).then((response) => {
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
      <div className="table-responsive">
        <table className="table">
            <thead>
                <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                    <th style={{ textAlign: 'left' }}>Product Name</th>
                    <th style={{ textAlign: 'center' }}>Quantity</th>
                    <th style={{ textAlign: 'right' }}>Unit</th>
                </tr>
            </thead>
        </table>
        <div style={{ maxHeight, overflowY: 'auto' }}>
          <table className="table">
            <tbody>
              {produk?.map((data, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                      <td style={{ textAlign: 'left' }}>{data.Nama_Produk}</td>
                      <td style={{ textAlign: 'center' }}>{data.Kuantitas}</td>
                      <td style={{ textAlign: 'right' }}>{data.Satuan}</td>
                  </tr> 
              ))}
            </tbody>
          </table>
        </div>                          
      </div>
    </>
  );


};

export default PopupContent;