import { Card } from '../ui';
import { HiddenCardsProps } from './interface';

export const HiddenCards = ({
  isRevealed,
  deletedCards,
  expandedCards,
}: HiddenCardsProps) => {
  return (
    <ul className='flex flex-col gap-y-3'>
      {isRevealed &&
        deletedCards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            isDeleted
            isExpanded={expandedCards.includes(card.id)}
          />
        ))}
    </ul>
  );
};
