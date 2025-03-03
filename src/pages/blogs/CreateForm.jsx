import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function BlogPostForm({ onBlogCreated, initialData, mode, setIsDrawerOpen }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title || "");
      setAuthor(initialData.author || "");
      setDate(initialData.date || "");
      setExcerpt(initialData.excerpt || "");
      setContent(initialData.content || "");
      setImagePreview(initialData.image || null);
    } else if (mode === "add") {
      setTitle("");
      setAuthor("");
      setDate("");
      setExcerpt("");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
    }
  }, [mode, initialData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !author || !date || !excerpt || !content) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("excerpt", excerpt);
    formData.append("content", content);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      let response;
      if (mode === "add") {
        response = await axiosInstance.post("/blog/create-blog", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Blog post created successfully!");
      } else if (mode === "edit" && initialData) {
        response = await axiosInstance.put(
          `/blog/update-blog/${initialData.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setIsDrawerOpen(false);
        toast.success("Blog post updated successfully!");
      }

      if (onBlogCreated) {
        onBlogCreated();
      }

      setTitle("");
      setAuthor("");
      setDate("");
      setExcerpt("");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error handling blog post:", error);
      toast.error("Failed to save blog post. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <div className="form-control mb-4">
        <label className="label"><span className="label-text">Title</span></label>
        <input type="text" className="input input-bordered border-accent" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      {/* Author */}
      <div className="form-control mb-4">
        <label className="label"><span className="label-text">Author</span></label>
        <input type="text" className="input input-bordered border-accent" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>

      {/* Date */}
      <div className="form-control mb-4">
        <label className="label"><span className="label-text">Date</span></label>
        <input type="date" className="input input-bordered border-accent" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      {/* Excerpt */}
      <div className="form-control mb-4">
        <label className="label"><span className="label-text">Excerpt</span></label>
        <textarea className="textarea textarea-bordered" value={excerpt} onChange={(e) => setExcerpt(e.target.value)}></textarea>
      </div>

      {/* Image Upload */}
      <div className="form-control mb-4">
        <label className="label"><span className="label-text">Image</span></label>
        <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-base-100" onClick={() => inputRef.current?.click()}>
          {!imagePreview ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary mb-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v3.586l-1.293-1.293a1 1 0 00-1.414 0L10 12l-2.293-2.293a1 1 0 00-1.414 0L4 12V5zm0 10v-1.586l2.293-2.293a1 1 0 011.414 0L10 13l3.293-3.293a1 1 0 011.414 0L16 12.414V15H4z" />
              </svg>
              <p className="text-neutral-content">Drag and drop or click to upload</p>
            </>
          ) : (
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg shadow-lg" />
              <button type="button" className="absolute top-2 right-2 btn btn-xs btn-error" onClick={() => setImagePreview(null)}>Remove</button>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" ref={inputRef} onChange={(e) => setImageFile(e.target.files[0])} />
        </div>
      </div>

      {/* Content (ReactQuill) */}
      <div className="form-control mb-4">
        <label className="label"><span className="label-text">Content</span></label>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
      </div>

      {/* Submit Button */}
      <div className="form-control">
        <button type="submit" className="btn btn-primary">{mode === "add" ? "Publish" : "Update"}</button>
      </div>
    </form>
  );
}

export default BlogPostForm;
