import React, { useState } from 'react';

function ClientForm({ onClose }) {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add the client goes here
    onClose(); // Close the form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control mb-4">
        <label className="label" htmlFor="client-name">
          <span className="label-text">Client Name</span>
        </label>
        <input
          id="client-name"
          type="text"
          placeholder="Client Name"
          className="input input-bordered"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-control mb-4">
        <label className="label" htmlFor="logo-url">
          <span className="label-text">Logo URL</span>
        </label>
        <input
          id="logo-url"
          type="text"
          placeholder="Logo URL"
          className="input input-bordered"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          required
        />
      </div>

      <div className="form-control mb-4">
        <label className="label" htmlFor="website-url">
          <span className="label-text">Website</span>
        </label>
        <input
          id="website-url"
          type="text"
          placeholder="Website URL"
          className="input input-bordered"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="form-control mb-4">
        <label className="label" htmlFor="client-description">
          <span className="label-text">Description</span>
        </label>
        <textarea
          id="client-description"
          className="textarea textarea-bordered"
          placeholder="Client Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="form-control mb-4">
        <label className="label" htmlFor="order">
          <span className="label-text">Order</span>
        </label>
        <input
          id="order"
          type="number"
          className="input input-bordered"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
        />
      </div>

      <div className="form-control mb-4">
        <label className="label" htmlFor="is-active">
          <span className="label-text">Active</span>
        </label>
        <input
          id="is-active"
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