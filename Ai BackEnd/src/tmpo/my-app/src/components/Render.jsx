import React, { useMemo } from 'react';
import { Remarkable } from 'remarkable';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import DOMPurify from 'dompurify';

// Configure Remarkable for Markdown parsing
const md = new Remarkable({
  html: false, // Disable HTML parsing for security
  breaks: true, // Convert newlines to <br> tags
  linkify: true, // Auto-convert URLs to links
  typographer: true, // Enable typographic replacements
  quotes: '“”‘’' // Smart quotes
});

// Custom rendering rules for styling
md.renderer.rules.strong_open = () => '<strong class="font-semibold">';
md.renderer.rules.em_open = () => '<em class="italic">';
md.renderer.rules.link_open = (tokens, idx) => 
  `<a href="${tokens[idx].href}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">`;

// MathJax configuration
const mathJaxConfig = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$']],
    processEscapes: true,
    packages: { '[+]': ['boldsymbol'] }
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
    ignoreHtmlClass: 'tex-ignore'
  },
  loader: { load: ['[tex]/boldsymbol'] }
};

// Define processing patterns in priority order
const PROCESSING_PATTERNS = [
  {
    name: 'code-block',
    regex: /```(\w*)\n([\s\S]*?)\n```/g,
    handler: (lang, code) => (
      <div className="relative my-4">
        <SyntaxHighlighter
          language={lang || 'text'}
          style={vscDarkPlus}
          className="rounded-lg p-4 text-sm"
          showLineNumbers
          PreTag="div"
        >
          {code.trim()}
        </SyntaxHighlighter>
        <button
          onClick={() => navigator.clipboard.writeText(code.trim())}
          className="absolute right-3 top-3 bg-gray-700/50 hover:bg-gray-600/80 rounded p-1.5 opacity-0 hover:opacity-100 transition-opacity"
          aria-label="Copy code"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    )
  },
  {
    name: 'math-block',
    regex: /\$\$([\s\S]*?)\$\$/g,
    handler: (math) => (
      <div className="my-4">
        <MathJax>{`$$${math}$$`}</MathJax>
      </div>
    )
  },
  {
    name: 'inline-code',
    regex: /`([^`\n]+)`/g,
    handler: (code) => (
      <code className="bg-gray-800/50 px-1.5 py-0.5 rounded text-sm font-mono text-gray-100">
        {code}
      </code>
    )
  },
  {
    name: 'inline-math',
    regex: /\$([^\n$]+)\$|\\\(([\s\S]*?)\\\)/g,
    handler: (math1, math2) => (
      <span className="mx-0.5">
        <MathJax>{`$${math1 || math2}$`}</MathJax>
      </span>
    )
  }
];

// DOMPurify sanitization options
const SANITIZE_OPTIONS = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'span'],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  FORBID_ATTR: ['onclick', 'onerror']
};

const ContentDisplay = ({ content }) => {
  const processedContent = useMemo(() => {
    // Start with content as an array of segments
    let segments = [content || ''];

    // Process each pattern sequentially
    PROCESSING_PATTERNS.forEach(({ regex, handler }) => {
      const newSegments = [];
      segments.forEach((segment) => {
        if (typeof segment !== 'string') {
          newSegments.push(segment); // Preserve existing components
          return;
        }

        let lastIndex = 0;
        let match;
        regex.lastIndex = 0; // Reset regex index

        while ((match = regex.exec(segment)) !== null) {
          const startIndex = match.index;
          if (startIndex > lastIndex) {
            newSegments.push(segment.slice(lastIndex, startIndex));
          }

          const groups = match.slice(1).filter(Boolean); // Filter out undefined groups
          const processed = handler(...groups);
          newSegments.push(processed);

          lastIndex = regex.lastIndex;
        }

        if (lastIndex < segment.length) {
          newSegments.push(segment.slice(lastIndex));
        }
      });
      segments = newSegments;
    });

    // Render segments with Markdown for strings
    return segments.map((segment, index) => {
      if (typeof segment === 'string' && segment.trim()) {
        const sanitized = DOMPurify.sanitize(md.render(segment), SANITIZE_OPTIONS);
        return (
          <span
            key={`segment-${index}`}
            dangerouslySetInnerHTML={{ __html: sanitized }}
            className="whitespace-pre-wrap leading-relaxed text-gray-100"
          />
        );
      }
      return segment; // Return components as-is
    });
  }, [content]);

  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className="content-container space-y-4 px-2 py-3 text-base text-gray-100">
        {processedContent}
      </div>
    </MathJaxContext>
  );
};

export default React.memo(ContentDisplay);