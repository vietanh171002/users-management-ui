import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo512.png';
import { useContext, useState } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

function Header(props) {
    let location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Log out successfully');
        // console.log(user);
    };
    // user.email

    //display welcome
    // const [isLogedIn, setItLogIn] = useState(false);

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <NavLink to="/" className="navbar-brand">
                            <img alt="" src={logoApp} width="30" height="30" className="d-inline-block align-top" />
                            <span> Hoi Dan IT App</span>
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" activeKey={location.pathname}>
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                            <NavLink to="/users" className="nav-link">
                                Manage Users
                            </NavLink>
                        </Nav>

                        <Nav>
                            {user.email && <div className="nav-link">Welcome {user.email}</div>}
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                {!user.email && (
                                    <NavLink to="/login" className="dropdown-item">
                                        Login
                                    </NavLink>
                                )}
                                {user.email && (
                                    <NavLink to="/" onClick={handleLogout} className="dropdown-item">
                                        Logout
                                    </NavLink>
                                )}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
