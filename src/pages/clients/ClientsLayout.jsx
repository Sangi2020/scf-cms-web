import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import ClientForm from "./ClientForm";
import ClientCard from "./ClientCard";
import axiosInstance from "../../config/axios";

function ClientsLayout() {
  // State for blogs, loading, and error
const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("https://scf-cms-be-hz4e.onrender.com/api/v1/web/client/get-all-clients");
        console.log(response.data)
        // Access the 'data' array within the response
        setClients(response.data.data)
      } catch (err) {
        setError("Failed to load blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClients();
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Drawer */}
      <div className="drawer drawer-end">
        <input id="new-post-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-content">Clients</h1>
            <label htmlFor="new-post-drawer" className="btn btn-primary gap-2">
              Add New Client
            </label>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search client..."
                className="input input-bordered w-full focus:outline-none pl-10 bg-base-100 text-neutral-content"
              />
            </div>
            {/* <select className="select select-bordered focus:outline-none bg-base-100 text-neutral-content">
              <option>Latest</option>
              <option>Most Viewed</option>
              <option>Most Shared</option>
            </select> */}
          </div>

          {/* Client Grid */}
          {loading ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <div 
        key={index} 
        className="card bg-base-100 animate-pulse transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        {/* Image Skeleton */}
        <div className="h-48 bg-base-100 rounded-3xl transition-colors duration-300"></div>
        
        {/* Content Skeleton */}
        <div className="card-body p-4 space-y-3">
          <div className="h-4 bg-base-200 w-1/2 transition-colors duration-300"></div>
          <div className="h-6 bg-base-200 w-3/4 transition-colors duration-300"></div>
          <div className="h-4 bg-base-200 w-full transition-colors duration-300"></div>
          
          {/* Stats Skeleton */}
          <div className="flex gap-4 mt-4">
            <div className="h-4 bg-base-200 w-1/4 transition-colors duration-300"></div>
            <div className="h-4 bg-base-200 w-1/4 transition-colors duration-300"></div>
            <div className="h-4 bg-base-200 w-1/4 transition-colors duration-300"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
) : error ? (
  <div className="text-center text-red-500">{error}</div>
) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {clients.map((client) => (
      <ClientCard 
        key={client.id} 
        client={client} 
        onDelete={(id) => {
          // Handle deletion in parent component
        }} 
      />
    ))}
  </div>
)}
        </div>

        {/* Drawer Sidebar */}
        <div className="drawer-side">
          <label htmlFor="new-post-drawer" className="drawer-overlay"></label>
          <div className="p-4 md:w-[40%] w-full sm:w-1/2 overflow-y-scroll bg-base-100 h-[85vh] text-base-content absolute bottom-4 right-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add New Client</h2>
            <ClientForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientsLayout;
