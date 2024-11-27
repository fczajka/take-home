import { HeadlineProps } from './interface';

export const Headline = ({ text }: HeadlineProps) => {
  return <h1 className='mb-1 font-medium text-lg'>My Awesome List ({text})</h1>;
};
