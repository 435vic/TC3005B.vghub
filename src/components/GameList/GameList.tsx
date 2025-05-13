import { useState, useEffect } from 'react';
import type { GameReadable } from '../../rawg/types.gen';
import GameCard from '../GameCard/GameCard';
import styles from './GameList.module.css';
import { gamesList } from '../../rawg';
import client from '../../rawg/client';

type GameListProps = {
  title?: string;
  pageSize?: number;
};

export default function GameList({ title = 'Popular Games', pageSize = 12 }: GameListProps) {
  const [games, setGames] = useState<GameReadable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await gamesList({
          client,
          query: {
            page_size: pageSize,
            dates: '2025-01-01,2025-05-09',
            ordering: '-rating',
            page,
          },
        });
        
        setGames(response.data!.results);
        setCount(response.data!.count);
      } catch (err) {
        setError('Failed to load games. Please try again later.');
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [page, pageSize]);

  const totalPages = Math.ceil(count / pageSize);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{title}</h2>
      
      {loading && <div className={styles.loading}>Loading games...</div>}
      
      {error && <div className={styles.error}>{error}</div>}
      
      {!loading && !error && games.length === 0 && (
        <div className={styles.loading}>No games found</div>
      )}
      
      {!loading && !error && games.length > 0 && (
        <>
          <div className={styles.grid}>
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          
          <div className={styles.pagination}>
            <button 
              className={styles.pageButton}
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button 
              className={styles.pageButton}
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
