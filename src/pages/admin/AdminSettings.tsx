
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AdminSettings: React.FC = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ إعدادات المدونة بنجاح",
    });
  };

  return (
    <AdminLayout title="إعدادات المدونة">
      <div className="grid gap-6 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>إعدادات عامة</CardTitle>
            <CardDescription>
              إعدادات المدونة الأساسية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              صفحة الإعدادات قيد التطوير. سيتم تفعيلها قريبًا عند ربط قاعدة البيانات.
            </p>
            <Button onClick={handleSave} className="mt-4">
              حفظ الإعدادات
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
