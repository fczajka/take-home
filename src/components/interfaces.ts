export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export type DeletedListItem = Omit<ListItem, 'description'>;

export type Data = ListItem[] | DeletedListItem[] | number[] | boolean;

export type SetVisibleCards = React.Dispatch<React.SetStateAction<ListItem[]>>;
export type SetDeletedCards = React.Dispatch<
  React.SetStateAction<DeletedListItem[]>
>;
export type SetExpandedCards = React.Dispatch<React.SetStateAction<number[]>>;
