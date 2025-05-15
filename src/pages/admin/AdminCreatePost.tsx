
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { PostForm } from "@/components/admin/posts/PostForm";
import { useCreatePost } from "@/components/admin/posts/useCreatePost";

const AdminCreatePost: React.FC = () => {
  const {
    isSubmitting,
    selectedImage,
    lastSaved,
    defaultValues,
    categories,
    setSelectedImage,
    savePost,
    saveDraft,
    navigate,
    loadDraft
  } = useCreatePost();

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
          defaultValues={loadDraft()}
          categories={categories}
          isSubmitting={isSubmitting}
          lastSaved={lastSaved}
          selectedImage={selectedImage}
          onSubmit={savePost}
          onSaveDraft={saveDraft}
          onCancel={handleCancel}
          onImageSelect={handleImageSelect}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminCreatePost;
