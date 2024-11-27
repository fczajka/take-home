import { FC } from 'react';
import { CardProps } from './interfaces';
import { IconButton } from './IconButton';
import { ChevronUpIcon, XMarkIcon } from './icons';
import { Description } from './Description';

export const Card: FC<CardProps> = ({
  title,
  description,
  handleDelete,
  isDeleted,
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <li className='border border-black px-2 py-1.5 rounded-lg'>
      <div className='flex justify-between mb-0.5'>
        <h1 className='font-medium'>{title}</h1>
        <div className='flex'>
          {!isDeleted && (
            <>
              <IconButton onClick={onToggleExpand}>
                <div
                  className={`${
                    isExpanded ? 'rotate-180' : ''
                  } transition-transform`}
                >
                  <ChevronUpIcon />
                </div>
              </IconButton>
              <IconButton onClick={handleDelete}>
                <XMarkIcon />
              </IconButton>
            </>
          )}
        </div>
      </div>
      {description && isExpanded && (
        <Description description={description} isExpanded={isExpanded} />
      )}
    </li>
  );
};
