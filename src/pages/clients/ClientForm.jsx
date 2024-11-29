import React, { useState, useRef } from "react";
import axios from "axios";

function ClientForm() {
  const [imageFile, setImageFile] = useState(null); // State for the uploaded image file
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [website, setWebsite] = useState(""); // State for website URL
  const [title, setTitle] = useState(""); // State for title
  const [content, setContent] = useState(""); // State for content
  const inputRef = useRef(null); // Ref for file input

  // Handle image selection via input
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  // Handle drag-and-drop upload
  const handleDragOver = (event) => event.preventDefault();
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', title);
    formData.append('website', website);
    formData.append('description', content);
    if (imageFile) {
      formData.append('logo', imageFile); // Append the image file if it exists
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/admin/client/create-client', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        // Handle success (e.g., reset form, show success message)
        handleRemoveImage(); // Clear the image after submission
        setTitle(""); // Reset title input
        setContent(""); // Reset content input
        setWebsite(""); // Reset website input
        // Optionally, redirect or update the UI
      } else {
        console.error("Failed to create client:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered border-accent"
        />
      </div>

      {/* Image Upload with Drag-and-Drop and Preview */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Image</span>
        </label>
        <div
          className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-base-100"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          {!imagePreview ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-primary mb-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 3a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v3.586l-1.293-1.293a1 1 0 00-1.414 0L10 12l-2.293-2.293a1 1 0 00-1.414 0L4 12V5zm0 10v-1.586l2.293-2.293a1 1 0 011.414 0L10 13l3.293-3.293a1 1 0 011.414 0L16 12.414V15H4z" />
              </svg>
              <p className="text-neutral-content">Drag and drop or click to upload</p>
            </>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <button
                type="button"
                className="absolute top-2 right-2 btn btn-xs btn-error"
                onClick={handleRemoveImage}
              >
                Remove
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Content Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Content</span>
        </label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Write your post content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      {/* Website Input */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Website</span>
        </label>
        <input
          type="url"
          placeholder="Enter website URL"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="input input-bordered border-accent"
        />
      </div>

      {/* Publish Button */}
      <div className="form-control">
        <button type="submit" className="btn btn-primary">
          Publish
        </button>
      </div>
    </form>
  );
}

export default ClientForm;
