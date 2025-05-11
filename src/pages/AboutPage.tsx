
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BookOpen, Mail, User, FileText, MessageSquare } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-blog-primary text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">من نحن</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              مرحباً بك في المدونة الرقمية، مساحتنا الشخصية لمشاركة المعرفة والأفكار في مجالات متنوعة
            </p>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-12 pb-6 border-b">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">قصتنا</h2>
              <p className="text-lg mb-4">
                بدأت المدونة الرقمية كمشروع شخصي في عام 2023 برغبة في مشاركة المعرفة والتجارب في مجالات متعددة، 
                من التقنية والذكاء الاصطناعي إلى التعليم والإنسانيات.
              </p>
              <p className="text-lg mb-4">
                مع مرور الوقت، تطورت المدونة لتصبح منصة متخصصة تُقدم محتوى عربي أصيل وعميق في مجالات 
                كانت تفتقر إلى المحتوى العربي الجيد. نسعى دوماً لتقديم محتوى موثوق، مُدعم بالمصادر،
                ويضيف قيمة حقيقية للقارئ.
              </p>
              <p className="text-lg mb-4">
                نؤمن بأن المعرفة حق للجميع، وأن مشاركتها هي مسؤولية مجتمعية. لذا، نسعى لجعل جميع 
                محتوياتنا سهلة الوصول ومفيدة لأكبر شريحة ممكنة من القراء.
              </p>
            </div>
            
            <div className="mb-12 pb-6 border-b">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">الرؤية والرسالة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blog-muted p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">رؤيتنا</h3>
                  <p>
                    أن نصبح مرجعاً موثوقاً للمعرفة في مجالات التقنية والتعليم وإدارة الأعمال والإنسانيات في المحتوى العربي.
                  </p>
                </div>
                <div className="bg-blog-muted p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">رسالتنا</h3>
                  <p>
                    إثراء المحتوى العربي بمقالات عميقة ومفيدة تساعد القراء على فهم التطورات العالمية وتطوير مهاراتهم واكتساب رؤى جديدة حول العالم من حولهم.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">تواصل معنا</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blog-muted flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blog-primary" />
                  </div>
                  <h3 className="font-bold mb-2">البريد الإلكتروني</h3>
                  <p className="text-sm">contact@mydigitalblog.com</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blog-muted flex items-center justify-center">
                    <User className="w-6 h-6 text-blog-primary" />
                  </div>
                  <h3 className="font-bold mb-2">الكاتب</h3>
                  <p className="text-sm">عبد الله</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blog-muted flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blog-primary" />
                  </div>
                  <h3 className="font-bold mb-2">المقالات</h3>
                  <p className="text-sm">نُشرت أكثر من 50 مقالة</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blog-muted flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blog-primary" />
                  </div>
                  <h3 className="font-bold mb-2">تأسست</h3>
                  <p className="text-sm">2023</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
