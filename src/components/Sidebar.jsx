import {
    BarChart2,
    ChevronLeft,
    ChevronRight,
    FileText,
    Home,
    Settings,
    Users,
    Briefcase,
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
    Lock
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function Sidebar({ isOpen, onClose, isCollapsed, setIsCollapsed }) {
    const navigation = [
        {
            section: "Dashboard",
            items: [
                { name: 'Dashboard', path: '/', icon: Home },
                { name: 'Analytics', path: '/analytics', icon: BarChart2 },
                // { name: 'Reports', path: '/reports', icon: FileText },
                { name: 'Enquiries', path: '/enquiries', icon: FileText },
            ]
        },
        {
            section: "Content Management",
            items: [
                { name: 'Pages', path: '/pages', icon: Layout },
                { name: 'Blog Posts', path: '/posts', icon: PenTool },
                { name: 'Clients', path: '/clients', icon: Briefcase },
                { name: 'Documents', path: '/documents', icon: FileText },
            ]
        },
        {
            section: "User Management",
            items: [
                { name: 'Users', path: '/users', icon: Users },
                { name: 'Team Members', path: '/team', icon: Users },
                { name: 'Roles & Permissions', path: '/roles', icon: Lock },
            ]
        },
        {
            section: "Marketing",
            items: [
                { name: 'Newsletters', path: '/newsletters', icon: Mail },
                { name: 'Comments', path: '/comments', icon: MessageSquare },
                { name: 'Testimonials', path: '/testimonials', icon: MessageSquare },
                { name: 'Social Media', path: '/social', icon: Globe },
            ]
        },
        {
            section: "System",
            items: [
                { name: 'Notifications', path: '/notifications', icon: Bell },
                { name: 'SEO', path: '/seo', icon: Globe },
                { name: 'Settings', path: '/settings', icon: Settings },
                { name: 'Help & Docs', path: '/help', icon: HelpCircle }
            ]
        }
    ];

    const NavItem = ({ item, isActive }) => {
        const content = (
            <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                    <item.icon
                        className={`w-7 h-7 text-primary group-hover:text-white ${
                            isActive ? 'text-white' : ''
                        }`}
                    />
                </div>
                <span
                    className={`ml-3 font-medium  ease-in-out ${
                        isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                    } ${isActive ? 'text-white' : ''}`}
                    style={{
                        transform: isCollapsed ? 'translateX(-20px)' : 'translateX(0)',
                        display: isCollapsed ? 'none' : 'block'
                    }}
                >
                    {item.name}
                </span>
            </div>
        );

        return isCollapsed ? (
            <Tippy
                content={<div className="font-medium  " >{item.name}</div>}
                placement="right"
                arrow={true}
                className="tippy-box ml-2 "
            >
                {content}
            </Tippy>
        ) : (
            content
        );
    };

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
                <div className="flex items-center justify-between h-16 px-3">
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isCollapsed ? 'w-0' : 'w-40'
                    }`}>
                                   <img src="https://www.scfstrategies.com/_next/image?url=%2Fimages%2Flogo.png&w=96&q=75" alt="" className="h-10 w-auto rounded-sm"/>
                                   </div>

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2  focus:outline-none text-white rounded-xl shadow-md transition-all duration-300 ease-in-out lg:flex hidden"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-5 h-5 text-neutral-content" />
                        ) : (
                            <ChevronLeft className="w-5 h-5 text-neutral-content" />
                        )}
                    </button>
                    <button onClick={onClose} className="lg:hidden p-1">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="px-2 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hidden pb-24">
                    {navigation.map((section, index) => (
                        <div key={section.section} className={`${index > 0 ? 'mt-6' : 'mt-2'}`}>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                isCollapsed ? 'h-0 opacity-0' : 'h-6 opacity-100'
                            }`}>
                                <h2 className="text-xs font-semibold text-neutral-content/70 uppercase tracking-wider px-2 mb-2">
                                    {section.section}
                                </h2>
                            </div>
                            {section.items.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => window.innerWidth < 1024 && onClose()}
                                    className={({ isActive }) =>
                                        `flex mx-auto px-2 py-2 mt-2 rounded-lg duration-300 ease-in-out group relative
                                        ${isActive
                                            ? 'bg-primary text-white'
                                            : 'text-neutral-content hover:bg-primary/30 hover:text-white'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <NavItem item={item} isActive={isActive} />
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Add custom styles for Tippy */}
            <style>{`
                .tippy-box {
                    background-color: rgb(17, 24, 39);
                }
                .tippy-arrow {
                    color: rgb(17, 24, 39);
                }
            `}</style>
        </>
    );
}

export default Sidebar;