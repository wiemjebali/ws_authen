import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { get_auth_user, logout } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import Register from "./Register";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const NavBar = () => {
  useEffect(() => {
    dispatch(get_auth_user());
  }, []);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const logout_user = () => {
    dispatch(logout());
    navigate("/")
  };

  const authUser = (
    <Nav className="me-auto">
      <Nav.Link href="#home" onClick={logout_user}>
        Log out
      </Nav.Link>
      <Nav.Link href="#">{user && user.fullName}</Nav.Link>
    </Nav>
  );

  const guestUser = (
    <Nav className="me-auto">
      <Nav.Link href="#home">
        <Login />
      </Nav.Link>
      <Nav.Link href="#home">
        <Register />
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user ? authUser : guestUser}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
