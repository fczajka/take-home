import { FC } from 'react';
import { ButtonProps } from './interfaces';

export const FunctionButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className='text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded-full px-3 py-1'
      {...props}
    >
      {children}
    </button>
  );
};
