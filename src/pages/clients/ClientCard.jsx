import React, { useState } from 'react';
import { Eye, MessageSquare, Share2, Trash2, Edit, ExternalLink } from "lucide-react";

const ClientCard = ({ client, onDelete }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/v1/web/clients/delete/${client.id}`);
      onDelete(client.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <>
      <div className="group relative bg-base-200  rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-48 rounded-t-lg flex items-center justify-center bg-base-200">
          <img
            src={client.logo || "/api/placeholder/400/250"}
            alt={client.name}
            className="max-h-full max-w-full object-contain p-4 transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-neutral-content  line-clamp-1">
              {client.name}
            </h3>
            <div className="flex gap-2">
              <button
                className="p-1 rounded-full bg-base-200 hover:bg-gray-400  transition-colors"
                onClick={() => window.open(client.website, '_blank')}
              >
                <ExternalLink className="w-4 h-4 text-neutral-content" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-neutral-content  line-clamp-2">
            {client.description}
          </p>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4 text-neutral-content " />
              <span className='text-neutral-content '>{client.projectCount || 0} Projects</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="w-4 h-4 text-neutral-content " />
              <span className='text-neutral-content '>{client.collaborations || 0} Collaborations</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            onClick={() => {/* TODO: Implement edit logic */}}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteDialog(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Delete Client
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Are you sure you want to delete {client.name}? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientCard;