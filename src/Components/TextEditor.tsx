import React from 'react';
import Editor from '@monaco-editor/react';

interface TextEditorProps {
  value: string;
  onChange: (val: string) => void;
  editable: boolean;
}

const TextEditor = ({ value, onChange, editable }: TextEditorProps) => {
  return (
    <Editor
      className='border-2'
      height="100%"
      defaultLanguage="plaintext"
      theme="github-light"
      value={value}
      onChange={(val) => onChange(val || '')}
      options={{
        readOnly: !editable,
        wordWrap: 'off',
        fontSize: 18,
        minimap: { enabled: false },
        lineNumbers: 'off',
        tabSize: 4,
        automaticLayout: true,
        padding: { top: 10 },
        scrollBeyondLastLine: false,
      }}
    />
  );
};

export default TextEditor;