import { Button, Table, Form, InputGroup, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSearch } from '@fortawesome/free-solid-svg-icons';

function RUDSKaryawan() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <InputGroup className='mt-6 ms-2' style={{ width: '30%' }}>
                <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                />
                <Button id="button-addon2" style={{ backgroundColor: '#422006' }}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </InputGroup>

            <Button  href='' className='mt-6 ms-2' style={{ backgroundColor: '#422006', width: '15%' }}>Tambah Karyawan</Button>

            <Table className='mt-6 ml-2' striped hover style={{ width: '98.5%' }}>
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
                        <td className='flex justify-center space-x-2'>
                            <Button variant='success' size='sm'>Edit</Button>
                            <Button variant='danger' size='sm'>Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default RUDSKaryawan;
