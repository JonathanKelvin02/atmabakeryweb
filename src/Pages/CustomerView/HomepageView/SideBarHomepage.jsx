//import Component
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function SideBarHomepage({ children }) {
    const navigate = useNavigate();

    return (
        <>
            <Sidebar>
                <Menu
                    menuItemStyles={{
                        button: {
                            // the active class will be added automatically by react router
                            // so we can use it to style the active menu item
                            [`&.active`]: {
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                        },
                    }}
                >
                    <MenuItem component={<Link to="/documentation" />}> Documentation</MenuItem>
                    <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
                    <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
                </Menu>
            </Sidebar>;
        </>
    )
}

export default SideBarHomepage;