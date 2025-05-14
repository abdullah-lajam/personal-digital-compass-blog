
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronDown, Edit, EyeIcon, Plus, Trash } from "lucide-react";
import { allPosts } from "@/utils/blogData";
import { BlogPost } from "@/components/BlogCard";

const AdminPosts: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  // Convert nested object structure to flat array
  const postsArray: BlogPost[] = Object.values(allPosts)
    .flatMap((categoryPosts) => Object.values(categoryPosts));

  // Filter posts by search query
  const filteredPosts = postsArray.filter(
    (post) =>
      post.title.includes(searchQuery) ||
      post.excerpt.includes(searchQuery) ||
      post.category.includes(searchQuery)
  );

  const handleDeleteClick = (post: BlogPost) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // This is just a mock - will be replaced with actual delete functionality
    // when we integrate with a database
    console.log("Delete post:", postToDelete);
    setDeleteDialogOpen(false);
    setPostToDelete(null);
    
    // Show a toast message that the action is not available in the demo
    // (We'll implement actual deletion when we connect to a database)
  };

  return (
    <AdminLayout title="إدارة المقالات">
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div className="relative w-full sm:w-64">
          <Input
            placeholder="بحث في المقالات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <Button onClick={() => navigate("/admin/posts/create")} className="w-full sm:w-auto">
          <Plus size={16} className="ml-2" />
          مقال جديد
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>العنوان</TableHead>
              <TableHead className="hidden md:table-cell">القسم</TableHead>
              <TableHead className="hidden md:table-cell">التاريخ</TableHead>
              <TableHead className="w-[100px]">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="truncate max-w-[200px] sm:max-w-xs">
                          {post.title}
                        </span>
                        <span className="text-xs text-muted-foreground md:hidden">
                          {post.category} • {post.date}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.category}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.date}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="sr-only">فتح القائمة</span>
                          <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem
                          onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                        >
                          <Edit size={14} className="ml-2" />
                          تحرير
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => window.open(`/${post.categorySlug}/${post.slug}`, "_blank")}
                        >
                          <EyeIcon size={14} className="ml-2" />
                          عرض
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(post)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash size={14} className="ml-2" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24">
                  لا توجد نتائج للبحث
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد حذف المقال</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من أنك تريد حذف المقال "{postToDelete?.title}"؟ هذا الإجراء لا يمكن التراجع عنه.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              حذف المقال
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPosts;
