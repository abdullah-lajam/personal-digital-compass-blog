
import React from 'react';
import { EditorContent } from '@tiptap/react';
import { cn } from '@/lib/utils';
import { EditorToolbar } from './EditorToolbar';
import { LinkDialog } from './LinkDialog';
import { ImageDialog } from './ImageDialog';
import { useRichTextEditor } from './use-editor';
import './editor.css';

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
  const {
    editor,
    html,
    showHtml,
    linkDialogOpen,
    linkUrl,
    imageDialogOpen,
    imageUrl,
    lastSaved,
    setLinkUrl,
    setImageUrl,
    setLinkDialogOpen,
    setImageDialogOpen,
    addLink,
    addImage,
    handleHtmlChange,
    handleToolbarAction,
    toggleHtmlMode,
  } = useRichTextEditor(content, onChange, placeholder, autoSave);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className={cn("rich-text-editor border rounded-md", className)}>
      <EditorToolbar 
        editor={editor} 
        showHtmlEditor={showHtmlEditor}
        showHtml={showHtml}
        onToggleHtml={toggleHtmlMode}
        onToolbarAction={handleToolbarAction}
      />
      
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
      
      <LinkDialog 
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        url={linkUrl}
        onUrlChange={setLinkUrl}
        onAddLink={addLink}
      />
      
      <ImageDialog 
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
        url={imageUrl}
        onUrlChange={setImageUrl}
        onAddImage={addImage}
      />
    </div>
  );
};
