import {useState, useEffect} from 'react';
import {Table, Button, Spinner, Alert} from 'react-bootstrap'

import {GetAllAlamat} from '../../../api/apiAlamat'

const ShowAlamatCustomer = () => {
    const [alamat, setAlamat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllAlamat = () => {
        setIsLoading(true);
        GetAllAlamat().then((response) => {
            setAlamat(response);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchAllAlamat();
    }, [])
    
    console.log(alamat);
    return(
        <>
            <Table className='m-3' striped bordered hover responsive>
                {isLoading ? (
                    <tr>
                        <td colSpan='5' className='text-center'>
                            <Spinner animation='border' variant='primary' />
                        </td>
                    </tr>
                    
                ) : (
                    <>
                        <thead>
                            <tr>
                                <th>Nomor</th>
                                <th>Nama Customer</th>
                                <th>Alamat</th>
                                <th>Jarak</th>
                                <th>Biaya</th>
                            </tr>
                        </thead>
                        <tbody className='text-center align-middle'>
                            { alamat.length == 0 ? 
                                <tr>
                                    <td colSpan='7'>
                                        <Alert variant='warning' className='text-center m-0'>
                                            Data Alamat Kosong 
                                        </Alert>
                                    </td>
                                </tr> :
                                alamat.map((data, index) => {
                                    var rowspan = 1;
                                    if (index > 0 && data.Nama_Customer === alamat[index - 1].Nama_Customer) {
                                        rowspan = 0;
                                    } else {
                                        for (let i = index + 1; i < alamat.length; i++) {
                                            if (data.Nama_Customer === alamat[i].Nama_Customer) {
                                                rowspan++;
                                            } else {
                                                break;
                                            }
                                        }
                                    }
                                    return(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            {rowspan === 0 ? null : <td rowSpan={rowspan}>{data.Nama_Customer}</td>}
                                            <td>{data.Alamat}</td>
                                            {data.Jarak === null ? <td>-</td> : <td>{data.Jarak}</td>}
                                            {data.Biaya === null ? <td>-</td> : <td>{data.Biaya}</td>}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </>
                )}
            </Table>
        </>
    )
}

export default ShowAlamatCustomer;