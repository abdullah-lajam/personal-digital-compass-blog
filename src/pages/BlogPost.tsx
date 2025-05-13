
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BlogPost } from '../components/BlogCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// بيانات وهمية للمقالات (يمكن استخدام نفس البيانات من CategoryPage)
const allPosts: Record<string, Record<string, BlogPost>> = {
  'ai': {
    'ai-future-of-work': {
      id: '1',
      title: 'كيف سيغير الذكاء الاصطناعي مستقبل العمل؟',
      excerpt: 'نظرة تحليلية لتأثير تقنيات الذكاء الاصطناعي على سوق العمل والمهارات المطلوبة في المستقبل القريب.',
      date: '10 مايو 2025',
      category: 'الذكاء الاصطناعي',
      categorySlug: 'ai',
      slug: 'ai-future-of-work',
      coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
      tags: ['ذكاء-اصطناعي', 'مستقبل-العمل', 'تكنولوجيا'],
      htmlFile: '/content/ai/ai-future-of-work.html'
    },
    'evaluating-generative-ai': {
      id: '6',
      title: 'تقييم نماذج الذكاء الاصطناعي التوليدي',
      excerpt: 'مقارنة بين أحدث نماذج الذكاء الاصطناعي التوليدي وتطبيقاتها العملية في مختلف المجالات.',
      date: '20 أبريل 2025',
      category: 'الذكاء الاصطناعي',
      categorySlug: 'ai',
      slug: 'evaluating-generative-ai',
      coverImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80',
      tags: ['ذكاء-اصطناعي', 'تعلم-آلي', 'تقنية'],
      htmlFile: '/content/ai/evaluating-generative-ai.html'
    },
    'ai-ethics': {
      id: '10',
      title: 'أخلاقيات الذكاء الاصطناعي',
      excerpt: 'مناقشة القضايا الأخلاقية المتعلقة بتطوير واستخدام تقنيات الذكاء الاصطناعي وكيفية معالجتها.',
      date: '5 أبريل 2025',
      category: 'الذكاء الاصطناعي',
      categorySlug: 'ai',
      slug: 'ai-ethics',
      coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
      tags: ['أخلاقيات', 'ذكاء-اصطناعي', 'تكنولوجيا'],
      htmlFile: '/content/ai/ai-ethics.html'
    }
  },
  'e-learning': {
    'best-elearning-platforms-2025': {
      id: '2',
      title: 'أفضل منصات التعلم الإلكتروني في 2025',
      excerpt: 'مراجعة شاملة لأهم منصات التعليم الإلكتروني وكيفية اختيار المنصة المناسبة لاحتياجاتك التعليمية.',
      date: '5 مايو 2025',
      category: 'التعليم الإلكتروني',
      categorySlug: 'e-learning',
      slug: 'best-elearning-platforms-2025',
      coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
      tags: ['تعليم-إلكتروني', 'منصات-تعليمية', 'تعلم-ذاتي']
    }
  }
};

// محتوى المقالة المثالي
const sampleContent = `
<h2>مقدمة</h2>
<p>هذا هو نص تجريبي لمحتوى المقالة. في مشروع حقيقي، يمكن تخزين هذا المحتوى في قاعدة بيانات أو ملفات Markdown واستدعاؤه ديناميكياً. يمكن استخدام أي مكتبة لعرض المحتوى بتنسيق HTML أو Markdown.</p>

<p>لوريم إيبسوم هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولا يزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة برص مجموعة من الأحرف بشكل عشوائي أخذتها من نص، لتكوّن كتيّب بمثابة دليل أو مرجع شكلي لهذه الأحرف.</p>

<h2>العنوان الفرعي الأول</h2>
<p>خمسة قرون من الزمن لم تقضي على هذا النص، بل انه حتى صار مستخدماً وبشكله الأصلي في الطباعة والتنضيد الإلكتروني. انتشر بشكل كبير في ستينيّات هذا القرن مع إصدار رقائق "ليتراسيت" (Letraset) البلاستيكية تحوي مقاطع من هذا النص، وعاد لينتشر مرة أخرى مؤخراَ مع ظهور برامج النشر الإلكتروني مثل "ألدوس بايج مايكر" (Aldus PageMaker) والتي حوت أيضاً على نسخ من نص لوريم إيبسوم.</p>

<h2>العنوان الفرعي الثاني</h2>
<p>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء.</p>

<h2>الخلاصة</h2>
<p>العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل افتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum" في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها.</p>
`;

const BlogPostPage: React.FC = () => {
  const { categorySlug, postSlug } = useParams<{ categorySlug: string; postSlug: string }>();
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const post = categorySlug && postSlug && allPosts[categorySlug] 
    ? allPosts[categorySlug][postSlug] 
    : null;

  useEffect(() => {
    if (post?.htmlFile) {
      setIsLoading(true);
      fetch(post.htmlFile)
        .then(response => {
          if (!response.ok) {
            throw new Error('فشل تحميل المحتوى');
          }
          return response.text();
        })
        .then(html => {
          // استخراج محتوى الـ body فقط من ملف HTML
          const bodyContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || html;
          setHtmlContent(bodyContent);
          setError(null);
        })
        .catch(err => {
          console.error('خطأ في تحميل المحتوى:', err);
          setError('حدث خطأ أثناء تحميل المحتوى. يرجى المحاولة مرة أخرى.');
          setHtmlContent('');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [post]);

  if (!post) {
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
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header with Featured Image */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50">
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
              <Link 
                to={`/${post.categorySlug}`} 
                className="text-white bg-blog-primary px-3 py-1 rounded-full text-sm mb-3 inline-block hover:bg-blog-secondary transition-colors"
              >
                {post.category}
              </Link>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{post.title}</h1>
              <p className="text-white text-opacity-80">نُشر بتاريخ {post.date}</p>
            </div>
          </div>
        </div>
        
        {/* Article Content */}
        <article className="blog-container max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to={`/${post.categorySlug}`} className="flex items-center text-blog-primary hover:underline">
              <ArrowLeft className="h-4 w-4 ml-2" />
              <span>العودة إلى {post.category}</span>
            </Link>
          </div>
          
          {isLoading && (
            <div className="py-8 text-center">
              <p>جاري تحميل المحتوى...</p>
            </div>
          )}
          
          {error && (
            <div className="py-8 text-center text-red-500">
              <p>{error}</p>
            </div>
          )}
          
          {!isLoading && !error && (
            <div className="prose prose-lg max-w-none" 
              dangerouslySetInnerHTML={{ __html: post.htmlFile ? htmlContent : sampleContent }} 
            />
          )}
          
          <div className="flex flex-wrap mt-8 pt-6 border-t">
            {post.tags.map((tag, index) => (
              <span key={index} className="blog-tag">#{tag}</span>
            ))}
          </div>
          
          {/* Author Section */}
          <div className="mt-12 pt-8 border-t flex items-center">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-blog-primary text-white flex items-center justify-center text-2xl font-bold">
                ع
              </div>
            </div>
            <div className="mr-4">
              <h3 className="font-bold text-lg">عبد الله</h3>
              <p className="text-muted-foreground">مؤسس المدونة الرقمية ومهتم بالتقنية والتطوير الذاتي</p>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
