
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PostFormValues } from "./PostFormSchema";
import { getPostById, updatePost } from "@/utils/blogDatabase";

interface UsePostEditorOptions {
  postId?: string;
  onSaveSuccess?: (savedPost: any) => void;
}

export const usePostEditor = ({ postId, onSaveSuccess }: UsePostEditorOptions = {}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [draftKey, setDraftKey] = useState<string>("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [postData, setPostData] = useState<any | null>(null);
  
  // Initialize draft key based on post id (create or edit)
  useEffect(() => {
    if (postId) {
      setDraftKey(`post_edit_draft_${postId}`);
    } else {
      setDraftKey("post_create_draft");
    }
  }, [postId]);
  
  // Load post data if editing existing post
  useEffect(() => {
    if (!postId) {
      setIsLoading(false);
      return;
    }
    
    try {
      // Try to load from draft first
      const savedDraft = localStorage.getItem(`post_edit_draft_${postId}`);
      if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        setPostData(draftData);
        setSelectedImage(draftData.coverImage);
        setIsLoading(false);
        
        toast({
          title: "تم استعادة المسودة",
          description: "تم استعادة آخر مسودة محفوظة",
        });
        return;
      }
      
      // If no draft, load from database
      const post = getPostById(postId);
      if (post) {
        const formData = {
          title: post.title,
          excerpt: post.excerpt,
          content: post.content || "",
          categorySlug: post.categorySlug,
          coverImage: post.coverImage,
          tags: post.tags?.join(", ") || "",
        };
        
        setPostData(formData);
        setSelectedImage(post.coverImage);
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
  }, [postId, navigate, toast]);
  
  // Handle saving draft
  const saveDraft = (values: PostFormValues) => {
    if (!draftKey) return;
    
    localStorage.setItem(draftKey, JSON.stringify(values));
    setLastSaved(new Date());
    
    toast({
      title: "تم حفظ المسودة",
      description: "تم حفظ المسودة بنجاح",
    });
  };
  
  // Update post
  const savePost = async (values: PostFormValues, categories: Array<{ slug: string; name: string }>) => {
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
      
      // Clear draft after successful update
      localStorage.removeItem(draftKey);
      
      toast({
        title: "تم تحديث المقال",
        description: "تم تحديث المقال بنجاح",
      });
      
      if (onSaveSuccess) {
        onSaveSuccess(updatedPost);
      } else {
        navigate("/admin/posts");
      }
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

  // Set up auto-save
  useEffect(() => {
    if (!draftKey) return;
    
    const interval = setInterval(() => {
      if (postData) {
        localStorage.setItem(draftKey, JSON.stringify(postData));
        setLastSaved(new Date());
      }
    }, 30000); // Save every 30 seconds
    
    return () => clearInterval(interval);
  }, [draftKey, postData]);

  return {
    isLoading,
    isSubmitting,
    selectedImage,
    lastSaved,
    postData,
    setSelectedImage,
    setPostData,
    saveDraft,
    savePost,
    navigate
  };
};
