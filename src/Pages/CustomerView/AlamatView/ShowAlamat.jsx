import {useState, useEffect} from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';

//Import API
import { GetAlamatCustomer } from '../../../api/apiAlamat';

//Import Component
import AddAlamat from './AddAlamat';
import EditAlamat from './EditAlamat';
import DeleteAlamat from './DeleteAlamat';

const ShowAlamat = () => {
    const [alamat, setAlamat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAlamat = () => {
        setIsLoading(true);
        GetAlamatCustomer().then((response) => {
            setAlamat(response);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchAlamat();
    }, [])

    console.log(alamat);
    return(
        <> 
            <AddAlamat onSuccess={fetchAlamat}/>
            <Table className='m-3' style={{width: '97%'}} striped bordered hover responsive>
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
                                <th>Alamat</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-center align-middle'>
                            { alamat.length == 0 ? 
                                <tr>
                                    <td colSpan='5'>
                                        <Alert variant='warning' className='text-center m-0'>
                                            Data Alamat Kosong 
                                        </Alert>
                                    </td>
                                </tr> :
                                alamat.map((data, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.Alamat}</td>
                                            <td>
                                                <div>
                                                    <EditAlamat onSuccess={fetchAlamat} dataAlamat={data}/>
                                                    <DeleteAlamat onSuccess={fetchAlamat} dataAlamat={data}/>
                                                </div>
                                            </td>
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

export default ShowAlamat;