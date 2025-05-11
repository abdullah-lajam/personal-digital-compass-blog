
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const categories = [
    { name: 'الذكاء الاصطناعي', path: '/ai' },
    { name: 'التعليم الإلكتروني', path: '/e-learning' },
    { name: 'إدارة الأعمال', path: '/business' },
    { name: 'إنسانيات', path: '/humanities' },
    { name: 'تدوينات متفرقة', path: '/misc' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-6 w-6 text-blog-primary" />
              <span className="mr-2 text-xl font-heading font-bold text-blog-dark">المدونة الرقمية</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 space-x-reverse">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="px-3 py-2 text-blog-dark hover:text-blog-primary transition-colors font-medium"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 animate-fade-in">
            <div className="flex flex-col">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className="block px-3 py-2 text-blog-dark hover:bg-blog-muted rounded-md mb-1 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
