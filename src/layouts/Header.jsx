import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";
import { profile_pic } from "../Api/Endpoints";
import {  Container, Nav, Navbar, Dropdown } from "react-bootstrap";

function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, user, profileImage } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
  };

  const handleToggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand to="#home">WTS-Academy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link active " to="">
              Home
            </Link>
            {isLoggedIn && (
              <>
                <div className="position-relative mt-2 ms-4 d-flex">
                  <span className="text-white">{user}</span>
                  <div className="ms-4">
                    <img
                      src={profileImage ? profile_pic(profileImage) : "error"}
                      alt="Profile"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={handleToggleDropdown}
                    />
                  </div>
                  <Dropdown.Menu
                    show={showDropdown}
                    align="end"
                    className="mt-0"
                    style={{ backgroundColor: "gray" }}
                  >
                    <Dropdown.Item>
                      <i className="bi bi-person-circle"></i> Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right"></i> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
