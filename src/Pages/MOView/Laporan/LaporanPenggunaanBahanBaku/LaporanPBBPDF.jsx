import jsPDF from "jspdf";
import 'jspdf-autotable';

const LaporanPBBPDF = (laporan) => {
    const pdf = new jsPDF();
    
    const shopData = {
        shopName: "Atma Kitchen",
        shopAddress: "Jl. CentralPark No.10 Yogyakarta"
    };
    
    const tableColumn = [
        { title: "Nama Bahan", dataKey: "Nama Bahan" },
        { title: "Satuan", dataKey: "Satuan" },
        { title: "Total Penggunaan", dataKey: "Total Penggunaan" },
    ];
    
    const tableRows = laporan.data.map((item) => ({
        "Nama Bahan": item.Nama_Bahan || "",
        "Satuan": item.Satuan || "",
        "Total Penggunaan": item.Total_Penggunaan || "",
    }));
    
    pdf.setProperties({
        title: "Laporan Penggunaan Bahan Baku",
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
    pdf.text("Laporan Penggunaan Bahan Baku", 14, 40);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Periode: ${laporan.Periode}`, 14, 50);
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
    });
    
    // SAVE PDF
    const pdfDataUri = pdf.output('datauristring');
    const newTab = window.open();
    newTab.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
};

export default LaporanPBBPDF;
