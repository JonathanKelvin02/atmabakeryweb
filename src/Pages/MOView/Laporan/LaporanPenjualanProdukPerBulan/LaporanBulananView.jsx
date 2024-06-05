import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Form,
  Alert,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// Import API
import { LaporanPenjualanBulanan } from "../../../../api/apiTransaksi";
import LaporanBulananPDF from "./LaporanBulananPDF";
import { format } from "@cloudinary/url-gen/actions/delivery";

const LaporanBulananView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [date, setDate] = useState({
    bulan: '',
    tahun: ''
  });
  
  const initialDate = new Date();
  const [transaksi, setTransaksi] = useState([]);

  const handleDateChange = (date) => {
    setStartDate(date);
    getMonthAndYearFromDate(date);
  };

  const generatePDF = (transaksi) => {
    LaporanBulananPDF(transaksi);
  }

  const getMonthAndYearFromDate = (date) => {
    const Bulan = date.getMonth() + 1; // Months are zero-based, so add 1
    const Tahun = date.getFullYear();
    setDate({
        ...date,
        bulan: Bulan,
        tahun: Tahun
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    LaporanPenjualanBulanan(date)
      .then((response) => {
        setIsLoading(false);
        setTransaksi(response);
        console.log(response);
        setDisabled(false);
        toast.success("Data Laporan berhasil diambil");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  console.log("Transaksi", transaksi);

  return (
    <>
      <h2 className="m-2 text-center">
        <b>Laporan Penjualan Bulanan</b>
      </h2>
      <hr className="m-2" />

      <div className="d-flex justify-content-between align-text-center">
        <Form className="m-2" onSubmit={handleSubmit}>
          <DatePicker
            showIcon
            selected={startDate}
            maxDate={initialDate}
            onChange={(date) => handleDateChange(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="rounded-start"
            required
          />
          <Button type="submit" variant="dark" className="rounded-end">
            Tampilkan
          </Button>
        </Form>
        <Button
          className="m-2 d-grip"
          variant="success"
          disabled={disabled}
          onClick={() => generatePDF(transaksi)}
        >
          Create PDF
        </Button>
      </div>
      <hr className="m-2 mt-3" />
    </>
  );
};

export default LaporanBulananView;
