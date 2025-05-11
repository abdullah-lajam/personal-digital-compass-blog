
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard, { BlogPost } from '../components/BlogCard';

// قاموس لعناوين الأقسام
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

// بيانات وهمية للمقالات حسب الفئة
const postsByCategory: Record<string, BlogPost[]> = {
  'ai': [
    {
      id: '1',
      title: 'كيف سيغير الذكاء الاصطناعي مستقبل العمل؟',
      excerpt: 'نظرة تحليلية لتأثير تقنيات الذكاء الاصطناعي على سوق العمل والمهارات المطلوبة في المستقبل القريب.',
      date: '10 مايو 2025',
      category: 'الذكاء الاصطناعي',
      categorySlug: 'ai',
      slug: 'ai-future-of-work',
      coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
      tags: ['ذكاء-اصطناعي', 'مستقبل-العمل', 'تكنولوجيا']
    },
    {
      id: '6',
      title: 'تقييم نماذج الذكاء الاصطناعي التوليدي',
      excerpt: 'مقارنة بين أحدث نماذج الذكاء الاصطناعي التوليدي وتطبيقاتها العملية في مختلف المجالات.',
      date: '20 أبريل 2025',
      category: 'الذكاء الاصطناعي',
      categorySlug: 'ai',
      slug: 'evaluating-generative-ai',
      coverImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80',
      tags: ['ذكاء-اصطناعي', 'تعلم-آلي', 'تقنية']
    },
    {
      id: '10',
      title: 'أخلاقيات الذكاء الاصطناعي',
      excerpt: 'مناقشة القضايا الأخلاقية المتعلقة بتطوير واستخدام تقنيات الذكاء الاصطناعي وكيفية معالجتها.',
      date: '5 أبريل 2025',
      category: 'الذكاء الاصطناعي',
      categorySlug: 'ai',
      slug: 'ai-ethics',
      coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
      tags: ['أخلاقيات', 'ذكاء-اصطناعي', 'تكنولوجيا']
    }
  ],
  'e-learning': [
    {
      id: '2',
      title: 'أفضل منصات التعلم الإلكتروني في 2025',
      excerpt: 'مراجعة شاملة لأهم منصات التعليم الإلكتروني وكيفية اختيار المنصة المناسبة لاحتياجاتك التعليمية.',
      date: '5 مايو 2025',
      category: 'التعليم الإلكتروني',
      categorySlug: 'e-learning',
      slug: 'best-elearning-platforms-2025',
      coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
      tags: ['تعليم-إلكتروني', 'منصات-تعليمية', 'تعلم-ذاتي']
    },
    {
      id: '7',
      title: 'مهارات القرن الـ21 في التعليم الحديث',
      excerpt: 'استكشاف المهارات الضرورية التي يجب تنميتها لدى الطلاب للنجاح في عالم متغير بسرعة.',
      date: '15 أبريل 2025',
      category: 'التعليم الإلكتروني',
      categorySlug: 'e-learning',
      slug: '21st-century-skills',
      coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      tags: ['مهارات-القرن-21', 'تعليم', 'تطوير-ذاتي']
    }
  ],
  'business': [
    {
      id: '3',
      title: 'استراتيجيات إدارة الوقت للمدراء التنفيذيين',
      excerpt: 'أساليب عملية وتقنيات فعالة لإدارة الوقت بشكل أفضل وزيادة الإنتاجية في المناصب القيادية.',
      date: '1 مايو 2025',
      category: 'إدارة الأعمال',
      categorySlug: 'business',
      slug: 'time-management-executives',
      coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      tags: ['إدارة-الوقت', 'إنتاجية', 'قيادة']
    },
    {
      id: '8',
      title: 'الاستدامة في إدارة الأعمال',
      excerpt: 'كيفية دمج ممارسات الاستدامة في استراتيجيات الشركات وتأثيرها على الأداء المالي طويل المدى.',
      date: '12 أبريل 2025',
      category: 'إدارة الأعمال',
      categorySlug: 'business',
      slug: 'sustainability-business-management',
      coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
      tags: ['استدامة', 'إدارة-أعمال', 'مسؤولية-اجتماعية']
    }
  ],
  'humanities': [
    {
      id: '4',
      title: 'التعاطف في عصر الرقمنة',
      excerpt: 'كيف يمكننا الحفاظ على قيم التعاطف والإنسانية في عالم يزداد اعتماداً على التكنولوجيا والتواصل الافتراضي.',
      date: '29 أبريل 2025',
      category: 'إنسانيات',
      categorySlug: 'humanities',
      slug: 'empathy-digital-age',
      coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      tags: ['إنسانية', 'تعاطف', 'تكنولوجيا']
    },
    {
      id: '9',
      title: 'دور الأدب في تشكيل الوعي الإنساني',
      excerpt: 'نظرة تحليلية لتأثير الأدب على فهمنا للعالم والذات والآخر عبر العصور المختلفة.',
      date: '8 أبريل 2025',
      category: 'إنسانيات',
      categorySlug: 'humanities',
      slug: 'literature-human-consciousness',
      coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
      tags: ['أدب', 'وعي', 'ثقافة']
    }
  ],
  'misc': [
    {
      id: '5',
      title: 'رحلتي مع الكتابة: قصة شغف',
      excerpt: 'تجربة شخصية في عالم الكتابة والتدوين، والدروس المستفادة خلال رحلة خمس سنوات من النشر المستمر.',
      date: '25 أبريل 2025',
      category: 'تدوينات متفرقة',
      categorySlug: 'misc',
      slug: 'writing-journey',
      coverImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80',
      tags: ['كتابة', 'تجارب-شخصية', 'إلهام']
    }
  ]
};

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const title = categoryTitles[categorySlug || ''] || 'القسم غير موجود';
  const description = categoryDescriptions[categorySlug || ''] || '';
  const posts = categorySlug ? postsByCategory[categorySlug] || [] : [];

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
