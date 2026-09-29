import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export function MathText({ text, className = '' }: { text: string; className?: string }) {
  const renderMath = (content: string) => {
    try {
      // Split by block math first $$...$$
      const blockSplit = content.split(/(\$\$[\s\S]*?\$\$)/g);
      
      return blockSplit.map((block, i) => {
        if (block.startsWith('$$') && block.endsWith('$$')) {
          const math = block.slice(2, -2);
          const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
          return <div key={i} dangerouslySetInnerHTML={{ __html: html }} className="my-2 flex justify-center" />;
        }
        
        // Then split by inline math $...$ or \(...\)
        const inlineSplit = block.split(/(\$[\s\S]*?\$|\\\([\s\S]*?\\\))/g);
        
        return inlineSplit.map((inline, j) => {
          if (inline.startsWith('$') && inline.endsWith('$')) {
            const math = inline.slice(1, -1);
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            return <span key={`${i}-${j}`} dangerouslySetInnerHTML={{ __html: html }} />;
          }
          if (inline.startsWith('\\(') && inline.endsWith('\\)')) {
            const math = inline.slice(2, -2);
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            return <span key={`${i}-${j}`} dangerouslySetInnerHTML={{ __html: html }} />;
          }
          
          return <span key={`${i}-${j}`}>{inline}</span>;
        });
      });
    } catch (e) {
      return <span>{content}</span>;
    }
  };

  return (
    <div className={`text-[#1F2937] leading-relaxed break-words ${className}`}>
      {renderMath(text)}
    </div>
  );
}
