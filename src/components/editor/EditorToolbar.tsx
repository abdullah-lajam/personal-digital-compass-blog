
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code } from "lucide-react";
import { toolbarButtons, ToolbarButtonType } from './editor-constants';
import { Editor } from '@tiptap/react';
import { cn } from '@/lib/utils';

interface EditorToolbarProps {
  editor: Editor;
  showHtmlEditor: boolean;
  showHtml: boolean;
  onToggleHtml: () => void;
  onToolbarAction: (action: string) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  editor,
  showHtmlEditor,
  showHtml,
  onToggleHtml,
  onToolbarAction,
}) => {
  // Group buttons into sections
  const formatButtons: ToolbarButtonType[] = toolbarButtons.slice(0, 3);
  const insertButtons: ToolbarButtonType[] = toolbarButtons.slice(3, 5);
  const listButtons: ToolbarButtonType[] = toolbarButtons.slice(5, 9);
  const historyButtons: ToolbarButtonType[] = toolbarButtons.slice(9);
  
  const renderButton = (button: ToolbarButtonType) => {
    const ButtonIcon = button.icon;
    const isActive = button.isActive ? button.isActive(editor) : false;
    const isDisabled = button.name === 'undo' ? !editor.can().undo() : 
                       button.name === 'redo' ? !editor.can().redo() : 
                       false;
    
    return (
      <Button 
        key={button.name}
        type="button" 
        variant="ghost" 
        size="icon" 
        onClick={() => onToolbarAction(button.action)}
        className={isActive ? 'bg-muted' : ''}
        disabled={isDisabled}
      >
        <ButtonIcon size={18} />
      </Button>
    );
  };
  
  return (
    <div className={cn("editor-toolbar flex flex-wrap items-center gap-1 p-2 border-b bg-muted/30")}>
      {formatButtons.map(renderButton)}
      
      <Separator orientation="vertical" className="h-6" />
      
      {insertButtons.map(renderButton)}
      
      <Separator orientation="vertical" className="h-6" />
      
      {listButtons.map(renderButton)}
      
      <Separator orientation="vertical" className="h-6" />
      
      {historyButtons.map(renderButton)}
      
      {showHtmlEditor && (
        <>
          <Separator orientation="vertical" className="h-6 mr-auto" />
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={onToggleHtml}
            className="mr-1"
          >
            <Code className="mr-2" size={16} />
            {showHtml ? 'رجوع للمحرر المرئي' : 'تحرير HTML'}
          </Button>
        </>
      )}
    </div>
  );
};
