import React from 'react';
import ScrollCard from './ScrollCard';

/**
 * ScrollSection Wrapper
 * Backwards-compatible wrapper delegating to ScrollCard
 */
export default function ScrollSection({ children, className = '', id, ...props }) {
  return (
    <div id={id} className={`scroll-mt-24 ${className}`} {...props}>
      {children}
    </div>
  );
}

export { ScrollCard };
