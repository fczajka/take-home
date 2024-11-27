import { FC } from 'react';
import { ButtonProps } from './interfaces';

export const IconButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className='hover:text-gray-700 transition-colors flex items-center justify-center'
      {...props}
    >
      {children}
    </button>
  );
};
