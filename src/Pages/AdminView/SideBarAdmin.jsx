import { useState } from 'react';
import { Button, Dropdown, Offcanvas } from 'react-bootstrap';
import { IoReorderThreeOutline } from "react-icons/io5";
import { MdOutlineFastfood } from "react-icons/md";
import { GrUserSettings } from "react-icons/gr";
import { TbReport } from "react-icons/tb";

function SideBarAdmin() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <a className="text-black px-4 py-2 rounded font-bold text-4xl" style={{textDecoration: 'none'}} onClick={handleShow}><IoReorderThreeOutline/></a>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Atma Kitchen</Offcanvas.Title>
                </Offcanvas.Header>
                <div className='text-center space-y-5'>
                    <Dropdown>
                        <Dropdown.Toggle className='w-full text-start d-flex align-items-center' variant="white" style={{backgroundImage: 'none'}}>
                            <MdOutlineFastfood className="me-2" /> Product 
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='w-full space-y-3'>
                            <Dropdown.Item href="#/action-1">Homecook</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Hampers</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Titipan</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button className = 'w-full text-start d-flex align-items-center' variant='white'><GrUserSettings className="me-2"/> Users</Button>

                    <Button className = 'w-full text-start d-flex align-items-center' variant='white'><GrUserSettings className="me-2"/> Employee</Button>

                    <Button className = 'w-full text-start d-flex align-items-center' variant='white'><GrUserSettings className="me-2"/> Penitip</Button>

                    <Dropdown>
                        <Dropdown.Toggle className='w-full text-start d-flex align-items-center' variant="white" style={{backgroundImage: 'none'}}>
                            <TbReport className="me-2" /> Laporan 
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='w-full space-y-3'>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Offcanvas>
        </>
    );
}

export default SideBarAdmin;
