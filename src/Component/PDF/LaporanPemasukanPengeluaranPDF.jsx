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

const LaporanPemasukanPengeluaran = ({ bulan, tahun, tanggalCetak, data, total }) => {
    console.log(data);
    
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
                    <Text>LAPORAN Presensi Karyawan</Text>
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
                            <Text style={styles.tableCell}></Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Pemasukan</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Pengeluaran</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                    </View>

                    {/* Table Rows */}
                    {/* {data.map((row, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{row.Nama_Pegawai}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{row.jumlahHadir}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{row.jumlahBolos}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{row.honorHarian}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{row.bonusRajin}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{row.total}</Text>
                            </View>
                        </View>
                    ))} */}

                    {/* <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Total : {total}</Text>
                        </View>
                    </View> */}
                </View>
            </Page>
        </Document>
    );
};

export default LaporanPemasukanPengeluaran;