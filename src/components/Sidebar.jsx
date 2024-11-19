import { 
    BarChart2, 
    ChevronLeft, 
    ChevronRight, 
    FileText, 
    Home, 
    Settings, 
    Users, 
    X,
    Layout,
    Image,
    Mail,
    MessageSquare,
    FileImage,
    ShoppingCart,
    Calendar,
    Globe,
    Bell,
    BookOpen,
    Tag,
    Folder,
    PenTool,
    HelpCircle,
    Lock // Added missing Lock icon import
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose, isCollapsed, setIsCollapsed }) {
    const navigation = [
        // Dashboard Section
        { name: 'Overview', path: '/dashboard', icon: Home },
        { name: 'Analytics', path: '/analytics', icon: BarChart2 },
        { name: 'Reports', path: '/reports', icon: FileText },

        // Content Management
        { name: 'Pages', path: '/pages', icon: Layout },
        { name: 'Blog Posts', path: '/posts', icon: PenTool },
        { name: 'Media Library', path: '/media', icon: Image },
        { name: 'Documents', path: '/documents', icon: FileText },
        
        // User Management
        { name: 'Users', path: '/users', icon: Users },
        { name: 'Team Members', path: '/team', icon: Users },
        { name: 'Roles & Permissions', path: '/roles', icon: Lock },
        
        // Marketing
        { name: 'Newsletters', path: '/newsletters', icon: Mail },
        { name: 'Comments', path: '/comments', icon: MessageSquare },
        { name: 'Testimonials', path: '/testimonials', icon: MessageSquare },
        { name: 'Social Media', path: '/social', icon: Globe },
        
        // // E-commerce (if needed)
        // { name: 'Products', path: '/products', icon: ShoppingCart },
        // { name: 'Orders', path: '/orders', icon: ShoppingCart },
        // { name: 'Categories', path: '/categories', icon: Tag },
        
        // Resources
        // { name: 'Events', path: '/events', icon: Calendar },
        // { name: 'Forms', path: '/forms', icon: FileText },
        // { name: 'Gallery', path: '/gallery', icon: FileImage },
        
        // System
        { name: 'Notifications', path: '/notifications', icon: Bell },
        { name: 'SEO', path: '/seo', icon: Globe },
        { name: 'Settings', path: '/settings', icon: Settings },
        { name: 'Help & Docs', path: '/help', icon: HelpCircle }
    ];

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden ${
                    isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-base-200 
                transition-all duration-300 ease-in-out shadow-sm h-full 
                ${isCollapsed ? 'w-16' : 'w-64'} 
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="flex items-center justify-between h-16 px-4 ">
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

                <nav className="mt-8 px-2 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hidden pb-24 ">
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
                                <span className="font-medium overflow-hidden">{item.name}</span>
                            )}
                            {isCollapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900   text-white text-sm rounded-md 
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