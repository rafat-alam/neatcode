'use client'

import React, { useState } from 'react'
import Editor from '@monaco-editor/react'

// Track which themes have been defined to avoid redefining them
const definedThemes = new Set<string>()

type EditorProps = {
  value: string
  onChange: (val: string) => void
  themeName: string
  baseTheme: 'vs' | 'vs-dark'
}

const CodeEditor = ({ value, onChange, themeName, baseTheme }: EditorProps) => {
  return (
    <Editor
      height="300px"
      defaultLanguage="cpp"
      theme={themeName}
      value={value}
      onChange={(val) => onChange(val || '')}
      beforeMount={(monaco) => {
        if (!definedThemes.has(themeName)) {
          monaco.editor.defineTheme(themeName, {
            base: baseTheme,
            inherit: true,
            rules: [
              { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
              { token: 'keyword', foreground: 'C586C0' },
              { token: 'string', foreground: 'CE9178' },
            ],
            colors: {
              'editor.background': baseTheme === 'vs-dark' ? '#1e1e1e' : '#ffffff',
              'editorLineNumber.foreground': '#888888',
            },
          })
          definedThemes.add(themeName)
        }
      }}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        tabSize: 4,
      }}
    />
  )
}

const ThreeEditorsWithThemes = () => {
  const [code1, setCode1] = useState('// Editor 1')
  const [code2, setCode2] = useState('// Editor 2')
  const [code3, setCode3] = useState('// Editor 3')

  const [theme1, setTheme1] = useState('editor1-dark')
  const [theme2, setTheme2] = useState('editor2-light')
  const [theme3, setTheme3] = useState('editor3-dark')

  return (
    <div className="space-y-10 p-6 bg-gray-100 min-h-screen">
      {/* Editor 1 */}
      <div>
        <div className="mb-2">
          <label className="mr-2 font-semibold">Editor 1 Theme:</label>
          <select value={theme1} onChange={(e) => setTheme1(e.target.value)}>
            <option value="editor1-dark">Dark</option>
            <option value="editor1-light">Light</option>
          </select>
        </div>
        <CodeEditor
          value={code1}
          onChange={setCode1}
          themeName={theme1}
          baseTheme={theme1.includes('dark') ? 'vs-dark' : 'vs'}
        />
      </div>

      {/* Editor 2 */}
      <div>
        <div className="mb-2">
          <label className="mr-2 font-semibold">Editor 2 Theme:</label>
          <select value={theme2} onChange={(e) => setTheme2(e.target.value)}>
            <option value="editor2-dark">Dark</option>
            <option value="editor2-light">Light</option>
          </select>
        </div>
        <CodeEditor
          value={code2}
          onChange={setCode2}
          themeName={theme2}
          baseTheme={theme2.includes('dark') ? 'vs-dark' : 'vs'}
        />
      </div>

      {/* Editor 3 */}
      <div>
        <div className="mb-2">
          <label className="mr-2 font-semibold">Editor 3 Theme:</label>
          <select value={theme3} onChange={(e) => setTheme3(e.target.value)}>
            <option value="editor3-dark">Dark</option>
            <option value="editor3-light">Light</option>
          </select>
        </div>
        <CodeEditor
          value={code3}
          onChange={setCode3}
          themeName={theme3}
          baseTheme={theme3.includes('dark') ? 'vs-dark' : 'vs'}
        />
      </div>
    </div>
  )
}

export default ThreeEditorsWithThemes
