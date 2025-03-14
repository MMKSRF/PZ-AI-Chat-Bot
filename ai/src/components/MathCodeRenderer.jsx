// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import ReactMarkdown from 'react-markdown';
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'; // You can replace with a custom theme
// import 'katex/dist/katex.min.css';

// const CodeBlock = ({ language, value }) => {
//   const [copied, setCopied] = useState(false);

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(value);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="relative group my-4">
//       <SyntaxHighlighter
//         language={language || 'text'}
//         style={prism} // Replace with your preferred theme
//         className="rounded-lg p-4 overflow-x-auto text-sm md:text-base"
//         PreTag="div"
//       >
//         {value}
//       </SyntaxHighlighter>
//       <button
//         onClick={copyToClipboard}
//         className="absolute top-3 right-3 px-3 py-1 bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-sm text-white"
//       >
//         {copied ? 'Copied!' : 'Copy'}
//       </button>
//     </div>
//   );
// };

// const MathCodeRenderer = ({ content }) => {
//   return (
//     <div className="prose prose-invert max-w-none px-4 sm:px-6 lg:px-8">
//       <ReactMarkdown
//         remarkPlugins={[remarkMath]}
//         rehypePlugins={[rehypeKatex]}
//         components={{
//           code({ node, inline, className, children, ...props }) {
//             const match = /language-(\w+)/.exec(className || '');
//             if (!inline && match) {
//               return (
//                 <CodeBlock
//                   language={match[1]}
//                   value={String(children).replace(/\n$/, '')}
//                 />
//               );
//             }
//             return (
//               <code className="bg-gray-800 px-1.5 py-0.5 rounded" {...props}>
//                 {children}
//               </code>
//             );
//           },
//           p({ children }) {
//             return <p className="my-4 text-gray-100 leading-relaxed">{children}</p>;
//           },
//         }}
//       >
//         {content}
//       </ReactMarkdown>
//     </div>
//   );
// };

// MathCodeRenderer.propTypes = {
//   content: PropTypes.string.isRequired,
// };

// export default MathCodeRenderer;






import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'; // You can replace this with your preferred theme
import 'katex/dist/katex.min.css';

// Custom CodeBlock component for rendering code with syntax highlighting and a copy button
const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <SyntaxHighlighter
        language={language || 'text'}
        style={prism} // Replace with your preferred theme
        className="rounded-lg p-4 overflow-x-auto text-sm md:text-base"
        PreTag="div"
      >
        {value}
      </SyntaxHighlighter>
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 px-3 py-1 bg-gray-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-sm text-white"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

// Main component to render markdown content, including bold text, code, and math
const MathCodeRenderer = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none px-4 sm:px-6 lg:px-8">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Custom renderer for code blocks
          code({ /*node , */ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match) {
              return (
                <CodeBlock
                  language={match[1]}
                  value={String(children).replace(/\n$/, '')}
                />
              );
            }
            return (
              <code className="bg-gray-800 px-1.5 py-0.5 rounded" {...props}>
                {children}
              </code>
            );
          },
          // Custom renderer for paragraphs
          p({ children }) {
            return <p className="my-4 text-gray-100 leading-relaxed">{children}</p>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

MathCodeRenderer.propTypes = {
  content: PropTypes.string.isRequired,
};
CodeBlock.propTypes = {
  language: PropTypes.string,
  value: PropTypes.string.isRequired,
};


export default MathCodeRenderer;