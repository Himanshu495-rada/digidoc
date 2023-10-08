import React, { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./FileCard.css";

function FileCard({ fileName, id }) {

    const [show, setShow] = useState(false);
    const apiUrl2 = process.env.REACT_APP_API_URL2;
    const apiUrl3 = process.env.REACT_APP_API_URL3;
    const [numPages, setNumPages] = useState(null);
    function onDocumentSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handleDownloadXml = async () => {
        try {
            // Send a GET request to the API to fetch the XML file
            const response = await fetch(`${apiUrl2}/doc/xml/${id}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Read the response as a binary blob
            const blob = await response.blob();

            // Create a URL for the blob data
            const url = window.URL.createObjectURL(blob);

            // Create a download link and trigger a click to start the download
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName.split(".")[0] + "-digital.xml" // Specify the desired file name
            document.body.appendChild(a);
            a.click();

            // Clean up by revoking the URL
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert('Error fetching and downloading the XML file:', error);
        }
    }

    const handleExportPdf = async () => {

        try {
            // Send a GET request to the API to fetch the PDF file
            const response = await fetch(`${apiUrl3}/export/${id}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Read the response as a blob
            const pdfBlob = await response.blob();

            // Create a URL for the PDF blob data
            const pdfUrl = window.URL.createObjectURL(pdfBlob);

            // Create a download link and trigger a click to start the download
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = fileName; // Specify the desired file name
            document.body.appendChild(a);
            a.click();

            // Clean up by revoking the URL
            window.URL.revokeObjectURL(pdfUrl);
        } catch (error) {
            console.error('Error fetching and downloading the PDF file:', error);
        }
    };


    return (
        <>
            <Card
                className="m-2 p-3 text-center"
                style={{
                    width: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 16px 0 rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => { setShow(true) }}
            >
                <FontAwesomeIcon icon={faFilePdf} size="4x" />
                <p className="mt-2">{fileName}</p>
            </Card>
            <Modal show={show} onHide={() => { setShow(false) }} >
                <Modal.Header closeButton>
                    <Modal.Title>File Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between">
                        <div className="mr-2 pdfContainer ">
                            <FontAwesomeIcon icon={faFilePdf} size="9x" color='#0c6fe2' />
                            <h3 style={{ marginTop: "10px" }} >{fileName}</h3>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center' >
                            <button className='bg-primary rounded-pill downloadBtn' onClick={handleDownloadXml} >
                                Download Digital Document (XML)
                            </button>
                            <button className='bg-success rounded-pill downloadBtn' onClick={handleExportPdf} >
                                Export To PDF
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default FileCard;
