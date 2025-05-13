
import React, { useState, useEffect } from 'react';
import { BlogPost } from './BlogCard';

interface BlogPostContentProps {
  post: BlogPost;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sample content as fallback when no HTML file is available
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

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <p>جاري تحميل المحتوى...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none" 
      dangerouslySetInnerHTML={{ __html: post.htmlFile ? htmlContent : sampleContent }} 
    />
  );
};

export default BlogPostContent;
