import {Container, Table, Spinner, Alert} from "react-bootstrap";
import {useState, useEffect} from "react";

//Import API
import { GetAllKaryawan, SeachKaryawan } from "../../api/apiKaryawan";

//Import Component
import ModalEditGajiBonusKaryawan from "./ModalEditGajiBonusKaryawan";

const ViewGajiBonus = () => {
    const [karyawans, setKaryawan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchKaryawan = () => {
        setIsLoading(true);
        GetAllKaryawan().then((response) => {
            setKaryawan(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    const searchKaryawan = (e) => {
        e.preventDefault();
        setIsLoading(true);
        SeachKaryawan(searchQuery).then((response) => {
            setKaryawan(response);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchKaryawan();
    }, [])

    return (
        <>
            <Container>
                <div>
                    {isLoading ? (
                        <div className="text-center">
                            <Spinner animation="border" variant="dark" size="lg" role="status"/>
                            <h6 className="mt-2 mb-0">Loading...</h6>
                        </div>
                    ) : (
                        karyawans?.length > 0 ? (
                            <Table className="mt-3 ms-3" striped hover style={{width:'97.5%'}}>
                                <thead className='text-center'>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Karyawan</th>
                                    <th>Nomor Rekening</th>
                                    <th>Email</th>
                                    <th>Gaji</th>
                                    <th>Bonus</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody className="text-center align-middle">
                                    {karyawans.map((karyawan, index) => (
                                        <tr key={karyawan.ID_Pegawai}>
                                            <td>{index + 1}</td>
                                            <td>{karyawan.Nama_Pegawai}</td>
                                            <td>{karyawan.Nomor_Rekening}</td>
                                            <td>{karyawan.email}</td>
                                            <td>{karyawan.Gaji}</td>
                                            <td>{karyawan.Bonus}</td>
                                            <td>
                                                <ModalEditGajiBonusKaryawan dataKaryawan={karyawan} onSuccess={fetchKaryawan}/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <Alert variant='warning' className='text-center'>
                                Data Karyawan Kosong
                            </Alert>
                        )
                    )}
                </div>
            </Container>
        </>
    )
}

export default ViewGajiBonus;