
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blog-dark text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">مدونتي الرقمية</h2>
            <p className="text-gray-300">
              مدونة شخصية تهتم بالذكاء الاصطناعي والتعليم الإلكتروني وإدارة الأعمال والإنسانيات.
            </p>
          </div>

          <div className="mb-6 md:mb-0">
            <h3 className="font-bold mb-4">الأقسام</h3>
            <ul className="space-y-2">
              <li><Link to="/ai" className="text-gray-300 hover:text-white">الذكاء الاصطناعي</Link></li>
              <li><Link to="/e-learning" className="text-gray-300 hover:text-white">التعليم الإلكتروني</Link></li>
              <li><Link to="/business" className="text-gray-300 hover:text-white">إدارة الأعمال</Link></li>
              <li><Link to="/humanities" className="text-gray-300 hover:text-white">إنسانيات</Link></li>
              <li><Link to="/misc" className="text-gray-300 hover:text-white">تدوينات متفرقة</Link></li>
            </ul>
          </div>

          <div className="mb-6 md:mb-0">
            <h3 className="font-bold mb-4">تواصل معي</h3>
            <p className="text-gray-300">
              يمكنك متابعتي على وسائل التواصل الاجتماعي.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row md:justify-between text-center md:text-right">
          <div className="mb-2 md:mb-0">
            <p className="text-sm text-gray-400">&copy; {currentYear} مدونتي الرقمية. جميع الحقوق محفوظة.</p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white ml-4">سياسة الخصوصية</Link>
            <Link to="/about" className="text-sm text-gray-400 hover:text-white">عني</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
