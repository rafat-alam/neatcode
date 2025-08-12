import React from 'react';
import Editor from '@monaco-editor/react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  theme: string
  tabsize: number
  textsize: number
  lang: string
}

const CodeEditor: React.FC<Props> = ({ value, onChange, theme, tabsize, textsize, lang }) => {
  return (
    <Editor
      height="100%"
      width="100%"
      language={lang}
      theme={theme}
      value={value}
      onChange={(val) => onChange(val || '')}
      options={{
        fontSize: textsize,
        wordWrap: 'on',
        tabSize: tabsize,
        minimap: { enabled: false },
        padding: { top: 10 },
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;