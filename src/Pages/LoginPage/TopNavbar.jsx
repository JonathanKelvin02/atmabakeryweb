import { Navbar, Container, Button } from 'react-bootstrap';

function TopNavbar() {
    return (
        <Navbar className="bg-body-tertiary h-24 w-100">
          <Container>
            <Navbar.Brand className='font-extrabold'>Atma Kitchen</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <div className='flex space-x-4'>
                    <a href="/login" className="bg-orange-950 border-2 border-yellow-950 text-white px-4 py-2 rounded font-bold" style={{textDecoration: 'none'}}>Login</a>
                    <a href="/register" className="bg-gray-100 border-2 border-yellow-950 text-yellow-950 px-4 py-2 rounded font-bold" style={{textDecoration: 'none'}}>Register</a>
                </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default TopNavbar;
