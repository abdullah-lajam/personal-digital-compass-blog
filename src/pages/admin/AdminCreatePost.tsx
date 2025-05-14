
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPost, getAllCategories } from "@/utils/blogDatabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader, Save, ImageIcon } from "lucide-react";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { MediaLibrary } from "@/components/editor/MediaLibrary";
import { MediaItem } from "@/utils/mediaLibrary";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const formSchema = z.object({
  title: z.string().min(5, { message: "العنوان يجب أن يكون على الأقل 5 أحرف" }),
  excerpt: z.string().min(20, { message: "المقتطف يجب أن يكون على الأقل 20 حرف" }),
  content: z.string().min(50, { message: "المحتوى يجب أن يكون على الأقل 50 حرف" }),
  categorySlug: z.string().min(1, { message: "يجب اختيار فئة" }),
  coverImage: z.string().url({ message: "يجب إدخال رابط صورة صحيح" }),
  tags: z.string().optional(),
});

const AdminCreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [draftKey] = useState(`post_draft_${Date.now()}`);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const categories = getAllCategories();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      categorySlug: "",
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      tags: "",
    },
  });
  
  // Load draft on component mount
  React.useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        form.reset(draftData);
        if (draftData.coverImage) {
          setSelectedImage(draftData.coverImage);
        }
        toast({
          title: "تم استعادة المسودة",
          description: "تم استعادة آخر مسودة محفوظة",
        });
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, [draftKey, form, toast]);

  // Save draft periodically
  React.useEffect(() => {
    const interval = setInterval(() => {
      const values = form.getValues();
      localStorage.setItem(draftKey, JSON.stringify(values));
      setLastSaved(new Date());
    }, 30000); // Save every 30 seconds
    
    return () => clearInterval(interval);
  }, [draftKey, form]);

  // Save draft manually
  const handleSaveDraft = () => {
    const values = form.getValues();
    localStorage.setItem(draftKey, JSON.stringify(values));
    setLastSaved(new Date());
    toast({
      title: "تم حفظ المسودة",
      description: "تم حفظ المسودة بنجاح",
    });
  };
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Get the category name from the slug
      const category = categories.find(c => c.slug === values.categorySlug)?.name || values.categorySlug;
      
      // Process tags
      const tagsArray = values.tags ? values.tags.split(",").map(tag => tag.trim()) : [];
      
      // Create new post object
      const newPost = {
        id: Date.now().toString(),
        title: values.title,
        excerpt: values.excerpt,
        content: values.content,
        date: new Date().toLocaleDateString("ar-SA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        category,
        categorySlug: values.categorySlug,
        slug: values.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-"),
        coverImage: values.coverImage,
        tags: tagsArray,
      };
      
      createPost(newPost);
      
      // Clear draft after successful submission
      localStorage.removeItem(draftKey);
      
      toast({
        title: "تم إنشاء المقال",
        description: "تم إنشاء المقال بنجاح",
      });
      
      navigate("/admin/posts");
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء محاولة إنشاء المقال",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle media selection from library
  const handleMediaSelect = (mediaItem: MediaItem) => {
    form.setValue("coverImage", mediaItem.url, { shouldValidate: true });
    setSelectedImage(mediaItem.url);
  };

  return (
    <AdminLayout title="إنشاء مقال جديد">
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان المقال</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل عنوان المقال هنا" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مقتطف المقال</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      content={field.value}
                      onChange={field.onChange}
                      placeholder="أدخل مقتطف المقال هنا (سيظهر في صفحة العرض الرئيسية)"
                      autoSave={false}
                      showHtmlEditor={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>محتوى المقال</FormLabel>
                  <FormControl>
                    <RichTextEditor 
                      content={field.value}
                      onChange={field.onChange}
                      placeholder="أدخل محتوى المقال هنا"
                      autoSave={true}
                      className="min-h-[400px]"
                      showHtmlEditor={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="categorySlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الفئة</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر فئة للمقال" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.slug} value={category.slug}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>صورة الغلاف</FormLabel>
                    <div className="space-y-3">
                      {selectedImage && (
                        <div className="border rounded-md overflow-hidden">
                          <AspectRatio ratio={16 / 9}>
                            <img
                              src={selectedImage}
                              alt="صورة الغلاف"
                              className="w-full h-full object-cover"
                            />
                          </AspectRatio>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <FormControl className="flex-1">
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsMediaLibraryOpen(true)}
                        >
                          <ImageIcon className="h-4 w-4 ml-2" />
                          اختر من المكتبة
                        </Button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوسوم (افصل بينها بفاصلة)</FormLabel>
                  <FormControl>
                    <Input placeholder="وسم-1, وسم-2, وسم-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between flex-wrap gap-4 items-center pt-4">
              <div>
                {lastSaved && (
                  <p className="text-sm text-muted-foreground">
                    آخر حفظ تلقائي: {lastSaved.toLocaleTimeString()}
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/posts")}
                >
                  إلغاء
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                >
                  حفظ كمسودة
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader className="ml-2 h-4 w-4 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save className="ml-2 h-4 w-4" />
                      نشر المقال
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
        
        <MediaLibrary
          isOpen={isMediaLibraryOpen}
          onOpenChange={setIsMediaLibraryOpen}
          onSelect={handleMediaSelect}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminCreatePost;
