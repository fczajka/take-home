import { FC, useRef } from 'react';
import { DescriptionProps } from './interface';

export const Description: FC<DescriptionProps> = ({
  description,
  isExpanded,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={contentRef}
      style={{
        maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px',
      }}
      className='transition-max-height duration-300 ease-in-out overflow-hidden'
    >
      {description && <p className='text-sm'>{description}</p>}
    </div>
  );
};
