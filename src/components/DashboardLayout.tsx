"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import siteData from "@/data/siteData.json";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const navigation = [
    { name: "Home", href: "/dashboard", icon: "🏠" },
    { name: "About", href: "/dashboard/about", icon: "ℹ️" },
    { name: "Services", href: "/dashboard/services", icon: "🛠️" },
    { name: "Pricing", href: "/dashboard/pricing", icon: "💰" },
    { name: "Contact", href: "/dashboard/contact", icon: "📞" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isSidebarCollapsed ? "lg:w-16" : "w-64"}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Image
              src={siteData.company.logo}
              alt={siteData.company.name}
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className={`text-lg font-bold text-gray-800 transition-opacity duration-300 ${
              isSidebarCollapsed ? "lg:opacity-0 lg:w-0 lg:overflow-hidden" : "opacity-100"
            }`}>
              {siteData.company.name}
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors ${
                  isSidebarCollapsed ? "lg:justify-center" : ""
                }`}
                title={isSidebarCollapsed ? item.name : ""}
              >
                <span className={`text-lg ${isSidebarCollapsed ? "lg:mr-0" : "mr-3"}`}>
                  {item.icon}
                </span>
                <span className={`transition-opacity duration-300 ${
                  isSidebarCollapsed ? "lg:opacity-0 lg:w-0 lg:overflow-hidden" : "opacity-100"
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className={`flex items-center ${isSidebarCollapsed ? "lg:justify-center" : "justify-between"}`}>
            <div className={`flex items-center ${isSidebarCollapsed ? "lg:space-x-0" : "space-x-3"}`}>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className={`transition-opacity duration-300 ${
                isSidebarCollapsed ? "lg:opacity-0 lg:w-0 lg:overflow-hidden" : "opacity-100"
              }`}>
                <p className="text-sm font-medium text-gray-700">{user?.email}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className={`text-gray-500 hover:text-gray-700 transition-colors ${
                isSidebarCollapsed ? "lg:hidden" : ""
              }`}
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Top bar */}
      <div className={`fixed top-0 right-0 left-0 bg-white shadow-sm border-b border-gray-200 z-30 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? "lg:left-16" : "lg:left-64"
      }`}>
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isSidebarCollapsed ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/landing"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              View Public Site
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">Welcome back, {user?.email}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ease-in-out ${isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"}`}>
        {/* Page content */}
        <main className="pt-16 mt-16 pb-8 p-4 sm:p-6 lg:p-8 min-h-screen">
          <div className="max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

