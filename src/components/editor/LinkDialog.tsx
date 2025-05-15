
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  onUrlChange: (url: string) => void;
  onAddLink: () => void;
}

export const LinkDialog: React.FC<LinkDialogProps> = ({
  open,
  onOpenChange,
  url,
  onUrlChange,
  onAddLink,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة رابط</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            type="url"
            placeholder="أدخل رابط URL هنا"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            className="mb-4"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button onClick={onAddLink}>
              إضافة الرابط
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
