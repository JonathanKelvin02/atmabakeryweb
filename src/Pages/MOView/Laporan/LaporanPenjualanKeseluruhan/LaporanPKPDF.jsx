// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const LaporanPKPDF = ({laporan}) => {
//     const pdf = new jsPDF();

//     const shopData = {
//         shopName: "Atma Kitchen",
//         shopAddress: "Jl. CentralPark No.10 Yogyakarta"
//     };

//     const tableColumn = [
//         { title: "Bulan", dataKey: "Bulan" },
//         { title: "Total Penjualan", dataKey: "Total Penjualan" },
//         { title: "Total Pendapatan", dataKey: "Total Pendapatan"},
//     ];

//     const tableRows = laporan.data.map((item) => ({
//         "Bulan": item.bulan == 1 ? "Januari" : item.bulan == 2 ? "Februari" : item.bulan == 3 ? "Maret" : item.bulan == 4 ? "April" : item.bulan == 5 ? "Mei" : item.bulan == 6 ? "Juni" : item.bulan == 7 ? "Juli" : item.bulan == 8 ? "Agustus" : item.bulan == 9 ? "September" : item.bulan == 10 ? "Oktober" : item.bulan == 11 ? "November" : "Desember",
//         "Total Penjualan": item.total_penjualan || "0",
//         "Total Pendapatan": item.total_pendapatan || "0",
//     }));

//     pdf.setProperties({
//         title: "Laporan Penjualan Keseluruhan",
//     });

//     // HEADER
//     pdf.setFontSize(20);
//     pdf.setFont('helvetica', 'bold');
//     pdf.text(shopData.shopName, 14, 20);
//     pdf.setFontSize(12);
//     pdf.setFont('helvetica', 'normal');
//     pdf.text(shopData.shopAddress, 14, 28);

//     // TITLE
//     pdf.setFontSize(20);
//     pdf.setFont('helvetica', 'bold');
//     pdf.text("Laporan Penjualan Keseluruhan", 14, 40);
//     pdf.setFontSize(12);
//     pdf.setFont('helvetica', 'normal');
//     pdf.text(`Periode: ${laporan.Tahun}`, 14, 50);
//     pdf.text(`Tanggal Cetak: ${laporan.Tanggal_Cetak}`, 14, 58);

//     // TABLE
//     pdf.autoTable({
//         columns: tableColumn,
//         body: [...tableRows, { "Bulan": "Total", "Total Penjualan": {content: laporan.Total_Penjualan || "0", colSpan: 2}, "Total Pendapatan": "" }],
//         startY: 65,
//         theme: 'grid',
//         styles: {
//             cellPadding: 2,
//             fontSize: 10,
//         },
//         headStyles: {
//             fillColor: [22, 160, 133],
//         },
//     });

//     // CHART
//     // pdf.addImage(chart, 'PNG', 14, 65, 180, 100);

//     //SAVE PDF
//     const pdfDataUri = pdf.output('datauristring');
//     const newTab = window.open();
//     newTab.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
// }

// export default LaporanPKPDF;

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const LaporanPKPDF = ({ laporan }) => {
    const pdf = new jsPDF();

    const shopData = {
        shopName: "Atma Kitchen",
        shopAddress: "Jl. CentralPark No.10 Yogyakarta"
    };

    const tableColumn = [
        { title: "Bulan", dataKey: "Bulan" },
        { title: "Jumlah Transaksi", dataKey: "Total Penjualan" },
        { title: "Jumlah Uang", dataKey: "Total Pendapatan" },
    ];

    const tableRows = laporan.data.map((item) => ({
        "Bulan": item.bulan == 1 ? "Januari" : item.bulan == 2 ? "Februari" : item.bulan == 3 ? "Maret" : item.bulan == 4 ? "April" : item.bulan == 5 ? "Mei" : item.bulan == 6 ? "Juni" : item.bulan == 7 ? "Juli" : item.bulan == 8 ? "Agustus" : item.bulan == 9 ? "September" : item.bulan == 10 ? "Oktober" : item.bulan == 11 ? "November" : "Desember",
        "Total Penjualan": item.total_penjualan || "0",
        "Total Pendapatan": item.total_pendapatan || "0",
    }));

    const totalPenjualan = tableRows.reduce((acc, row) => acc + parseInt(row["Total Penjualan"] || 0), 0);
    const totalPendapatan = tableRows.reduce((acc, row) => acc + parseInt(row["Total Pendapatan"] || 0), 0);

    // Add total row
    tableRows.push({
        "Bulan": "Total",
        "Total Penjualan": totalPenjualan.toString(),
        "Total Pendapatan": totalPendapatan.toString()
    });

    pdf.setProperties({
        title: "Laporan Penjualan Keseluruhan",
    });

    // HEADER
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(shopData.shopName, 14, 20);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(shopData.shopAddress, 14, 28);

    // TITLE
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text("Laporan Penjualan Bulanan", 14, 40);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Tahun: ${laporan.Tahun}`, 14, 50);
    pdf.text(`Tanggal Cetak: ${laporan.Tanggal_Cetak}`, 14, 58);

    // TABLE
    pdf.autoTable({
        columns: tableColumn,
        body: tableRows,
        startY: 65,
        theme: 'grid',
        styles: {
            cellPadding: 2,
            fontSize: 10,
        },
        headStyles: {
            fillColor: [22, 160, 133],
        },
        didDrawCell: (data) => {
            if (data.row.index === tableRows.length - 1) {
                if (data.column.index === 0) {
                    pdf.setFont('helvetica', 'bold');
                }
            }
        },
        willDrawCell: (data) => {
            if (data.row.index === tableRows.length - 1) {
                if (data.column.index === 0) {
                    data.cell.styles.fontStyle = 'bold';
                }
            }
        }
    });

    // SAVE PDF
    const pdfDataUri = pdf.output('datauristring');
    const newTab = window.open();
    newTab.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
}

export default LaporanPKPDF;
