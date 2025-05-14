
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Skeleton } from "@/components/ui/skeleton";
import { getAllCategories, getPostById, updatePost } from "@/utils/blogDatabase";
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

const AdminEditPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const categories = getAllCategories();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      categorySlug: "",
      coverImage: "",
      tags: "",
    },
  });
  
  useEffect(() => {
    if (postId) {
      try {
        const post = getPostById(postId);
        if (post) {
          form.reset({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content || "",
            categorySlug: post.categorySlug,
            coverImage: post.coverImage,
            tags: post.tags?.join(", ") || "",
          });
        } else {
          toast({
            title: "خطأ",
            description: "لم يتم العثور على المقال",
            variant: "destructive",
          });
          navigate("/admin/posts");
        }
      } catch (error) {
        console.error("Error loading post:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء تحميل بيانات المقال",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [postId, form, navigate, toast]);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!postId) return;
    
    setIsSubmitting(true);
    
    try {
      const post = getPostById(postId);
      
      if (!post) {
        toast({
          title: "خطأ",
          description: "لم يتم العثور على المقال",
          variant: "destructive",
        });
        return;
      }
      
      // Get the category name from the slug
      const category = categories.find(c => c.slug === values.categorySlug)?.name || values.categorySlug;
      
      // Process tags
      const tagsArray = values.tags ? values.tags.split(",").map(tag => tag.trim()) : [];
      
      // Update post object
      const updatedPost = {
        ...post,
        title: values.title,
        excerpt: values.excerpt,
        content: values.content,
        category,
        categorySlug: values.categorySlug,
        coverImage: values.coverImage,
        tags: tagsArray,
      };
      
      updatePost(updatedPost);
      
      toast({
        title: "تم تحديث المقال",
        description: "تم تحديث المقال بنجاح",
      });
      
      navigate("/admin/posts");
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء محاولة تحديث المقال",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout title="تحرير المقال">
      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-64 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
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
                      حفظ التغييرات
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEditPost;
