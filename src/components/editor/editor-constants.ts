
import { LucideIcon } from "lucide-react";
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  Code, Image as ImageIcon, Link as LinkIcon, 
  ListOrdered, List, Quote, Undo, Redo,
  Code as CodeIcon
} from "lucide-react";

export type ToolbarButtonType = {
  name: string;
  icon: LucideIcon;
  action: string;
  isActive?: (editor: any) => boolean;
};

export const toolbarButtons: ToolbarButtonType[] = [
  {
    name: "bold",
    icon: Bold,
    action: "toggleBold",
    isActive: (editor) => editor.isActive('bold')
  },
  {
    name: "italic",
    icon: Italic,
    action: "toggleItalic",
    isActive: (editor) => editor.isActive('italic')
  },
  {
    name: "underline",
    icon: UnderlineIcon,
    action: "toggleUnderline",
    isActive: (editor) => editor.isActive('underline')
  },
  {
    name: "link",
    icon: LinkIcon,
    action: "link",
    isActive: (editor) => editor.isActive('link')
  },
  {
    name: "image",
    icon: ImageIcon,
    action: "image"
  },
  {
    name: "bulletList",
    icon: List,
    action: "toggleBulletList",
    isActive: (editor) => editor.isActive('bulletList')
  },
  {
    name: "orderedList",
    icon: ListOrdered,
    action: "toggleOrderedList",
    isActive: (editor) => editor.isActive('orderedList')
  },
  {
    name: "blockquote",
    icon: Quote,
    action: "toggleBlockquote",
    isActive: (editor) => editor.isActive('blockquote')
  },
  {
    name: "codeBlock",
    icon: CodeIcon,
    action: "toggleCodeBlock",
    isActive: (editor) => editor.isActive('codeBlock')
  },
  {
    name: "undo",
    icon: Undo,
    action: "undo"
  },
  {
    name: "redo",
    icon: Redo,
    action: "redo"
  }
];
