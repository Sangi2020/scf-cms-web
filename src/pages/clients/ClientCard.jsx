import React from 'react';

function ClientCard({ client }) {
  return (
    <div className="card bg-base-200 transition-all duration-300 overflow-hidden group">
      <div className="card-body p-4">
        <img src={client.logo} alt={client.name} className="w-40 h-16 mb-4" />
        <h2 className="card-title text-neutral-content text-lg font-bold">{client.name}</h2>
        <p className="text-sm text-neutral-content">{client.description}</p>
        <p className="text-sm text-neutral-content">Website: <a href={client.website} target="_blank" rel="noopener noreferrer">{client.website}</a></p>
        <p className={`text-sm ${client.isActive ? 'text-green-500' : 'text-red-500'}`}>
          Status: {client.isActive ? 'Active' : 'Inactive'}
        </p>
      </div>
    </div>
  );
}

export default ClientCard; 