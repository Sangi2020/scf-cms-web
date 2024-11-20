import React, { useState } from "react";

function TestimonialLayout() {
  const [testimonials, setTestimonials] = useState([
    {
      text: "Working with SCF Strategies transformed our approach to supply chain finance. Their team brought not only deep industry knowledge but also a hands-on, practical approach to implementation. Thanks to their guidance, we optimized our SCF program and improved cash flow significantly.",
      author: "Global Retail Corporation",
      position: "CFO",
      rating: 5,
      id: 1,
    },
    {
      text: "SCF Strategies went above and beyond in helping us implement a reverse factoring program that delivered real, measurable results. Their expertise in supplier onboarding and working capital analysis was instrumental in the success of our initiative.",
      author: "Leading Manufacturing Firm",
      position: "Head of Procurement",
      rating: 5,
      id: 2,
    },
    {
      text: "We partnered with SCF Strategies for an audit of our existing SCF platform, and the insights they provided were invaluable. They not only identified gaps but gave us clear, actionable recommendations to improve performance. Their team's professionalism and dedication were outstanding.",
      author: "Fintech Company",
      position: "CEO",
      rating: 5,
      id: 3,
    },
    {
      text: "SCF Strategies made a complex process feel seamless. From evaluating potential partners to managing our go-to-market strategy, they were with us every step of the way. The team's industry experience was clearly evident, and we've seen incredible improvements in both our supplier relationships and cash flow.",
      author: "International Bank",
      position: "Treasurer",
      rating: 5,
      id: 4,
    },
    {
      text: "SCF Strategies helped us launch our Supply Chain Finance program with precision and expertise. Their ability to align cross-functional teams and navigate the challenges of accounting treatment was a game-changer for us. They're not just consultants – they're true partners in success.",
      author: "Global Logistics Company",
      position: "VP of Finance",
      rating: 5,
      id: 5,
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-neutral-content">Testimonials</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-base-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-base-100 text-neutral-content">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Feedback</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial, index) => (
              <tr key={testimonial.id} className="hover:bg-base-300 text-neutral-content">
                <td className="border-b border-black bg-base-200 px-4  font-bold text-3xl py-2">{index + 1}</td>
                <td className="border-b border-black bg-base-200 px-4 py-2">{testimonial.author}</td>
                <td className="border-b border-black bg-base-200 px-4 text-sm py-2">
  {testimonial.text.split(" ").slice(0, 20).join(" ")}...
</td>
                <td className="border-b border-black bg-base-200 px-4 py-2">{testimonial.position}</td>
                <td className="border-b border-black bg-base-200 px-4 py-2 text-center">
                  <div className="flex justify-center space-x-2">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the testimonial from{" "}
              <span className="font-semibold">{selectedTestimonial?.author}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="btn btn-sm btn-error"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="btn btn-sm"
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
