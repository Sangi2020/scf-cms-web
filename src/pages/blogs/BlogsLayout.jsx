
import { Search, Eye, Share2, MessageSquare } from 'lucide-react';
import BlogPostForm from './CreateForm';
import BlogCard from './BlogCard';

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
                className="input input-bordered w-full focus:outline-none pl-10 bg-base-300 text-white"
              />
            </div>
            <select className="select select-bordered focus:outline-none bg-base-300 text-white">
              <option>Latest</option>
              <option>Most Viewed</option>
              <option>Most Shared</option>
            </select>
          </div>
  
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {blogs.map((blog) => (
    <BlogCard key={blog.id} blog={blog} /> 
  ))}
</div>

        </div>
  
        {/* Drawer Sidebar */}
        <div className="drawer-side  ">
          <label htmlFor="new-post-drawer" className="drawer-overlay"> helo</label>
          <div
            className="p-4 md:w-1/4 w-full sm:w-1/2 overflow-y-scroll bg-base-100  h-[70vh]  text-base-content absolute bottom-4 right-4 rounded-lg shadow-lg"
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