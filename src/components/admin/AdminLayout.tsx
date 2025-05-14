
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { path: "/admin", icon: <LayoutDashboard size={20} />, label: "لوحة التحكم" },
    { path: "/admin/posts", icon: <FileText size={20} />, label: "المقالات" },
    { path: "/admin/settings", icon: <Settings size={20} />, label: "الإعدادات" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/30">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden p-4 flex items-center justify-between bg-background border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu />
        </Button>
        <h1 className="text-xl font-bold">{title}</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
        </Button>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-background/80 z-50 md:hidden">
          <div className="fixed inset-y-0 right-0 w-3/4 max-w-xs bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">لوحة التحكم</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X />
              </Button>
            </div>
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 space-x-reverse p-3 rounded-lg ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              <Button
                variant="outline"
                className="w-full mt-4 flex items-center justify-center"
                onClick={handleLogout}
              >
                <LogOut size={16} className="ml-2" />
                تسجيل الخروج
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-shrink-0">
        <div className="flex flex-col w-64 border-l bg-background h-screen fixed">
          <div className="flex items-center justify-center h-16 border-b">
            <h2 className="text-xl font-bold">لوحة التحكم</h2>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto p-4">
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 space-x-reverse p-3 rounded-lg ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="pt-4 mt-6 border-t">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={handleLogout}
              >
                <LogOut size={16} className="ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:mr-64">
        <div className="hidden md:block px-6 py-4 bg-background border-b">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
