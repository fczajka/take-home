import { ListItem, SetExpandedCards } from '../interfaces';

export interface VisibleCardsProps {
  visibleCards: ListItem[];
  expandedCards: number[];
  handleDeleteClick: (id: number) => void;
  toggleExpand: (
    id: number,
    expandedCards: number[],
    setExpandedCards: SetExpandedCards,
  ) => void;
  setExpandedCards: SetExpandedCards;
}
