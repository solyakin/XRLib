import React from 'react';
import Editor from 'react-markdown-editor-lite';


export default function WrappedEditor({ editorRef, ...props }) {
    return <Editor {...props} ref={editorRef} />;
  }