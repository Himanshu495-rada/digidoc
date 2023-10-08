import React, { useState } from 'react'
import "./Home2.css"

function Home2() {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      // const response = await fetch('YOUR_BACKEND_API_URL', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (response.ok) {
      //   alert('File uploaded successfully!');
      // } else {
      //   alert('File upload failed.');
      // }
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  return (
    <div className="container">
      <div className="uploader">
        <div className='d-flex flex-column align-items-center justify-content-center' >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <button className="uploadBtn" onClick={handleUpload} >Upload document</button>
        </div>

      </div>
    </div>
  )
}

export default Home2