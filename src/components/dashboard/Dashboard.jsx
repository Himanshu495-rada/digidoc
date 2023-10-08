import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import FileCard from "./FileCard";
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const isAuthenticated = localStorage.getItem('token'); // Check if the user is authenticated
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [fileNames, setFileNames] = useState([])


  useEffect(() => {
    if (isAuthenticated === null) {
      navigate('/');
    }
    fetch(`${apiUrl}/dashboard`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an array of objects like { filename, id }
        setFileNames(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [isAuthenticated,])

  return (
    <>
      <Navbar />
      <div className="d-flex flex-wrap justify-content-center " style={{ marginTop: "80px" }} >
        {fileNames.map((file, index) => (
          <FileCard key={file.id} fileName={file.filename} id={file.id} />
        ))}
      </div>
    </>
  )
}

export default Dashboard