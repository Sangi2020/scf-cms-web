function Header({ onToggleSidebar }) {
    return (
      <header className="fixed top-0 right-0 left-0 bg-white shadow-sm z-30">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <button 
              onClick={onToggleSidebar}
              className="p-1 mr-4 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">SCF Admin</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <User className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </header>
    );
  }