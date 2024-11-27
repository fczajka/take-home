import { UseQueryResult } from '@tanstack/react-query';
import {
  Data,
  DeletedListItem,
  ListItem,
  SetDeletedCards,
  SetExpandedCards,
  SetVisibleCards,
} from './interfaces';

export const persistState = (key: string, data: Data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadState = (key: string, defaultValue: Data) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

export const handleDelete = (
  id: number,
  visibleCards: ListItem[],
  deletedCards: DeletedListItem[],
  setVisibleCards: SetVisibleCards,
  setDeletedCards: SetDeletedCards,
) => {
  const cardToDelete = visibleCards.find((card) => card.id === id);
  if (!cardToDelete) return;

  const updatedVisibleCards = visibleCards.filter((card) => card.id !== id);
  const updatedDeletedCards = [
    ...deletedCards,
    { ...cardToDelete, isDeleted: true },
  ];

  setVisibleCards(updatedVisibleCards);
  setDeletedCards(updatedDeletedCards);

  persistState('visibleCards', updatedVisibleCards);
  persistState('deletedCards', updatedDeletedCards);
};

export const handleRefresh = (
  listQuery: UseQueryResult<
    {
      isVisible: boolean;
      description: string;
      id: number;
      title: string;
    }[],
    Error
  >,
  setVisibleCards: SetVisibleCards,
  setDeletedCards: SetDeletedCards,
) => {
  localStorage.setItem('visibleCards', '[]');
  localStorage.setItem('deletedCards', '[]');
  localStorage.setItem('expandedCards', '[]');
  localStorage.setItem('isRevealed', 'false');
  listQuery
    .refetch()
    .then((result) => {
      if (result.data) {
        const updatedVisibleCards = result.data.filter(
          (item) => item.isVisible,
        );

        setVisibleCards(updatedVisibleCards);
        persistState('visibleCards', updatedVisibleCards);

        setDeletedCards([]);
        persistState('deletedCards', []);
      }
    })
    .catch((error) => {
      console.error('Error fetching new data:', error);
    });
};

export const toggleExpand = (
  id: number,
  expandedCards: number[],
  setExpandedCards: SetExpandedCards,
) => {
  const updatedExpandedCards = expandedCards.includes(id)
    ? expandedCards.filter((expandedId) => expandedId !== id)
    : [...expandedCards, id];

  setExpandedCards(updatedExpandedCards);
  persistState('expandedCards', updatedExpandedCards);
};
