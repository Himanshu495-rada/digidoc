import React from 'react'
import contact_img from "../../assets/contact_us.jpg";
import Navbar from "../navbar/Navbar";
import "./Contact.css";

function Contact() {
    return (
        <>
            <Navbar />
            <div className="homeContainer">
                <div className="container">
                    <div className="row" style={{ marginBottom: 100 }}>
                        <div className="col-md-6">
                            <img
                                src={contact_img}
                                alt="contact us image"
                                className="contactImage"
                            />
                        </div>
                        <div className="col-md-6">
                            <h1 className="title">Our Team</h1>
                            <div className="contactBox">
                                <div className="row align-items-center contactRow">
                                    <div className="col-auto">
                                        <i className="fa fa-envelope fa-2x text-white" />
                                    </div>
                                    <div className="col">
                                        <span
                                            className="d-block"
                                            style={{ color: "black", fontSize: 20 }}
                                        >
                                            pranav.tupe@ltimindtree.com
                                        </span>
                                    </div>
                                </div>
                                <div className="row align-items-center contactRow">
                                    <div className="col-auto">
                                        <i className="fa fa-envelope fa-2x text-white" />
                                    </div>
                                    <div className="col">
                                        <span
                                            className="d-block"
                                            style={{ color: "black", fontSize: 20 }}
                                        >
                                            ashlesha.jagtap@ltimindtree.com
                                        </span>
                                    </div>
                                </div>
                                <div className="row align-items-center contactRow">
                                    <div className="col-auto">
                                        <i className="fa fa-envelope fa-2x text-white" />
                                    </div>
                                    <div className="col">
                                        <span
                                            className="d-block"
                                            style={{ color: "black", fontSize: 20 }}
                                        >
                                            himanshu.tekade@ltimindtree.com
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>


    )
}

export default Contact