import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios";

function BlogPostForm({ onBlogCreated, initialData, mode, setIsDrawerOpen }) {
  import ReactQuill from "react-quill-new";
  import "react-quill-new/dist/quill.snow.css";
  import * as yup from "yup";


  const blogSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .max(100, "Title cannot exceed 100 characters"),

    author: yup
      .string()
      .required("Author name is required")
      .min(2, "Author name must be at least 2 characters"),

    date: yup
      .date()
      .required("Date is required")
      .max(new Date(), "Future dates are not allowed"),

    excerpt: yup
      .string()
      .required("Excerpt is required")
      .min(10, "Excerpt must be at least 10 characters")
      .max(500, "Excerpt cannot exceed 500 characters"),

    content: yup
      .string()
      .required("Content is required")
      .test(
        "min-content-length",
        "Content must be at least 50 characters",
        value => value && value.replace(/<[^>]*>/g, "").trim().length >= 50
      ),

    image: yup
      .mixed()
      .nullable()
      .test(
        "fileFormat",
        "Only JPG, PNG, GIF and WEBP images are allowed",
        value => {
          if (!value) return true; // Image is optional
          const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
          return allowedTypes.includes(value.type);
        }
      )
      .test(
        "fileSize",
        "Image size cannot exceed 2MB",
        value => {
          if (!value) return true; // Image is optional
          return value.size <= 2 * 1024 * 1024;
        }
      )
  });

  function BlogPostForm({ onBlogCreated, initialData, mode, setIsDrawerOpen }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [isPremium, setIsPremium] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const inputRef = useRef(null);



    // Add validation states
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
      if (mode === "edit" && initialData) {
        setTitle(initialData.title || "");
        setAuthor(initialData.author || "");
        setDate(initialData.date || "");
        setExcerpt(initialData.excerpt || "");
        setContent(initialData.content || "");
        setIsPremium(initialData.isPremium || false); // Add this line to set isPremium
        setImagePreview(initialData.image || null);
      } else if (mode === "add") {
        // Reset fields for add mode
        setTitle("");
        setAuthor("");
        setDate("");
        setExcerpt("");
        setContent("");
        setIsPremium(false); // Reset isPremium
        setImageFile(null);
        setImagePreview(null);
      }
    }, [mode, initialData]);
    console.log(isPremium, "premium");

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      resetForm();
    }
  }, [mode, initialData]);
}
  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setDate("");
    setExcerpt("");
    setContent("");
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
    setTouched({});
  };

  // Mark field as touched when user interacts with it
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  // Validate a specific field using Yup
  const validateField = async (field) => {
    try {
      const fieldSchema = yup.reach(blogSchema, field);

      // Get the field's current value
      const value = field === "image" ? imageFile :
        field === "content" ? content :
          field === "excerpt" ? excerpt :
            field === "date" ? date :
              field === "author" ? author : title;

      await fieldSchema.validate(value);

      // Clear error if validation passes
      setErrors(prev => ({ ...prev, [field]: "" }));
      return true;
    } catch (error) {
      // Set error message
      setErrors(prev => ({ ...prev, [field]: error.message }));
      return false;
    }
  };

  // Validate all fields
  const validateForm = async () => {
    // Mark all fields as touched
    const allFields = ["title", "author", "date", "excerpt", "content", "image"];
    const allTouched = allFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});

    setTouched(allTouched);

    try {
      // Validate all fields at once
      await blogSchema.validate(
        {
          title,
          author,
          date,
          excerpt,
          content,
          image: imageFile
        },
        { abortEarly: false }
      );

      setErrors({});
      return true;
    } catch (validationError) {
      // Process all validation errors
      const newErrors = {};
      validationError.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });

      setErrors(newErrors);
      return false;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setTouched(prev => ({ ...prev, image: true }));

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      validateField("image");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !author || !date || !excerpt || !content) {
      toast.error("Please fill in all fields.");

      // Validate all fields before submission
      const isValid = await validateForm();
      if (!isValid) {
        toast.error("Please fix the errors in the form.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("date", date);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("isPremium", isPremium);


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
          console.log(initialData, "dattaa");
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

        // Reset form
        setTitle("");
        setAuthor("");
        setDate("");
        setExcerpt("");
        setContent("");
        setIsPremium(false);
        setImageFile(null);
        setImagePreview(null);

        resetForm();
        setIsDrawerOpen(false);
      } catch (error) {
        console.error("Error handling blog post:", error);
        toast.error("Failed to save blog post. Please try again.");
      }
    };

    return (
      <form onSubmit={handleSubmit} noValidate>
        {/* Title */}
        <div className="form-control mb-4">
          <label className="label"><span className="label-text">Title</span></label>
          <input
            type="text"
            className={`input input-bordered ${errors.title && touched.title ? "input-error" : "border-accent"}`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (touched.title) validateField("title");
            }}
            onBlur={() => handleBlur("title")}
          />
          {errors.title && touched.title && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.title}</span>
            </label>
          )}
        </div>

        {/* Author */}
        <div className="form-control mb-4">
          <label className="label"><span className="label-text">Author</span></label>
          <input
            type="text"
            className={`input input-bordered ${errors.author && touched.author ? "input-error" : "border-accent"}`}
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              if (touched.author) validateField("author");
            }}
            onBlur={() => handleBlur("author")}
          />
          {errors.author && touched.author && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.author}</span>
            </label>
          )}
        </div>

        {/* Date */}
        <div className="form-control mb-4">
          <label className="label"><span className="label-text">Date</span></label>
          <input
            type="date"
            className={`input input-bordered ${errors.date && touched.date ? "input-error" : "border-accent"}`}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (touched.date) validateField("date");
            }}
            onBlur={() => handleBlur("date")}
          />
          {errors.date && touched.date && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.date}</span>
            </label>
          )}
        </div>
        {/* Premium Status Dropdown */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Content Type</span>
          </label>
          <select
            className="select select-bordered border-accent"
            value={isPremium ? "true" : "false"}
            onChange={(e) => setIsPremium(e.target.value === "true")}
          >
            <option value="false">Free Content</option>
            <option value="true">Premium Content</option>
          </select>
        </div>

        {/* Excerpt */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Excerpt</span>
            {touched.excerpt && (
              <span className="label-text-alt">{excerpt.length}/500 characters</span>
            )}
          </label>
          <textarea
            className={`textarea textarea-bordered ${errors.excerpt && touched.excerpt ? "textarea-error" : ""}`}
            value={excerpt}
            onChange={(e) => {
              setExcerpt(e.target.value);
              if (touched.excerpt) validateField("excerpt");
            }}
            onBlur={() => handleBlur("excerpt")}
          ></textarea>
          {errors.excerpt && touched.excerpt && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.excerpt}</span>
            </label>
          )}
        </div>

        {/* Image Upload */}
        <div className="form-control mb-4">
          <label className="label"><span className="label-text">Image</span></label>
          <div
            className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-base-100 ${errors.image && touched.image ? "border-error" : ""}`}
            onClick={() => inputRef.current?.click()}
          >
            {!imagePreview ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary mb-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v3.586l-1.293-1.293a1 1 0 00-1.414 0L10 12l-2.293-2.293a1 1 0 00-1.414 0L4 12V5zm0 10v-1.586l2.293-2.293a1 1 0 011.414 0L10 13l3.293-3.293a1 1 0 011.414 0L16 12.414V15H4z" />
                </svg>
                <p className="text-neutral-content">Drag and drop or click to upload</p>
                <p className="text-xs text-neutral-content mt-1">JPG, PNG, GIF or WEBP (max 2MB)</p>
              </>
            ) : (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg shadow-lg" />
                <button
                  type="button"
                  className="absolute top-2 right-2 btn btn-xs btn-error"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageFile(null);
                    setImagePreview(null);
                    setErrors(prev => ({ ...prev, image: "" }));
                  }}
                >
                  Remove
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/jpeg, image/png, image/gif, image/webp"
              className="hidden"
              ref={inputRef}
              onChange={handleImageChange}
            />
          </div>
          {errors.image && touched.image && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.image}</span>
            </label>
          )}
        </div>

        {/* Content (ReactQuill) */}
        <div className="form-control mb-4">
          <label className="label"><span className="label-text">Content</span></label>
          <div className={errors.content && touched.content ? "border border-error rounded" : ""}>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(value) => {
                setContent(value);
                if (touched.content) validateField("content");
              }}
              onBlur={() => handleBlur("content")}
            />
          </div>
          {errors.content && touched.content && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.content}</span>
            </label>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">{mode === "add" ? "Publish" : "Update"}</button>
        </div>
      </form>
    );
  }
}

  export default BlogPostForm;