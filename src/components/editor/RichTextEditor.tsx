
import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  Code, Image as ImageIcon, Link as LinkIcon, 
  ListOrdered, List, Quote, Undo, Redo,
  Code as CodeIcon
} from "lucide-react";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import './editor.css'; // Import editor styles

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  autoSave?: boolean;
  className?: string;
  showHtmlEditor?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'اكتب هنا...',
  autoSave = false,
  className,
  showHtmlEditor = false,
}) => {
  const [html, setHtml] = useState<string>(content);
  const [showHtml, setShowHtml] = useState<boolean>(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>('https://');
  const [imageDialogOpen, setImageDialogOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('https://');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Initialize lowlight
  const lowlight = createLowlight(common);

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({ placeholder }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      TextStyle,
      Color,
      Highlight,
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setHtml(newContent);
      onChange(newContent);
    },
  });

  // Handle HTML direct editing
  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setHtml(newHtml);
    if (editor) {
      editor.commands.setContent(newHtml);
      onChange(newHtml);
    }
  };

  // Set up autosave if enabled
  useEffect(() => {
    let saveInterval: number;
    
    if (autoSave && editor) {
      saveInterval = window.setInterval(() => {
        const editorContent = editor.getHTML();
        if (editorContent !== content) {
          onChange(editorContent);
          setLastSaved(new Date());
        }
      }, 10000); // Auto-save every 10 seconds
    }
    
    return () => {
      if (saveInterval) clearInterval(saveInterval);
    };
  }, [autoSave, editor, onChange, content]);

  // Add link
  const addLink = useCallback(() => {
    if (!editor) return;
    
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }
    
    setLinkDialogOpen(false);
    setLinkUrl('https://');
  }, [editor, linkUrl]);

  // Add image
  const addImage = useCallback(() => {
    if (!editor) return;
    
    if (imageUrl) {
      editor.commands.insertContent(`<img src="${imageUrl}" alt="Image" />`);
    }
    
    setImageDialogOpen(false);
    setImageUrl('https://');
  }, [editor, imageUrl]);

  // Button to toggle between visual and HTML editing modes
  const toggleHtmlMode = () => {
    setShowHtml(!showHtml);
  };

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className={cn("rich-text-editor border rounded-md", className)}>
      <div className="editor-toolbar flex flex-wrap items-center gap-1 p-2 border-b bg-muted/30">
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-muted' : ''}
        >
          <Bold size={18} />
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-muted' : ''}
        >
          <Italic size={18} />
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-muted' : ''}
        >
          <UnderlineIcon size={18} />
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => setLinkDialogOpen(true)}
          className={editor.isActive('link') ? 'bg-muted' : ''}
        >
          <LinkIcon size={18} />
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => setImageDialogOpen(true)}
        >
          <ImageIcon size={18} />
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-muted' : ''}
        >
          <List size={18} />
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-muted' : ''}
        >
          <ListOrdered size={18} />
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-muted' : ''}
        >
          <Quote size={18} />
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-muted' : ''}
        >
          <CodeIcon size={18} />
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo size={18} />
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo size={18} />
        </Button>
        
        {showHtmlEditor && (
          <>
            <Separator orientation="vertical" className="h-6 mr-auto" />
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={toggleHtmlMode}
              className="mr-1"
            >
              <Code className="mr-2" size={16} />
              {showHtml ? 'رجوع للمحرر المرئي' : 'تحرير HTML'}
            </Button>
          </>
        )}
      </div>
      
      <div className="editor-content p-4">
        {!showHtml ? (
          <EditorContent editor={editor} className="min-h-[200px] prose max-w-none" />
        ) : (
          <textarea
            value={html}
            onChange={handleHtmlChange}
            className="w-full h-[400px] font-mono text-sm p-2 border rounded"
          />
        )}
      </div>
      
      {autoSave && lastSaved && (
        <div className="text-xs text-muted-foreground p-2 border-t">
          تم الحفظ تلقائياً: {lastSaved.toLocaleTimeString()}
        </div>
      )}
      
      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة رابط</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="url"
              placeholder="أدخل رابط URL هنا"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={addLink}>
                إضافة الرابط
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة صورة</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="url"
              placeholder="أدخل رابط الصورة هنا"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mb-4"
            />
            {imageUrl && imageUrl !== 'https://' && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">معاينة:</p>
                <div className="w-full max-w-sm border rounded overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={imageUrl}
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
              <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={addImage}>
                إضافة الصورة
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
