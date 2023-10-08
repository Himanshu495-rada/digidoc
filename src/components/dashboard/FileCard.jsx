import React, { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./FileCard.css";

function FileCard({ fileName, id }) {

    const [show, setShow] = useState(false);
    const [numPages, setNumPages] = useState(null);
    function onDocumentSuccess({ numPages }) {
        setNumPages(numPages);
    }


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
                            <button className='bg-primary rounded-pill downloadBtn' >
                                Download Digital Document (XML)
                            </button>
                            <button className='bg-success rounded-pill downloadBtn' >
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
