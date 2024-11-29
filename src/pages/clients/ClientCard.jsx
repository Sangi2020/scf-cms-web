import React, { useState, useEffect } from 'react';
import { Eye, MessageSquare, Share2, Trash2, Edit, ExternalLink } from "lucide-react";
import { X } from 'lucide-react';
const ClientCard = ({ client, onDelete, onEdit }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedClient, setEditedClient] = useState(client);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(client.logo);

  useEffect(() => {
    if (showEditModal) {
      setImageFile(client.logo ? new File([], client.logo) : null); // Set imageFile if logo exists
      setImagePreview(client.logo); // Set the preview to the existing logo
    }
  }, [showEditModal, client.logo]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/v1/web/clients/delete/${client.id}`);
      onDelete(client.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append('name', editedClient.name);
    formData.append('description', editedClient.description);
    if (imageFile) {
      formData.append('logo', imageFile);
    }
    onEdit(formData);
    setShowEditModal(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(client.logo);
    }
  };

  return (
    <>
      <div className="group relative bg-base-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
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
            <h3 className="text-xl font-bold text-neutral-content line-clamp-1">
              {client.name}
            </h3>
            <div className="flex gap-2">
              <button
                className="p-1 rounded-full bg-base-200 hover:bg-gray-400 transition-colors"
                onClick={() => window.open(client.website, '_blank')}
              >
                <ExternalLink className="w-4 h-4 text-neutral-content" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-neutral-content line-clamp-2">
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
            onClick={() => setShowEditModal(true)}
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity" onClick={() => setShowEditModal(false)} />
        
        <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transform transition-all">
          <div className="absolute right-4 top-4">
            <button
              onClick={() => setShowEditModal(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
      
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Edit Client
            </h3>
      
            <form onSubmit={handleEdit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editedClient.name}
                  onChange={(e) => setEditedClient({ ...editedClient, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-shadow"
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editedClient.description}
                  onChange={(e) => setEditedClient({ ...editedClient, description: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-shadow resize-none"
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Logo
                </label>
                <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="imageInput"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors"
                  >
                    Choose Image
                  </label>
                  {imagePreview ? (
                    <div className="mt-4 w-full max-w-xs">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      No file chosen
                    </p>
                  )}
                </div>
              </div>
      
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteDialog(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Client</h3>
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