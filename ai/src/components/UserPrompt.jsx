import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';

const UserPrompt = ({ content }) => {
    return (
        <div className="flex justify-end my-4">
            <div className="bg-blue-600 text-white rounded-lg p-4 max-w-[80%] ml-2">
                <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        code({ inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            if (!inline && match) {
                                return (
                                    <div className="relative group my-4">
                                        <SyntaxHighlighter
                                            language={match[1]}
                                            style={prism}
                                            className="rounded-lg p-4 overflow-x-auto text-sm md:text-base"
                                            PreTag="div"
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                );
                            }
                            return (
                                <code className="bg-blue-700 px-1.5 py-0.5 rounded" {...props}>
                                    {children}
                                </code>
                            );
                        },
                        p({ children }) {
                            return <p className="my-2 text-white leading-relaxed">{children}</p>;
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

UserPrompt.propTypes = {
    content: PropTypes.string.isRequired,
};

export default UserPrompt;