import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import prismStyle from 'react-syntax-highlighter/dist/esm/styles/prism/vs-dark';
import React from 'react';
// Customize the style
const customPrismStyle = {
  ...prismStyle,
  'code[class*="language-"]': {
    ...prismStyle['code[class*="language-"]'],
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
  },
  'pre[class*="language-"]': {
    ...prismStyle['pre[class*="language-"]'],
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.75)',
  },
};

export default function CodeBlock({ codeString, language }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={customPrismStyle}
      wrapLines={true}
    >
      {codeString}
    </SyntaxHighlighter>
  );
}
