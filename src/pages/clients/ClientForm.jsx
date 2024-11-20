import React, { useState, useRef } from 'react';

function ClientForm({ onClose }) {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState(null); // State for the uploaded logo file
  const [logoPreview, setLogoPreview] = useState(null); // State for logo preview
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(1);
  const inputRef = useRef(null); // Ref for file input

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add the client goes here
    onClose(); // Close the form after submission
  };

  // Handle logo selection via input
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setLogo(null);
      setLogoPreview(null);
    }
  };

  // Handle drag-and-drop upload
  const handleDragOver = (event) => event.preventDefault();
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Remove selected logo
  const handleRemoveLogo = () => {
    setLogo(null);
    setLogoPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Client Name</span>
        </label>
        <input
          type="text"
          placeholder="Client Name"
          className="input input-bordered border-accent"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Logo Upload with Drag-and-Drop and Preview */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Logo</span>
        </label>
        <div
          className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-base-100"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          {!logoPreview ? (
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
                src={logoPreview}
                alt="Logo Preview"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <button
                type="button"
                className="absolute top-2 right-2 btn btn-xs btn-error"
                onClick={handleRemoveLogo}
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
            onChange={handleLogoChange}
          />
        </div>
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Website</span>
        </label>
        <input
          type="text"
          placeholder="Website URL"
          className="input input-bordered border-accent"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          className="textarea textarea-bordered border-accent"
          placeholder="Client Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Order</span>
        </label>
        <input
          type="number"
          className="input input-bordered border-accent"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Active</span>
        </label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
      </div>

      <div className="form-control">
        <button type="submit" className="btn btn-primary">
          Add Client
        </button>
        <button type="button" className="btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ClientForm; 