
import React from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { getAllCategories } from "@/utils/blogDatabase";
import { PostForm } from "@/components/admin/posts/PostForm";
import { LoadingPostSkeleton } from "@/components/admin/posts/LoadingPostSkeleton";
import { usePostEditor } from "@/components/admin/posts/usePostEditor";
import { PostFormValues } from "@/components/admin/posts/PostFormSchema";

const AdminEditPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const categories = getAllCategories();
  
  const {
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
  } = usePostEditor({ postId });

  // Handle form submission
  const handleSubmit = (values: PostFormValues) => {
    savePost(values, categories);
  };

  // Handle manual draft save
  const handleSaveDraft = () => {
    if (postData) {
      saveDraft(postData);
    }
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
    <AdminLayout title="تحرير المقال">
      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <LoadingPostSkeleton />
        ) : postData && (
          <PostForm
            defaultValues={postData}
            categories={categories}
            isSubmitting={isSubmitting}
            lastSaved={lastSaved}
            selectedImage={selectedImage}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
            onCancel={handleCancel}
            onImageSelect={handleImageSelect}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEditPost;
