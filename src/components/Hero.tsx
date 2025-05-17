
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blog-primary to-blog-secondary text-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center md:text-right">
        <div className="max-w-3xl md:mr-0 md:ml-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 animate-fade-up">
            مرحباً بك في مدونتي الرقمية
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            مساحة شخصية للتفكير والتعلم ومشاركة المعرفة في مجالات التكنولوجيا والتعليم وإدارة الأعمال والإنسانيات
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Button asChild className="bg-white text-blog-primary hover:bg-gray-100">
              <Link to="/about">تعرف علي <ArrowRight className="mr-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild className="bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/ai">استكشف المقالات</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path fill="white" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,143.53,111.44,221.36,101.44Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
