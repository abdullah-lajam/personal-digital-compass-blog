
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { getAllCategories } from "@/utils/blogDatabase";
import { PostForm } from "@/components/admin/posts/PostForm";
import { PostFormValues, postFormSchema } from "@/components/admin/posts/PostFormSchema";
import { useNavigate } from "react-router-dom";
import { createPost } from "@/utils/blogDatabase";

const AdminCreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80");
  const [draftKey] = useState(`post_draft_${Date.now()}`);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const categories = getAllCategories();
  
  // Default values for the post form
  const defaultValues: PostFormValues = {
    title: "",
    excerpt: "",
    content: "",
    categorySlug: "",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    tags: "",
  };
  
  // Load draft on component mount
  React.useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        if (draftData.coverImage) {
          setSelectedImage(draftData.coverImage);
        }
        toast({
          title: "تم استعادة المسودة",
          description: "تم استعادة آخر مسودة محفوظة",
        });
        return draftData;
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
    return defaultValues;
  }, [draftKey, toast]);

  // Save post to database
  const savePost = async (values: PostFormValues) => {
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

  // Save draft manually
  const handleSaveDraft = () => {
    const formValues = document.querySelector('form')?.elements;
    if (!formValues) return;
    
    const values: Partial<PostFormValues> = {};
    Object.entries(defaultValues).forEach(([key]) => {
      const element = formValues.namedItem(key) as HTMLInputElement;
      if (element) {
        values[key as keyof PostFormValues] = element.value;
      }
    });
    
    localStorage.setItem(draftKey, JSON.stringify(values));
    setLastSaved(new Date());
    toast({
      title: "تم حفظ المسودة",
      description: "تم حفظ المسودة بنجاح",
    });
  };

  // Handle form cancellation
  const handleCancel = () => {
    navigate("/admin/posts");
  };

  // Handle media selection
  const handleImageSelect = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <AdminLayout title="إنشاء مقال جديد">
      <div className="max-w-4xl mx-auto">
        <PostForm
          defaultValues={defaultValues}
          categories={categories}
          isSubmitting={isSubmitting}
          lastSaved={lastSaved}
          selectedImage={selectedImage}
          onSubmit={savePost}
          onSaveDraft={handleSaveDraft}
          onCancel={handleCancel}
          onImageSelect={handleImageSelect}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminCreatePost;
