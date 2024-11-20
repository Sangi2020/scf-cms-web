import { Search, Plus } from 'lucide-react';
import ClientCard from './ClientCard';
import ClientForm from './ClientForm';
import { useState } from 'react';
import dummy1 from "./dummy/dummy1.jpeg";
import dummy2 from "./dummy/2.png";

function ClientsLayout() {
  const [clients, setClients] = useState([
    {
      id: '1',
      name: "Client A",
      logo: dummy1,
      website: "https://client-a.com",
      description: "Description for Client A",
      isActive: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: "Client B",
      logo: dummy2,
      website: "https://client-b.com",
      description: "Description for Client B",
      isActive: true,
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-content">Clients</h1>
        <button onClick={() => setIsFormOpen(true)} className="btn btn-primary gap-2">
          <Plus /> Add New Client
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="client-search-input"
            type="text"
            placeholder="Search client..."
            className="input input-bordered w-full focus:outline-none pl-10 bg-base-100 text-neutral-content"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {isFormOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-lg font-bold mb-4">Add New Client</h2>
            <ClientForm onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientsLayout; 