
import React, { useState, useEffect, useCallback } from 'react';
import { 
  getAllMedia, 
  deleteMediaItem, 
  uploadFile, 
  MediaItem 
} from '@/utils/mediaLibrary';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Input } from '@/components/ui/input';
import { Loader, ImageIcon, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaLibraryProps {
  onSelect: (mediaItem: MediaItem) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ 
  onSelect,
  isOpen, 
  onOpenChange 
}) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const { toast } = useToast();

  // Load media items
  const loadMedia = useCallback(() => {
    setIsLoading(true);
    try {
      const mediaItems = getAllMedia();
      setMedia(mediaItems);
    } catch (error) {
      console.error('Error loading media:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل مكتبة الوسائط",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Load media on open
  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen, loadMedia]);

  // Handle file selection
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // Handle drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "خطأ في التحميل",
        description: "يرجى تحميل ملفات صور فقط",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);

    try {
      // Upload the file
      const newMediaItem = await uploadFile(file);
      
      // Update the media list
      setMedia(prev => [newMediaItem, ...prev]);
      
      toast({
        title: "تم التحميل بنجاح",
        description: `تم تحميل ${file.name} بنجاح`,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "خطأ في التحميل",
        description: "حدث خطأ أثناء تحميل الملف",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setUploadProgress(0);
      setIsLoading(false);
    }
  };

  // Handle media item deletion
  const handleDeleteMedia = (id: string) => {
    try {
      deleteMediaItem(id);
      setMedia(prev => prev.filter(item => item.id !== id));
      if (selectedMedia?.id === id) {
        setSelectedMedia(null);
      }
      toast({
        title: "تم الحذف",
        description: "تم حذف الصورة بنجاح",
      });
    } catch (error) {
      console.error('Error deleting media item:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء محاولة حذف الصورة",
        variant: "destructive",
      });
    }
  };

  // Handle media item selection
  const handleSelectMedia = (mediaItem: MediaItem) => {
    setSelectedMedia(mediaItem === selectedMedia ? null : mediaItem);
  };

  // Handle final selection
  const handleConfirmSelection = () => {
    if (selectedMedia) {
      onSelect(selectedMedia);
      onOpenChange(false);
    } else {
      toast({
        title: "اختر صورة",
        description: "الرجاء اختيار صورة أولاً",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>مكتبة الوسائط</DialogTitle>
        </DialogHeader>
        
        {/* Upload area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-colors ${
            isDragging ? 'border-primary bg-primary/10' : 'border-muted'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <ImageIcon size={40} className="text-muted-foreground" />
            <div>
              <p className="mb-2 font-semibold">اسحب الملفات هنا أو</p>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={isLoading}
              >
                تصفح الملفات
              </Button>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelection}
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              PNG، JPG، GIF حتى 5 ميجابايت
            </p>
          </div>
          
          {/* Upload progress */}
          {isLoading && uploadProgress > 0 && (
            <div className="mt-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">{Math.round(uploadProgress)}%</p>
            </div>
          )}
        </div>
        
        {/* Media grid */}
        <div className="flex-1 overflow-y-auto min-h-[300px]">
          {isLoading && media.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <Loader className="h-8 w-8 animate-spin" />
            </div>
          ) : media.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {media.map((item) => (
                <div 
                  key={item.id} 
                  className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                    selectedMedia?.id === item.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-muted-foreground'
                  }`}
                  onClick={() => handleSelectMedia(item)}
                >
                  <div className="relative">
                    <AspectRatio ratio={4/3}>
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <Button 
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMedia(item.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(item.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">لا توجد صور متاحة</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button 
            onClick={handleConfirmSelection} 
            disabled={!selectedMedia}
          >
            <Save className="ml-2 h-4 w-4" />
            استخدام الصورة المحددة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
