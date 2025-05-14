
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { allPosts } from "@/utils/blogData";
import { BlogPost } from "@/components/BlogCard";

const AdminEditPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Find the post from allPosts
  const findPost = (): BlogPost | null => {
    for (const categoryKey in allPosts) {
      const category = allPosts[categoryKey];
      for (const postKey in category) {
        const post = category[postKey];
        if (post.id === postId) {
          return post;
        }
      }
    }
    return null;
  };

  const post = findPost();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Display a toast message
    toast({
      title: "المحرر قيد التطوير",
      description: "سيتم تفعيل هذه الميزة قريبًا عند ربط قاعدة البيانات",
    });
  };

  if (!post) {
    return (
      <AdminLayout title="تحرير المقال">
        <div className="bg-background border rounded-lg p-6">
          <p className="text-muted-foreground">المقال غير موجود</p>
          <Button 
            className="mt-4"
            onClick={() => navigate("/admin/posts")}
          >
            العودة إلى قائمة المقالات
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`تحرير: ${post.title}`}>
      <div className="bg-background border rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">محرر المقالات</h2>
              <p className="text-muted-foreground">
                محرر المقالات قيد التطوير. سيتم تفعيله قريبًا عند الانتهاء من ربط قاعدة البيانات.
              </p>
            </div>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/posts")}
              >
                إلغاء
              </Button>
              <Button type="submit">
                حفظ التغييرات
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminEditPost;
