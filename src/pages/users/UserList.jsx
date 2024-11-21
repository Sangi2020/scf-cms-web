import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function UserList() {
  const [isLoading, setIsLoading] = useState(false);
 const nav =useNavigate()
  const handleDownload = async () => {
    try {
      setIsLoading(true);
      
      // Make API call with responseType blob to handle binary data
      const response = await axios({
        url: 'https://scf-cms-be-hz4e.onrender.com/api/v1/admin/enquiries/export-enquiry',
        method: 'GET',
        responseType: 'blob', // Important for handling binary files
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });

      // Create a URL for the blob
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'enquiries.xlsx'; // Set the file name

      // Append link to body, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download the file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={handleDownload}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {isLoading ? 'Downloading...' : 'Download Enquiry'}
      </button>
      <button className="primary" onClick={()=>nav(-1)}>previoeus page</button>
    </div>
  );
}

export default UserList;