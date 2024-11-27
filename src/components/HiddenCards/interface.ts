import { DeletedListItem } from '../interfaces';

export interface HiddenCardsProps {
  isRevealed: boolean;
  deletedCards: DeletedListItem[];
  expandedCards: number[];
}
