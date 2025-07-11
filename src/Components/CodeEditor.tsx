import React from 'react';
import Editor from '@monaco-editor/react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const CodeEditor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Editor
      className='border-2'
      height="100%"
      width="100%"
      defaultLanguage="cpp"
      theme="github-light"
      value={value}
      onChange={(val) => onChange(val || '')}
      options={{
        fontSize: 14,
        wordWrap: 'on',
        minimap: { enabled: false },
        padding: { top: 10 },
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;