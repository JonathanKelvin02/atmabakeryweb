import React, { useEffect, useState } from "react";
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// Import API
import { GetBahanBaku } from "../../../../api/apiBahanBaku";
import LaporanStokBahanPDF from "./LaporanStokBahanPDF.";

const OwnerLaporanStokBahan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bahanbaku, setBahanBaku] = useState([]);

  const fetchBahan = () => {
    setIsLoading(true);
    GetBahanBaku()
      .then((response) => {
        setBahanBaku(response);
        setIsLoading(false);
        setDisabled(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const generatePDF = (data) => {
    LaporanStokBahanPDF(data);
    setDisabled(true);
  };

  useEffect(() => {
    fetchBahan();
  }, []);

  return (
    <>
      <h2 className="m-2 text-center">
        <b>Laporan Stok Bahan</b>
      </h2>
      <hr className="m-2" />

      <div className="d-flex justify-content-between align-text-center">
        <Button
          className="m-2 d-grip"
          variant="success"
          disabled={disabled}
          onClick={() => generatePDF(bahanbaku)}
        >
          Create PDF
        </Button>
      </div>
      <hr className="m-2 mt-3" />
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
        ) : bahanbaku?.length > 0 ? (
          <Container className="list-product">
            <table className="table">
              <thead>
                <tr style={{ borderBottom: "1px solid #EDEEF2" }}>
                  <th>Ingredients Name</th>
                  <th>Stok</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {bahanbaku?.map((data, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #EDEEF2" }}>
                    <td>{data.Nama_Bahan}</td>
                    <td>{data.Stok}</td>
                    <td>{data.Satuan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </Container>
        ) : (
          <Alert variant="dark" className="mt-3 text-center">
            No Ingredients Yet
          </Alert>
        )}
      </Container>
    </>
  );
};

export default OwnerLaporanStokBahan;
