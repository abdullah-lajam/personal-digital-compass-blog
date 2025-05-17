
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Bold, Italic, Underline, Link as LinkIcon, Image, List, ListOrdered, Quote, Code, Undo, Redo, FileCode } from 'lucide-react';
import { type Editor } from '@tiptap/react';
import { editor_constants } from './editor-constants';

interface EditorToolbarProps {
  editor: Editor;
  showHtmlEditor?: boolean;
  showHtml: boolean;
  onToggleHtml: () => void;
  onToolbarAction: (action: string) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  editor,
  showHtmlEditor = true,
  showHtml,
  onToggleHtml,
  onToolbarAction,
}) => {
  if (!editor) {
    return null;
  }

  const toolbarItems = [
    { action: 'toggleBold', icon: <Bold className="h-4 w-4" />, isActive: editor.isActive('bold') },
    { action: 'toggleItalic', icon: <Italic className="h-4 w-4" />, isActive: editor.isActive('italic') },
    { action: 'toggleUnderline', icon: <Underline className="h-4 w-4" />, isActive: editor.isActive('underline') },
    { action: 'link', icon: <LinkIcon className="h-4 w-4" />, isActive: editor.isActive('link') },
    { action: 'image', icon: <Image className="h-4 w-4" />, isActive: false },
    { action: 'toggleBulletList', icon: <List className="h-4 w-4" />, isActive: editor.isActive('bulletList') },
    { action: 'toggleOrderedList', icon: <ListOrdered className="h-4 w-4" />, isActive: editor.isActive('orderedList') },
    { action: 'toggleBlockquote', icon: <Quote className="h-4 w-4" />, isActive: editor.isActive('blockquote') },
    { action: 'toggleCodeBlock', icon: <Code className="h-4 w-4" />, isActive: editor.isActive('codeBlock') },
    { action: 'undo', icon: <Undo className="h-4 w-4" />, isActive: false },
    { action: 'redo', icon: <Redo className="h-4 w-4" />, isActive: false },
  ];

  return (
    <div className="border-b bg-muted/40 px-3 py-2 flex flex-wrap gap-1">
      {toolbarItems.map((item) => (
        <Button
          key={item.action}
          type="button"
          variant={item.isActive ? "secondary" : "ghost"}
          size="icon"
          onClick={() => onToolbarAction(item.action)}
          className={cn("h-8 w-8 p-0", item.isActive && "bg-muted")}
          disabled={
            (item.action === 'undo' && !editor.can().chain().focus().undo().run()) || 
            (item.action === 'redo' && !editor.can().chain().focus().redo().run())
          }
        >
          {item.icon}
          <span className="sr-only">{editor_constants[item.action] || item.action}</span>
        </Button>
      ))}

      {showHtmlEditor && (
        <>
          <Separator orientation="vertical" className="mx-1 h-8" />
          <Button
            type="button"
            variant={showHtml ? "secondary" : "ghost"}
            size="sm"
            onClick={onToggleHtml}
            className="gap-1 h-8"
          >
            <FileCode className="h-4 w-4" />
            عرض HTML
          </Button>
        </>
      )}
    </div>
  );
};
