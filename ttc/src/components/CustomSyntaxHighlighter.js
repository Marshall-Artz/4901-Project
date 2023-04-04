import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CustomSyntaxHighlighter = ({ explanation }) => {
  const codeRegex = /`([^`]+)`/g;
  const parts = explanation.split(codeRegex);

  return (
    <div>
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          return <span key={index}>{part}</span>;
        } else {
          return (
            <SyntaxHighlighter
              key={index}
              language="javascript"
              style={tomorrow}
              customStyle={{ display: 'inline', padding: '2px' }}
            >
              {part}
            </SyntaxHighlighter>
          );
        }
      })}
    </div>
  );
};

export default CustomSyntaxHighlighter;
