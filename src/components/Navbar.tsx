
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Settings } from 'lucide-react';

// قائمة بالروابط في شريط التنقل
const navLinks = [
  { text: "الرئيسية", path: "/" },
  { text: "الذكاء الاصطناعي", path: "/ai" },
  { text: "التعليم الإلكتروني", path: "/e-learning" },
  { text: "إدارة الأعمال", path: "/business" },
  { text: "إنسانيات", path: "/humanities" },
  { text: "عن المدونة", path: "/about" },
];

const Navbar: React.FC = () => {
  // حالة لمعرفة إذا كانت القائمة المنسدلة مفتوحة على الهواتف
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="text-2xl font-bold">المدونة</Link>
        </div>
        
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <Link to="/" className="mr-2 text-xl font-bold">المدونة</Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 space-x-reverse md:justify-end">
          <nav className="hidden md:flex items-center space-x-4 space-x-reverse">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className="text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.text}
              </Link>
            ))}
          </nav>
          
          <div className="flex-1 flex justify-end items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">إعدادات</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/admin/login">لوحة التحكم</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* قائمة الهاتف المحمول */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4">
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center py-2 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
