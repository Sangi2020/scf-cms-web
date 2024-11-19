import { Eye, MessageSquare, Share2 } from "lucide-react";
import React from "react";


function BlogCard({ blog }) {
  return (
    <div
      key={blog.id}
      className="card bg-base-200 transition-all duration-300 overflow-hidden group"
    >
      {/* Image Section */}
      <figure className="relative h-48 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={blog.author.avatar} alt={blog.author.name} />
            </div>
          </div>
        </div>
      </figure>

      {/* Content Section */}
      <div className="card-body p-4">
        <p className="text-sm text-neutral-content">{blog.date}</p>
        <h2 className="card-title text-neutral-content text-lg font-bold">
          {blog.title}
        </h2>

        {/* Stats Section */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1 text-neutral-content">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">{blog.stats.comments}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-content">
            <Eye className="w-4 h-4" />
            <span className="text-sm">{blog.stats.views}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-content">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">{blog.stats.shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
