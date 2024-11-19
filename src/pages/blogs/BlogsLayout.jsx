
import { Search, Eye, Share2, MessageSquare } from 'lucide-react';
import BlogPostForm from './CreateForm';

function BlogsLayout() {
  // Sample blog data
  const blogs = [
    {
      id: 1,
      title: "Whiteboard Templates By Industry Leaders",
      date: "08 Nov 2023",
      image: "https://img.freepik.com/free-photo/front-view-goals-written-note-with-pen-white-background_179666-19381.jpg?ga=GA1.1.188398426.1729686763&semt=ais_hybrid",
      author: {
        name: "John Doe",
        avatar: "https://img.freepik.com/free-vector/geometric-professional-consultant-discord-profile-picture_742173-13190.jpg?ga=GA1.1.188398426.1729686763&semt=ais_hybrid"
      },
      stats: {
        comments: "7.98k",
        views: "8.83k",
        shares: "8.56k"
      }
    },
    {
      id: 2,
      title: "Tesla Cybertruck-inspired camper trailer for Tesla fans",
      date: "09 Apr 2024",
      image: "https://img.freepik.com/free-photo/front-view-goals-written-note-with-pen-white-background_179666-19381.jpg?ga=GA1.1.188398426.1729686763&semt=ais_hybrid",
      author: {
        name: "Jane Smith",
        avatar: "https://img.freepik.com/free-vector/geometric-professional-consultant-discord-profile-picture_742173-13190.jpg?ga=GA1.1.188398426.1729686763&semt=ais_hybrid"
      },
      stats: {
        comments: "7.98k",
        views: "8.83k",
        shares: "8.56k"
      }
    },
    {
      id: 3,
      title: "Designify Agency Landing Page Design",
      date: "12 Sep 2023",
      image: "https://img.freepik.com/free-photo/front-view-goals-written-note-with-pen-white-background_179666-19381.jpg?ga=GA1.1.188398426.1729686763&semt=ais_hybrid",
      author: {
        name: "Mike Johnson",
        avatar: "https://img.freepik.com/free-vector/geometric-professional-consultant-discord-profile-picture_742173-13190.jpg?ga=GA1.1.188398426.1729686763&semt=ais_hybrid"
      },
      stats: {
        comments: "7.98k",
        views: "8.83k",
        shares: "8.56k"
      }
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Drawer */}
      <div className="drawer drawer-end">
        <input id="new-post-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Blog</h1>
            <label htmlFor="new-post-drawer" className="btn btn-primary gap-2">
              + New post
            </label>
          </div>
  
          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search post..."
                className="input input-bordered w-full pl-10 bg-base-200/50 text-white"
              />
            </div>
            <select className="select select-bordered bg-base-200/50 text-white">
              <option>Latest</option>
              <option>Most Viewed</option>
              <option>Most Shared</option>
            </select>
          </div>
  
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="card bg-base-200/30 hover:bg-base-200/40 transition-all duration-300 overflow-hidden group"
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
                  <p className="text-sm text-gray-400">{blog.date}</p>
                  <h2 className="card-title text-white text-lg font-bold">
                    {blog.title}
                  </h2>
  
                  {/* Stats Section */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1 text-gray-400">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{blog.stats.comments}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{blog.stats.views}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">{blog.stats.shares}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Drawer Sidebar */}
        <div className="drawer-side  ">
          <label htmlFor="new-post-drawer" className="drawer-overlay"> helo</label>
          <div
            className="p-4 w-[800px] overflow-y-scroll bg-base-100  h-[70vh]  text-base-content absolute bottom-4 right-4 rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-bold mb-4">Add New Post</h2>
            <BlogPostForm/>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default BlogsLayout;