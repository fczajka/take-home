import { MouseEventHandler } from 'react';
import { ListItem } from '../interfaces';

export type ButtonProps = React.ComponentProps<'button'>;

export type CardProps = {
  title: ListItem['title'];
  description?: ListItem['description'];
  handleDelete?: MouseEventHandler<HTMLButtonElement>;
  isDeleted?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: MouseEventHandler<HTMLButtonElement>;
};
