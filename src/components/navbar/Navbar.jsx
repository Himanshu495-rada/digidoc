import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Button, Modal, Form, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });


    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLoginClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Successful login
                const data = await response.json();
                const token = data.token;
                // Store the token in local storage or state for authentication
                localStorage.setItem('token', token);
                // Redirect or perform any necessary actions after successful login
            } else {
                // Failed login
                alert('Login failed');
            }
        } catch (error) {
            alert('Error during login:', error);
            // Handle network or other errors
        }

        handleClose(); // Close the modal after form submission
    };

    const logout = async () => {
        try {

            // Get the JWT token from wherever you have stored it (localStorage, state, etc.)
            const token = localStorage.getItem('token'); // Adjust this based on your token storage

            // Send the POST request with the token in the Authorization header
            const response = await fetch(`${apiUrl}/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                },
            });

            if (response.status === 200) {
                // Clear the token from storage after successful logout
                localStorage.removeItem('token');
                setLogin(false);
            } else {
                // Failed logout
                console.log('Logout failed');
                console.log(response);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        if (token !== null) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [token,])

    return (
        <>
            <div className="container-fluid nav_bg navbarContainer">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <nav className="navbar navbar-expand-lg navbar-light ">
                            <div className="container-fluid">
                                <NavLink className="navbar-brand" to="/">
                                    <h1 className="logo" style={{ color: "white" }} >DigiDoc</h1>
                                </NavLink>

                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                                        <li className="nav-item">
                                            <NavLink className="nav-link" style={{ color: "white" }} to="/features">Features</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" style={{ color: "white" }} to="/team">Team</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" style={{ color: "white" }} to="/contact">Contact</NavLink>
                                        </li>
                                        {login ?
                                            <NavDropdown title={<FontAwesomeIcon icon={faUserCircle} style={{ color: "white", fontSize: "30px", marginLeft: "10px" }} />} id="basic-nav-dropdown">

                                                <NavDropdown.Item onClick={() => { navigate("/dashboard") }} >Dashboard</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                            </NavDropdown>
                                            :
                                            <li className="nav-item loginBtn">
                                                <button className="nav-link" onClick={handleLoginClick} >Login</button>
                                            </li>
                                        }

                                    </ul>
                                </div>
                            </div>
                            <Modal show={showModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Login</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="formBasicUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer className="d-flex justify-content-center" >
                                    <Button className="bg-primary" onClick={handleLogin}>
                                        Login
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;