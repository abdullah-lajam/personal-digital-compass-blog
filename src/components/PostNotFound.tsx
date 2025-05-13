
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PostNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center flex-grow">
        <h1 className="text-2xl font-bold mb-4">المقالة غير موجودة</h1>
        <p className="text-muted-foreground mb-6">عذراً، لم نتمكن من العثور على المقالة المطلوبة.</p>
        <Button asChild>
          <Link to="/">العودة للصفحة الرئيسية</Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default PostNotFound;
