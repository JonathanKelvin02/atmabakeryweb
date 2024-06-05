import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

const LaporanBulananPDF = (laporan) => {
  if (laporan == null) {
    toast.success("Data Kosong");
    return;
  }
  const pdf = new jsPDF();

  const shopData = {
    shopName: "Atma Kitchen",
    shopAddress: "Jl. CentralPark No.10 Yogyakarta",
  };

  const tableColumn = [
    { title: "Nama Produk", dataKey: "Nama Produk" },
    { title: "Jumlah Terjual", dataKey: "Jumlah Terjual" },
    { title: "Pendapatan", dataKey: "Pendapatan" },
  ];

  const tableRows = Object.entries(laporan.data).map(([productName, item]) => ({
    "Nama Produk": productName,
    "Jumlah Terjual": item.total_terjual || "",
    Pendapatan: item.total_pendapatan || "",
  }));

  pdf.setProperties({
    title: "Laporan Perjualan Bulanan",
  });

  // HEADER
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  pdf.text(shopData.shopName, 14, 20);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(shopData.shopAddress, 14, 28);

  // TITLE
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  pdf.text("Laporan Penjualan Bulanan", 14, 40);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Bulan/Tahun: ${laporan.Bulan}/${laporan.Tahun}`, 14, 50);
  pdf.text(`Tanggal Cetak: ${laporan.Tanggal_Cetak}`, 14, 58);
  pdf.text(`Total Pendapatan : ${laporan.Total_Penjualan}`, 14, 66);

  // TABLE
  pdf.autoTable({
    columns: tableColumn,
    body: tableRows,
    startY: 72,
    theme: "grid",
    styles: {
      cellPadding: 2,
      fontSize: 10,
    },
    headStyles: {
      fillColor: [22, 160, 133],
    },
  });

  // SAVE PDF
  const pdfDataUri = pdf.output("datauristring");
  const newTab = window.open();
  newTab.document.write(
    `<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`
  );
};

export default LaporanBulananPDF;
