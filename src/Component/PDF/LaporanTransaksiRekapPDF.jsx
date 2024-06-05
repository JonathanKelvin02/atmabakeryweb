import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    mainAtmaText: {
        fontSize: 12,
        fontWeight: 900,
        color: 'black',
        marginLeft: "10px",
        marginTop: "10px",
    },
    subAtmaText: {
        fontSize: 10,
        color: 'black',
        marginLeft: "10px",
        marginTop: "5px",
    },

    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000000",
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        flexDirection: "row"
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000000",
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10
    }
});

const LaporanTransaksiPenitip = ({ initialData }) => {

    if (!initialData || initialData.length === 0) {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.mainAtmaText}>
                        <Text>Error: Data not available</Text>
                    </View>
                </Page>
            </Document>
        );
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.mainAtmaText}>
                    <Text>Atma Kitchen</Text>
                </View>
                <View style={styles.subAtmaText}>
                    <Text>Jl. Centralpark No. 10 Yogyakarta</Text>
                </View>

                {initialData.data.map((penitip, index) => (
                    <React.Fragment key={index}>

                        <View style={{ ...styles.mainAtmaText, marginTop: "20px" }}>
                            <Text>LAPORAN TRANSAKSI PENITIP</Text>
                        </View>


                        <View key={index}>
                            <View style={styles.subAtmaText}>
                                <Text>ID Penitip : {penitip.ID_Penitip}</Text>
                                <Text>Nama Penitip : {penitip.Nama_Penitip}</Text>
                                <Text>Bulan : {initialData.bulan}</Text>
                                <Text>Tahun : {initialData.tahun}</Text>
                                <Text>Tanggal Cetak : {initialData.tgl_cetak}</Text>
                            </View>

                            <View style={{ ...styles.table, marginTop: "20px" }}>
                                {/* Table Header */}
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>Nama</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>Qty</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>Harga Jual</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>Total</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>20% Komisi</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>Yang Diterima</Text>
                                    </View>
                                </View>

                                {penitip.dataTable.map((row, index) => (
                                    <React.Fragment key={index}>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{row.Nama_Produk}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{row.Total_Kuantitas}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{row.Harga_Jual}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{row.Total_Perolehan}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{row.Komisi}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{row.Yangditerima}</Text>
                                            </View>
                                        </View>
                                    </React.Fragment>
                                ))}
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>Total : {penitip.Harga_Total}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </React.Fragment>
                ))}
            </Page>
        </Document>
    );
};

export default LaporanTransaksiPenitip;