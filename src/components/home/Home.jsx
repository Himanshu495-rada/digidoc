import React, { useState, useEffect } from 'react'
import Navbar from "../navbar/Navbar";
import Home2 from "../home2/Home2"
import "./Home.css"
import Lottie from "react-lottie";
import animation from "../../assets/animation.json";
import { Button, Modal, Form } from 'react-bootstrap';

function Home() {

    const token = localStorage.getItem("token");
    const apiUrl = process.env.REACT_APP_API_URL;
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function handleSignupClick() {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const handleSignup = async () => {
        try {
            const response = await fetch(`${apiUrl}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Signup successful");
            } else {
                alert("Signup error");
            }
        } catch (error) {
            console.error('Error:', error);
        }

        handleClose(); // Close the modal after form submission
    };

    useEffect(() => {
        if (token !== null) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [token, login])

    return (
        <>
            <Navbar />
            {
                login ? <Home2 /> :
                    <div className="homeContainer">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 d-flex justify-content-center flex-column heading">
                                    <h1>
                                        Unlock the Power of{" "}
                                        <span style={{ color: "chartreuse" }}>Digital Documents</span>
                                    </h1>
                                    <p>
                                        Convert PDFs to XML while retaining formatting and images. Manage your
                                        digital documents with ease. Get started now!
                                    </p>
                                    <button className="btn" onClick={handleSignupClick} >Try it out</button>
                                </div>
                                <div className="col-md-6">
                                    <Lottie options={defaultOptions} />
                                </div>
                            </div>
                        </div>
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Signup</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="confirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-center" >
                                <Button className="bg-primary" onClick={handleSignup}>
                                    Signup
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
            }

        </>

    )
}

export default Home