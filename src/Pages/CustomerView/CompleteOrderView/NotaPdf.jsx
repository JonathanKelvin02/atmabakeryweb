import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatRupiah } from "../../../Component/Currency/FormatCurency";
import { pdf } from "@cloudinary/url-gen/qualifiers/format";

const calculatePoints = (total) => {
  let poin = 0;

  // Setiap pemesanan dengan kelipatan 1.000.000 mendapatkan 200 poin
  poin += Math.floor(total / 1000000) * 200;
  total %= 1000000;

  // Setiap pemesanan dengan kelipatan 500.000 mendapatkan 75 poin.
  poin += Math.floor(total / 500000) * 75;
  total %= 500000;

  // Setiap pemesanan dengan kelipatan 100.000 mendapatkan 15 poin.
  poin += Math.floor(total / 100000) * 15;
  total %= 100000;

  // Setiap pemesanan dengan kelipatan 10.000 mendapatkan 1 poin.
  poin += Math.floor(total / 10000);

  return poin;
};

const calculateTotalHarga = (trans) => {
  const totalSubTotal = trans.products.reduce(
    (acc, product) => acc + product.pivot.Sub_Total,
    0
  );
  return totalSubTotal;
};

const calculateUsedPoints = (trans) => {
  const totalSubTotal = trans.products.reduce(
    (acc, product) => acc + product.pivot.Sub_Total,
    0
  );
  const remainingTotal = trans.Total_Transaksi - totalSubTotal;
  const points = Math.floor(remainingTotal / 100);
  return points;
};

const PdfGenerator = (trans) => {
  const pdf = new jsPDF();
  // Adding title and transaction details

  const shopData = {
    shopName: "Atma Kitchen",
    shopAddress: "Jl. CentralPark No.10 Yogyakarta",
  };

  // const calculateDaysBetween = (date1, date2) => {
  //     const oneDay = 23 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  //     return Math.round(Math.abs((date1 - date2) / oneDay));
  // };

  pdf.setProperties({
    title: "Nota",
  });

  //Atur Nama Shop
  pdf.setFontSize(14);
  pdf.setFont("custom", "bold");
  pdf.text("Atma Kitchen", 13, 20);
  pdf.setFont("custom", "normal");
  pdf.text("Jl. CentralPark No.10 Yogyakarta", 13, 25);

  //Atur garis
  pdf.setLineWidth(0.1);
  pdf.setDrawColor(200, 200, 200);
  pdf.line(10, 30, 200, 30);

  //Atur Data Transaksi
  pdf.setFont("custom", "bold");
  pdf.text(`No Nota               : ${trans.ID_Transaksi}`, 13, 40);
  pdf.setFont("custom", "normal");

  pdf.text(`Tanggal pesan      : ${trans.Tanggal_Transaksi}`, 13, 48);
  pdf.text(`Lunas pada           : ${trans.Tanggal_Pelunasan}`, 13, 55);
  pdf.text(`Tanggal Ambil     : ${trans.Tanggal_Ambil}`, 13, 62);

  //Atur garis
  pdf.setLineWidth(0.1);
  pdf.setDrawColor(200, 200, 200);
  pdf.line(10, 66, 200, 66);

  //Atur Data Customer
  pdf.setFont("custom", "bold");
  pdf.text(
    `Customer  : ${trans.tblcustomer.email} / ${trans.tblcustomer.Nama_Customer}`,
    13,
    72
  );
  pdf.setFont("custom", "normal");
  pdf.text(`${trans.tblalamat.Alamat}`, 13, 79);
  pdf.text(`Delivery : ${trans.tbljenispengiriman.Nama_Pengiriman}`, 13, 86);

  //Atur garis
  pdf.setLineWidth(0.1);
  pdf.setDrawColor(200, 200, 200);
  pdf.line(10, 88, 200, 88);

  //Atur Products
  //loop through the products
  const columns = [
    { title: "Kuantitas", dataKey: "Kuantitas" },
    { title: "Nama Produk", dataKey: "Nama_Product" },
    { title: "Tipe", dataKey: "Tipe" },
    { title: "Harga", dataKey: "Harga" },
  ];

  const productRows = trans.products.map((product) => ({
    Kuantitas: product.pivot.Kuantitas,
    Nama_Product: product.Nama_Produk,
    Tipe: product.pivot.Tipe,
    Harga: product.pivot.Sub_Total,
  }));

  const columnWidths = [13, 100, 30, 50];

  pdf.autoTable({
    body: productRows.map((row) => columns.map((col) => row[col.dataKey])),
    startY: 90,
    columnStyle: {
      0: { cellWidth: columnWidths[0] },
      1: { cellWidth: columnWidths[1] },
      2: { cellWidth: columnWidths[2] },
      3: { cellWidth: columnWidths[3] },
    },
    alternateRowStyles: { fillColor: [255, 255, 255] },
    bodyStyles: {
      fontSize: 12,
      font: "Newsreader",
      cellPadding: { top: 1, right: 5, bottom: 1, left: 2 },
      textColor: [0, 0, 0],
      rowPageBreak: "avoid",
    },
  });

  //Atur garis
  pdf.setLineWidth(0.1);
  pdf.setDrawColor(200, 200, 200);
  pdf.line(10, 105, 200, 105);

  pdf.setFont("custom", "normal");
  const subTotal = calculateTotalHarga(trans);
  pdf.text(
    `Total                                                                                            ${subTotal}`,
    13,
    pdf.previousAutoTable.finalY + 10
  );
  pdf.text(
    `Ongkos Kirim (rad. ${
      trans.tblalamat.Jarak
    } km)                                                           ${
      trans.ID_JenisPengiriman === 3 ? trans.tblalamat.Biaya : 0
    }`,
    13,
    pdf.previousAutoTable.finalY + 17
  );
  pdf.text(
    `Total                                                                                            ${
      subTotal + (trans.ID_JenisPengiriman === 3 ? trans.tblalamat.Biaya : 0)
    }`,
    13,
    pdf.previousAutoTable.finalY + 24
  );
  const usedPoints = calculateUsedPoints(trans);
  pdf.text(
    `Potongan ${usedPoints} poin                                                                     ${
      usedPoints * 100
    }`,
    13,
    pdf.previousAutoTable.finalY + 32
  );
  pdf.text(
    `Total                                                                                             ${trans.Total_Bayar}`,
    13,
    pdf.previousAutoTable.finalY + 39
  );

  const points = calculatePoints(trans.Total_Transaksi);

  // if (trans.tblcustomer.Tanggal_Lahir) {
  //     const currentDate = new Date(trans.Tanggal_Transaksi);
  //     const birthDate = new Date(trans.tblcustomer.Tanggal_Lahir);

  //     // Set the birth date year to the current year for comparison
  //     birthDate.setFullYear(currentDate.getFullYear());

  //     const daysDiff = calculateDaysBetween(currentDate, birthDate);

  //     if (daysDiff <= 3 && daysDiff >= -3) {
  //         points *= 2; // Double the points if within the birthday range
  //     }
  // }

  pdf.text(
    `Poin dari pesanan ini: ${points}`,
    13,
    pdf.previousAutoTable.finalY + 50
  );
  pdf.text(
    `Total poin customer : ${trans.tblcustomer.Poin + points}`,
    13,
    pdf.previousAutoTable.finalY + 57
  );

  //doc.save(`Nota_${trans.ID_Transaksi}.pdf`);

  const pdfDataUri = pdf.output("datauristring");
  const newTab = window.open();
  newTab?.document.write(
    `<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`
  );
};

export default PdfGenerator;
