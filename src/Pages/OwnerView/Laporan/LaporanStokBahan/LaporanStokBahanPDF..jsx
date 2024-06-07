import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

const LaporanStokBahanPDF = (laporan) => {
  if (laporan == null) {
    toast.success("Data Kosong");
    return;
  }
  const today = new Date();
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const formattedDate = `${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;

  const pdf = new jsPDF();

  const shopData = {
    shopName: "Atma Kitchen",
    shopAddress: "Jl. CentralPark No.10 Yogyakarta",
  };

  const tableColumn = [
    { title: "Nama Bahan", dataKey: "Nama Bahan" },
    { title: "Stok", dataKey: "Stok" },
    { title: "Unit", dataKey: "Unit" },
  ];

  const tableRows = laporan.map((item) => ({
    "Nama Bahan": item.Nama_Bahan,
    Stok: item.Stok || "",
    Unit: item.Satuan || "",
  }));

  pdf.setProperties({
    title: "Laporan Stok Bahan Baku",
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
  pdf.text("Laporan Stok Bahan Baku", 14, 40);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Tanggal Cetak: ${formattedDate}`, 14, 48);

  // TABLE
  pdf.autoTable({
    columns: tableColumn,
    body: tableRows,
    startY: 56,
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

export default LaporanStokBahanPDF;
