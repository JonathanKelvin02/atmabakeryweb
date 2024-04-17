import { Button, Table, Form, InputGroup, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSearch } from '@fortawesome/free-solid-svg-icons';

function RUDSKaryawan() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <InputGroup className='m-3 w-25'>
                <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                />
                <Button id="button-addon2" style={{ backgroundColor: '#8e6f8e', borderColor:'#8e6f8e' }}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </InputGroup>

            <Button  href='' className='ms-3' style={{ backgroundColor: '#8e6f8e', width: '15%', borderColor:'#8e6f8e' }}>Tambah Karyawan</Button>

            <Table className='mt-3 ms-3' striped hover style={{width:'97.5%'}}>
                <thead className='text-center'>
                    <tr>
                        <th>Nama Karyawan</th>
                        <th>Nama Jabatan</th>
                        <th>Nomor Rekening</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Gaji</th>
                        <th>Bonus</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center align-middle'>
                    <tr>
                        <td>Margaret</td>
                        <td><Badge pill className="px-3 py-2">Owner</Badge></td>
                        <td>---</td>
                        <td className='underline'>margaret@gmail.com</td>
                        <td>
                            <InputGroup size='sm'>
                                <Form.Control disabled
                                    type={showPassword ? "text" : "password"}
                                    value="Owner1"
                                    style={{ backgroundColor: 'transparent', border: 'none' }}
                                />
                                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} style={{ backgroundColor: 'transparent', border: 'none' }}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </Button>
                            </InputGroup>
                        </td>
                        <td>---</td>
                        <td>---</td>
                        <td className='d-flex justify-content-center'>
                            <Button variant='success' size='sm' className='me-2'>Edit</Button>
                            <Button variant='danger' size='sm'>Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default RUDSKaryawan;
