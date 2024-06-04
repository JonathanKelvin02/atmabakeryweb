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
        width: "33%",
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

const LaporanPemasukanPengeluaran = ({ bulan, tahun, tanggalCetak, data, total }) => {
    console.log(data[0]);
    const firstArray = data[0];

    if (!data) {
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

                <View style={{ ...styles.mainAtmaText, marginTop: "20px" }}>
                    <Text>LAPORAN PEMASUKAN DAN PENGELUARAN</Text>
                </View>
                <View style={styles.subAtmaText}>
                    <Text>Bulan : {bulan}</Text>
                    <Text>Tahun : {tahun}</Text>
                    <Text>Tanggal cetak: {tanggalCetak}</Text>
                </View>

                <View style={{ ...styles.table, marginTop: "20px" }}>
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Kategori</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Pemasukan</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Pengeluaran</Text>
                        </View>
                    </View>

                    {/* Table Rows */}
                    {Object.entries(firstArray).map(([category, details]) => (
                        <View key={category} style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{category}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{details.Pemasukan}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{details.Pengeluaran}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};

export default LaporanPemasukanPengeluaran;
