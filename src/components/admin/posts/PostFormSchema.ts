
import { z } from "zod";

export const postFormSchema = z.object({
  title: z.string().min(5, { message: "العنوان يجب أن يكون على الأقل 5 أحرف" }),
  excerpt: z.string().min(20, { message: "المقتطف يجب أن يكون على الأقل 20 حرف" }),
  content: z.string().min(50, { message: "المحتوى يجب أن يكون على الأقل 50 حرف" }),
  categorySlug: z.string().min(1, { message: "يجب اختيار فئة" }),
  coverImage: z.string().url({ message: "يجب إدخال رابط صورة صحيح" }),
  tags: z.string().optional(),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
