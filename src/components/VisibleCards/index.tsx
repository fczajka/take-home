import { Card } from '../ui';
import { VisibleCardsProps } from './interface';

export const VisibleCards = ({
  visibleCards,
  expandedCards,
  handleDeleteClick,
  toggleExpand,
  setExpandedCards,
}: VisibleCardsProps) => {
  return (
    <ul className='flex flex-col gap-y-3'>
      {visibleCards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          handleDelete={() => handleDeleteClick(card.id)}
          isExpanded={expandedCards.includes(card.id)}
          onToggleExpand={() =>
            toggleExpand(card.id, expandedCards, setExpandedCards)
          }
        />
      ))}
    </ul>
  );
};
