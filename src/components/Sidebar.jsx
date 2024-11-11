import { BarChart2, ChevronLeft, ChevronRight, FileText, Home, Settings, Users, X } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose, isCollapsed, setIsCollapsed }) {
    const navigation = [
        { name: 'Overview', path: '/dashboard', icon: Home },
        { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart2 },
        { name: 'Reports', path: '/dashboard/reports', icon: FileText },
        { name: 'Users', path: '/users', icon: Users },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-base-200 
          transition-all duration-300 ease-in-out shadow-sm
          ${isCollapsed ? 'w-16' : 'w-64'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="flex items-center justify-between h-16 px-4">
                    {!isCollapsed && (
                        <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            SCF Admin
                        </h1>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1 ml-auto hover:bg-gray-100 rounded-full transition-colors lg:flex hidden"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        ) : (
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        )}
                    </button>
                    <button onClick={onClose} className="lg:hidden p-1">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="mt-8 px-2">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => window.innerWidth < 1024 && onClose()}
                            className={({ isActive }) =>
                                `flex items-center px-3 py-2 mt-2 rounded-lg transition-all duration-200 group
                ${isCollapsed ? 'justify-center' : ''} 
                ${isActive
                                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                                    : 'text-neutral-content hover:bg-gray-50'
                                }`
                            }
                        >
                            <item.icon className={`w-5 h-5 text-primary ${!isCollapsed && 'mr-3'}`} />
                            {!isCollapsed && (
                                <span className="font-medium">{item.name}</span>
                            )}
                            {isCollapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                                    {item.name}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}

export default Sidebar