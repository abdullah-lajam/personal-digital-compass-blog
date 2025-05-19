import { BlogPost } from '../components/BlogCard';

// بيانات وهمية للمقالات
export const allPosts: Record<string, Record<string, BlogPost>> = {
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
    },
    // إضافة تدوينة جديدة هنا
    'prompt-engineering': {
      id: '12',
      title: 'هندسة الموجهات: فن صياغة التعليمات للذكاء الاصطناعي',
      excerpt: 'دليل شامل حول كيفية صياغة الموجهات الفعالة للحصول على أفضل النتائج من نماذج الذكاء الاصطناعي التوليدي.',
      date: '18 مايو 2025',
      category: 'الذكاء الاصطناعي',
      categorySlug: 'ai',
      slug: 'prompt-engineering',
      coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
      tags: ['ذكاء-اصطناعي', 'هندسة-الموجهات', 'تعلم-آلي'],
      htmlFile: '/content/ai/prompt-engineering.html'
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
