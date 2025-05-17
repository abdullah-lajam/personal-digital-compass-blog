
import { useState, useCallback, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
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

export const useRichTextEditor = (
  content: string,
  onChange: (html: string) => void,
  placeholder: string,
  autoSave: boolean
) => {
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

  // Handle toolbar actions
  const handleToolbarAction = useCallback((action: string) => {
    if (!editor) return;

    switch (action) {
      case 'toggleBold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'toggleItalic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'toggleUnderline':
        editor.chain().focus().toggleUnderline().run();
        break;
      case 'link':
        setLinkDialogOpen(true);
        break;
      case 'image':
        setImageDialogOpen(true);
        break;
      case 'toggleBulletList':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'toggleOrderedList':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case 'toggleBlockquote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      case 'toggleCodeBlock':
        editor.chain().focus().toggleCodeBlock().run();
        break;
      case 'undo':
        editor.commands.undo();
        break;
      case 'redo':
        editor.commands.redo();
        break;
      default:
        break;
    }
  }, [editor]);

  // Toggle HTML mode
  const toggleHtmlMode = useCallback(() => {
    setShowHtml(!showHtml);
  }, [showHtml]);

  return {
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
  };
};
