import { useEffect, useState } from 'react';
import { useGetListData } from '../api/getListData';
import { FunctionButton, Spinner } from './ui';
import { DeletedListItem, ListItem } from './interfaces';
import {
  handleDelete,
  handleRefresh,
  loadState,
  persistState,
  toggleExpand,
} from './helpers';
import { HiddenCards } from './HiddenCards';
import { VisibleCards } from './VisibleCards';
import { Headline } from './Headline';

export const Entrypoint = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const [deletedCards, setDeletedCards] = useState<DeletedListItem[]>([]);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const listQuery = useGetListData();

  useEffect(() => {
    const storedVisibleCards = loadState('visibleCards', []);
    const storedDeletedCards = loadState('deletedCards', []);
    const storedExpandedCards = loadState('expandedCards', []);
    const storedIsRevealed = loadState('isRevealed', false);

    setVisibleCards(storedVisibleCards);
    setDeletedCards(storedDeletedCards);
    setExpandedCards(storedExpandedCards);
    setIsRevealed(storedIsRevealed);

    if (!storedVisibleCards.length) return;
    if (!storedDeletedCards.length) return;
    if (!storedExpandedCards.length) return;

    if (!listQuery.isLoading) {
      const initialVisibleCards =
        listQuery.data?.filter((item) => item.isVisible) || [];
      setVisibleCards(initialVisibleCards);
      persistState('visibleCards', initialVisibleCards);
    }
  }, [listQuery.data, listQuery.isLoading]);

  useEffect(() => {
    persistState('isRevealed', isRevealed);
  }, [isRevealed]);

  if (listQuery.isLoading || listQuery.isFetching) {
    return <Spinner />;
  }

  const handleDeleteClick = (id: number) => {
    handleDelete(
      id,
      visibleCards,
      deletedCards,
      setVisibleCards,
      setDeletedCards,
    );
  };

  return (
    <div className='flex items-start gap-x-16'>
      <div className='w-default'>
        <Headline text={visibleCards.length} />
        <VisibleCards
          visibleCards={visibleCards}
          expandedCards={expandedCards}
          handleDeleteClick={handleDeleteClick}
          toggleExpand={toggleExpand}
          setExpandedCards={setExpandedCards}
        ></VisibleCards>
      </div>
      <div className='w-default'>
        <div className='flex items-center justify-between'>
          <Headline text={deletedCards.length} />
          <div className='flex gap-4'>
            <FunctionButton onClick={() => setIsRevealed(!isRevealed)}>
              {isRevealed ? 'Hide' : 'Reveal'}
            </FunctionButton>
            <FunctionButton
              onClick={() =>
                handleRefresh(listQuery, setVisibleCards, setDeletedCards)
              }
            >
              Refresh
            </FunctionButton>
          </div>
        </div>
        <HiddenCards
          isRevealed={isRevealed}
          deletedCards={deletedCards}
          expandedCards={expandedCards}
        />
      </div>
    </div>
  );
};
