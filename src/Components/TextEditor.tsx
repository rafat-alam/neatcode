import React from 'react';
import Editor from '@monaco-editor/react';

interface TextEditorProps {
  value: string;
  onChange: (val: string) => void;
  editable: boolean;
  theme: string
  tabsize: number
  textsize: number
}

const TextEditor = ({ value, onChange, editable, theme, tabsize, textsize }: TextEditorProps) => {
  return (
    <Editor
      height="100%"
      width="100%"
      defaultLanguage="plaintext"
      theme={theme}
      value={value}
      onChange={(val) => onChange(val || '')}
      options={{
        readOnly: !editable,
        wordWrap: 'on',
        fontSize: textsize,
        minimap: { enabled: false },
        lineNumbers: 'on',
        tabSize: tabsize,
        automaticLayout: true,
        padding: { top: 10 },
        scrollBeyondLastLine: false,
      }}
    />
  );
};

export default TextEditor;