
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { MediaLibrary } from "@/components/editor/MediaLibrary";
import { MediaItem } from "@/utils/mediaLibrary";

interface MediaPickerButtonProps {
  onSelect: (url: string) => void;
}

export const MediaPickerButton: React.FC<MediaPickerButtonProps> = ({ onSelect }) => {
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);

  const handleMediaSelect = (mediaItem: MediaItem) => {
    onSelect(mediaItem.url);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsMediaLibraryOpen(true)}
      >
        <ImageIcon className="h-4 w-4 ml-2" />
        اختر من المكتبة
      </Button>

      <MediaLibrary
        isOpen={isMediaLibraryOpen}
        onOpenChange={setIsMediaLibraryOpen}
        onSelect={handleMediaSelect}
      />
    </>
  );
};
