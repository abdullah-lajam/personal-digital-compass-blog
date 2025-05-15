
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormValues, postFormSchema } from "./PostFormSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { Loader, Save } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MediaPickerButton } from "./MediaPickerButton";

interface PostFormProps {
  defaultValues: PostFormValues;
  categories: Array<{ slug: string; name: string }>;
  isSubmitting: boolean;
  lastSaved: Date | null;
  selectedImage: string | null;
  onSubmit: (values: PostFormValues) => void;
  onSaveDraft: () => void;
  onCancel: () => void;
  onImageSelect: (url: string) => void;
}

export const PostForm: React.FC<PostFormProps> = ({
  defaultValues,
  categories,
  isSubmitting,
  lastSaved,
  selectedImage,
  onSubmit,
  onSaveDraft,
  onCancel,
  onImageSelect,
}) => {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
  });

  return (
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
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                  placeholder="أدخل مقتطف المقال هنا (سيظهر في صفحة العرض الرئيسية)"
                  autoSave={false}
                  showHtmlEditor={false}
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
                <RichTextEditor 
                  content={field.value}
                  onChange={field.onChange}
                  placeholder="أدخل محتوى المقال هنا"
                  autoSave={true}
                  className="min-h-[400px]"
                  showHtmlEditor={true}
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
                <FormLabel>صورة الغلاف</FormLabel>
                <div className="space-y-3">
                  {selectedImage && (
                    <div className="border rounded-md overflow-hidden">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={selectedImage}
                          alt="صورة الغلاف"
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <FormControl className="flex-1">
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <MediaPickerButton onSelect={(url) => {
                      field.onChange(url);
                      onImageSelect(url);
                    }} />
                  </div>
                </div>
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
        
        <div className="flex justify-between flex-wrap gap-4 items-center pt-4">
          <div>
            {lastSaved && (
              <p className="text-sm text-muted-foreground">
                آخر حفظ تلقائي: {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              إلغاء
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onSaveDraft}
              disabled={isSubmitting}
            >
              حفظ كمسودة
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
        </div>
      </form>
    </Form>
  );
};
