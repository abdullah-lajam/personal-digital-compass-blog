
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard, { BlogPost } from '../components/BlogCard';
import { getPostsByCategory, getAllCategories } from '../utils/blogDatabase';

// قاموس لعناوين الأقسام - will be populated dynamically
const categoryTitles: Record<string, string> = {
  'ai': 'الذكاء الاصطناعي',
  'e-learning': 'التعليم الإلكتروني',
  'business': 'إدارة الأعمال',
  'humanities': 'إنسانيات',
  'misc': 'تدوينات متفرقة'
};

// قاموس لأوصاف الأقسام
const categoryDescriptions: Record<string, string> = {
  'ai': 'استكشاف أحدث تطورات الذكاء الاصطناعي وتطبيقاته في مختلف المجالات وتأثيره على مستقبل البشرية.',
  'e-learning': 'نظرة معمقة حول منصات وأساليب التعليم الإلكتروني الحديثة والتعلم الذاتي في العصر الرقمي.',
  'business': 'استراتيجيات وأفكار في إدارة الأعمال والقيادة والإنتاجية لبناء مشاريع ناجحة ومستدامة.',
  'humanities': 'تأملات وأفكار في مجالات الفلسفة والأدب والفن والتاريخ وعلاقتها بالحياة المعاصرة.',
  'misc': 'تدوينات متنوعة في مواضيع مختلفة تعكس اهتمامات وأفكار شخصية لا تندرج تحت الأقسام الأخرى.'
};

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<{ slug: string, name: string }[]>([]);
  
  useEffect(() => {
    // Load all categories
    const allCategories = getAllCategories();
    setCategories(allCategories);
    
    // Update categoryTitles with all available categories
    allCategories.forEach(category => {
      categoryTitles[category.slug] = category.name;
    });
    
    // Load posts for this category
    if (categorySlug) {
      const categoryPosts = getPostsByCategory(categorySlug);
      setPosts(categoryPosts);
    }
  }, [categorySlug]);

  const title = categoryTitles[categorySlug || ''] || 'القسم غير موجود';
  const description = categoryDescriptions[categorySlug || ''] || '';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-blog-muted py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            <p className="text-muted-foreground max-w-3xl">{description}</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div key={post.id} className="animate-fade-up">
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-xl font-bold mb-2">لا توجد مقالات في هذا القسم حالياً</h2>
                <p className="text-muted-foreground">سيتم إضافة محتوى جديد قريباً، يرجى العودة لاحقاً.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
