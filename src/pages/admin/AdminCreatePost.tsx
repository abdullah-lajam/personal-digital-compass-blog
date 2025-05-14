
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Loader, Save } from "lucide-react";

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
                    <Textarea 
                      placeholder="أدخل مقتطف المقال هنا (سيظهر في صفحة العرض الرئيسية)" 
                      rows={3}
                      {...field} 
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
                    <Textarea 
                      placeholder="أدخل محتوى المقال هنا" 
                      rows={12} 
                      {...field} 
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
                    <FormLabel>رابط صورة الغلاف</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
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
            
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/posts")}
              >
                إلغاء
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
                    حفظ المقال
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AdminCreatePost;
