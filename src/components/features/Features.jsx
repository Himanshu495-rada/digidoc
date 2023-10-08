import React from 'react'
import Navbar from "../navbar/Navbar";
import "./Features.css";

function Features() {
    return (
        <>
            <Navbar />
            <div className="container mt-5 d-flex flex-column">
                <h1 className="text-center title">Key features of our app</h1>
                <div className="row justify-content-center mt-5">
                    <div className="col-lg-6 col-md-8">
                        <FeatureCard
                            title="Document Digitization"
                            description="System will extract data from document while retaining the sections/
                            formatting/ images of original document."
                        />
                    </div>
                    <div className="col-lg-6 col-md-8">
                        <FeatureCard
                            title="User Management"
                            description="User authentication and authorization mechanism, with defined user roles and
                            permissions to control upload, edit or access to document."
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

function FeatureCard({ title, description }) {
    return (
        <div className="card mb-4" style={{ width: "250px", height: "250px" }}>
            <div className="card-body"  >
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
        </div>
    );
}

export default Features