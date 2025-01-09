import React, { useState } from "react";
import { Trash2, Edit, Pencil } from "lucide-react";
import axiosInstance from "../../config/axios";
import { toast } from "react-toastify";

const ClientCard = ({ client, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`client/delete-client/${client.id}`);
      onDelete(client.id);
      toast.success("Client deleted successfully!");
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Failed to delete client.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="card bg-base-200 transition-all duration-300 overflow-hidden group relative">
        {/* Image Section */}
        <figure className="relative h-48 overflow-hidden">
          <img
            src={client.logo || "/api/placeholder/400/250"}
            alt={client.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </figure>

        {/* Content Section */}
        <div className="card-body p-4">
          <h2 className="card-title text-neutral-content text-lg font-bold">
            {client.name}
          </h2>
          <p className="text-neutral-content text-sm line-clamp-2">
            {client.description}
          </p>
          <div className="mt-2">
            <button
              className="text-blue-500 underline text-sm"
              onClick={() => window.open(client.website, "_blank")}
            >
              Visit Website
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            className="btn btn-sm btn-square btn-ghost"
            onClick={onEdit}
          >
            <Pencil className="w-6 h-6 text-success" />
          </button>
          <button
            className="btn btn-sm btn-square text-white btn-error"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal modal-open bg-base-100 text-neutral-content">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete Client</h3>
              <p className="py-4">
                Are you sure you want to delete this client?
              </p>
              <div className="modal-action">
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-error" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientCard;
