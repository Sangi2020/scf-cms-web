import React, { useState } from "react";
import { Star, Plus } from "lucide-react";

const TestimonialLayout = () => {
  const [testimonials, setTestimonials] = useState([
    {
      text: "Working with SCF Strategies transformed our approach to supply chain finance...",
      author: "Global Retail Corporation",
      position: "CFO",
      rating: 3,
      id: 1,
    },
    {
      text: "SCF Strategies went above and beyond in helping us implement a reverse factoring program...",
      author: "Leading Manufacturing Firm",
      position: "Head of Procurement",
      rating: 5,
      id: 2,
    },
  ]);

  const [newTestimonial, setNewTestimonial] = useState({
    text: "",
    author: "",
    position: "",
    rating: 5,
  });

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    const id = Math.max(...testimonials.map((t) => t.id)) + 1;
    setTestimonials([...testimonials, { ...newTestimonial, id }]);
    setNewTestimonial({ text: "", author: "", position: "", rating: 5 });
  };

  return (
    <div className="min-h-screen relative">
      {/* Drawer */}
      <div className="drawer drawer-end">
        <input id="testimonial-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-content">Testimonials</h1>
            <label htmlFor="testimonial-drawer" className="btn btn-primary gap-2">
              <Plus className="w-5 h-5" />
              Add Testimonial
            </label>
          </div>

          {/* Testimonial List */}
          <div className="mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="collapse collapse-plus bg-base-200 mb-4">
                <input type="radio" name="testimonial-accordion" />
                <div className="collapse-title text-xl font-medium flex items-center justify-between pr-12">
                  <div>
                    <span className="font-bold text-accent">{testimonial.author}</span>
                    <span className="text-sm opacity-70 ml-2">- {testimonial.position}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
                <div className="collapse-content">
                  <p className="text-base-content">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drawer Sidebar */}
        <div className="drawer-side z-30"  >
          <label
            htmlFor="testimonial-drawer"
            className="drawer-overlay"
            onClick={() => setShowDrawer(false)}
          ></label>
          <div className="p-4 md:w-[40%] w-full sm:w-1/2 overflow-y-scroll bg-base-100 h-[85vh] text-base-content absolute bottom-4 right-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add New Testimonial</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered z-50 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Feedback
                </label>
                <textarea
                  placeholder="Enter feedback"
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setTestimonials((prev) => [
                    ...prev,
                    {
                      name: "New User",
                      feedback: "This is a great testimonial!",
                    },
                  ]);
                  setShowDrawer(false);
                }}
              >
                Save Testimonial
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialLayout;
