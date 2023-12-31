import { useContext } from 'react';
import { Context } from '../../ContextStore';
import { Navbar, NavDropdown, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// import { BsFillPersonFill, BsFillEnvelopeFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5'
import logo from '../../images/logo-no-background.svg';
import plusIcon from '../../images/plus.svg';
import UserImage from '../../images/default-user.jpg'

import './Header.css'
function Header() {
    const { userData, setUserData } = useContext(Context);

    return (
        <Navbar collapseOnSelect bg="light" variant="light">
            <div className="container">
                <Navbar.Brand>
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt="Лого календарь" width="118" height="32" />
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                    
                    {userData ?
                        (<Nav>
                            <NavLink className="nav-item" id="addButton" to="/add-task">
                                <OverlayTrigger key="bottom" placement="bottom"
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <strong>Add</strong>  a task.
                                        </Tooltip>
                                    }
                                >
                                    <img src={plusIcon} alt="plus" width="32" height="32" />
                                </OverlayTrigger>
                            </NavLink>

                            <NavDropdown title={
                                <img id="navImg" src={UserImage} alt="user-avatar"/>
                                } drop="left" id="collasible-nav-dropdown">
                                {/* <NavLink className="dropdown-item" to={`/profile/${userData._id}`}>
                                    <BsFillPersonFill />Profile
                                </NavLink> */}

                                {/* <NavDropdown.Divider /> */}

                                {/* <NavLink className="dropdown-item" to="/your-sells">
                                    <BsFillGridFill />Sells
                            </NavLink> */}
                                {/* <NavLink className="dropdown-item" to="/messages">
                                    <BsFillEnvelopeFill />Messages
                            </NavLink> */}
                                {/* <NavLink className="dropdown-item" to="/wishlist">
                                    <BsFillHeartFill />Wishlist
                            </NavLink> */}

                                {/* <NavDropdown.Divider /> */}

                                <NavLink className="dropdown-item" to="/auth/logout" onClick={() => {
                                    setUserData(null)
                                }}>
                                    <IoLogOut />Log out
                                </NavLink>
                            </NavDropdown>
                        </Nav>)
                        :
                        (<Nav>
                            <NavLink className="nav-item" id="nav-sign-in" to="/auth/login">
                                Sign In
                            </NavLink>
                            <NavLink className="nav-item" id="nav-sign-up" to="/auth/register">
                                Sign Up
                            </NavLink>
                        </Nav>)
                    }
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;