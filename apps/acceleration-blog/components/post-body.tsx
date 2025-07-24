import ReactMarkdown from 'react-markdown';
import markdownStyles from './markdown-styles.module.css';
import Prism from 'react-syntax-highlighter/dist/cjs/prism';
import { materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'; 


type Props = {
  content: string;
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <ReactMarkdown 
        className={markdownStyles['markdown']} 
        children={content} 
        components={{
          // Headings
          h1: ({node, ...props}) => <h1 className="text-4xl mt-12 mb-6 leading-tight" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-3xl mt-12 mb-4 leading-snug" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-2xl mt-8 mb-4 leading-snug" {...props} />,
          h4: ({node, ...props}) => <h4 className="text-xl mt-6 mb-3 leading-normal" {...props} />,
          h5: ({node, ...props}) => <h5 className="text-lg mt-5 mb-3 leading-normal" {...props} />,
          h6: ({node, ...props}) => <h6 className="text-base mt-4 mb-2 leading-normal" {...props} />,
          // Paragraphs
          p: ({node, ...props}) => <p className="my-6" {...props} />,
          // Lists
          ul: ({node, ...props}) => <ul className="list-disc list-inside my-4" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside my-4" {...props} />,
          li: ({node, ...props}) => <li className="ml-4" {...props} />,
          // Blockquotes
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-500 italic my-8 pl-4" {...props} />,
          // Code Blocks
          code: ({ node, inline, className, children, ...props }: any) => {
            const isInline = className?.includes('language-') === false;
            return isInline ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <Prism // Corrected component name
              style={materialLight} // Apply the new style here
                language={className?.replace('language-', '')}
                PreTag="div" {...props}>
                {String(children).replace(/\n$/, '')}
                </Prism>
            );
          },
          // Thematic Breaks (Horizontal Lines)
          hr: () => <hr className="my-8 border-gray-300" />,
          // Images
          img: ({node, ...props}) => <img className="my-4 mx-auto" {...props} />,
          // Links
          a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-800" {...props} />,
          // Emphasis (Italic)
          em: ({node, ...props}) => <em {...props} />,
          // Strong (Bold)
          strong: ({node, ...props}) => <strong {...props} />,
          // Delete (Strikethrough)
          del: ({node, ...props}) => <del {...props} />,
          // Other elements can be defined as needed
        }}
      />
    </div>
  );
}

export default PostBody;