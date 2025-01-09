import { Eye, MessageSquare, Share2, Trash2, Edit, Pencil } from "lucide-react";
import React, { useState } from "react";
import axiosInstance from "../../config/axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
function BlogCard({ blog, onDelete, onEdit }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/blog/delete-blog/${blog.id}`);
      onDelete(blog.id);
      toast.success("Blog post deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
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
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* <div className="absolute bottom-4 right-4 p-1 rounded-full bg-base-100">
            <p className="text-xs text-neutral-content">
              {new Date(blog.date).toLocaleDateString()}
            </p>
          </div> */}
        </figure>

        {/* Content Section */}
        <div className="card-body p-4">
          <h2 className="card-title text-neutral-content text-lg font-bold">
            {blog.title} - {blog.author}
          </h2>
          
          <p className="text-neutral-content text-sm">{blog.excerpt}</p>

          {/* Stats Section */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-neutral-content">
              <span className="text-sm"> {format(new Date(blog.date), "dd MMM, yyyy")}</span>
            </div>
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
              <h3 className="font-bold text-lg">Delete Blog Post</h3>
              <p className="py-4">Are you sure you want to delete this blog post?</p>
              <div className="modal-action">
                <button 
                  className="btn btn-ghost" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-error" 
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogCard;
