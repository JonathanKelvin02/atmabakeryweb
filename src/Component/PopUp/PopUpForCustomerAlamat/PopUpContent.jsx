import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Spinner, Button, Row, Col, InputGroup, Alert} from "react-bootstrap";
import { FaSearch, FaPlus } from 'react-icons/fa';

//Import API
import { GetAlamatSpesificCustomer } from "../../../api/apiAlamat";

const PopupContent = ({ data }) => {
  const [dataInside, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = window.innerWidth <= 600;
  const maxHeight = isMobile ? '16vh' : '20vh';

  const fetchData = () => {
    setIsLoading(true);
    GetAlamatSpesificCustomer(data).then((response) => {
      setData(response);
      setIsLoading(false);
    }).catch((err) => {
        console.log(err);
        setIsLoading(false);
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div className="table-responsive">
        <table className="table">
            <thead>
                <tr style={{ borderBottom: '1px solid #EDEEF2' }}>
                    <th style={{ textAlign: 'left' }}>Address</th>
                    <th style={{ textAlign: 'right' }}>Distance</th>
                </tr>
            </thead>
        </table>
        <div style={{ maxHeight, overflowY: 'auto' }}>
          <table className="table">
            <tbody>
              {dataInside?.map((data, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #EDEEF2' }}>
                      <td style={{ textAlign: 'left' }}>{data.Alamat}</td>
                      <td style={{ textAlign: 'center' }}>{data.Jarak || 0}</td>
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