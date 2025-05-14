
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminCreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Display a toast message
    toast({
      title: "المحرر قيد التطوير",
      description: "سيتم تفعيل هذه الميزة قريبًا عند ربط قاعدة البيانات",
    });
  };

  return (
    <AdminLayout title="إنشاء مقال جديد">
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
                حفظ المقال
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminCreatePost;
