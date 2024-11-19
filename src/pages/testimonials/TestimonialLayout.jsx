import React, { useState } from "react";

function TestimonialLayout() {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "John Doe",
      feedback: "Great service! Highly recommended.",
      date: "2024-11-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback: "Excellent support and reliable.",
      date: "2024-11-10",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const handleDeleteClick = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setTestimonials((prev) =>
      prev.filter((item) => item.id !== selectedTestimonial.id)
    );
    setIsModalOpen(false);
    setSelectedTestimonial(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-neutral-content font-bold mb-4">Testimonials</h1>
      <div className="overflow-x-auto">
        <table className="table w-full border rounded-lg shadow bg-base-200">
          <thead>
            <tr className="text-neutral-content">
              <th className="bg-base-100 rounded-tl-lg">#</th>
              <th className="bg-base-100">Name</th>
              <th className="bg-base-100">Feedback</th>
              <th className="bg-base-100">Date</th>
              <th className="bg-base-100 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial, index) => (
              <tr
                key={testimonial.id}
                className="hover:bg-base-100 text-neutral-content"
              >
                <th>{index + 1}</th>
                <td>{testimonial.name}</td>
                <td>{testimonial.feedback}</td>
                <td>{testimonial.date}</td>
                <td>
                  <div className="flex space-x-2">
                    <button className="btn btn-sm btn-primary">Edit</button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteClick(testimonial)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box rounded-lg bg-base-100 shadow">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">
              Are you sure you want to delete the testimonial from{" "}
              <span className="font-bold">{selectedTestimonial?.name}</span>?
            </p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button
                className="btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestimonialLayout;
