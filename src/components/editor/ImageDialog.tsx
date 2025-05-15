
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  onUrlChange: (url: string) => void;
  onAddImage: () => void;
}

export const ImageDialog: React.FC<ImageDialogProps> = ({
  open,
  onOpenChange,
  url,
  onUrlChange,
  onAddImage,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة صورة</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            type="url"
            placeholder="أدخل رابط الصورة هنا"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            className="mb-4"
          />
          {url && url !== 'https://' && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">معاينة:</p>
              <div className="w-full max-w-sm border rounded overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={url}
                    alt="معاينة الصورة"
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </AspectRatio>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button onClick={onAddImage}>
              إضافة الصورة
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
