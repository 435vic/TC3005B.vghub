import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import type { GameSingleReadable } from '../rawg/types.gen';
import { gamesRead } from '../rawg';
import client from '../rawg/client';
import styles from './GameDetails.module.css';

export default function GameDetails() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<GameSingleReadable | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGameDetails() {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await gamesRead({
          client,
          query: {
            key: import.meta.env.VITE_UNSAFE_RAWG_API_KEY,
            
          },
          path: { id },
        });

       if (response.response.status == 404) {
        setGame(null);
        setLoading(false);
        return;
       } else if (response.data === undefined) {
          setError('Failed to load game details.');
          console.error('API error fetching game details: ', response.error);
          setLoading(false);
          return;
       }
        
        setGame(response.data);
      } catch (err) {
        setError('Failed to load game details. Please try again later.');
        console.error('Error fetching game details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGameDetails();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading game details...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!game) {
    return <div className={styles.notFound}>Game not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {game.background_image && (
          <div className={styles.coverImage}>
            <img src={game.background_image} alt={game.name} />
          </div>
        )}
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{game.name}</h1>
          {game.released && (
            <div className={styles.releaseDate}>
              Released: {new Date(game.released).toLocaleDateString()}
            </div>
          )}
          {game.metacritic && (
            <div className={styles.metacritic}>
              <span className={styles.metacriticScore}>{game.metacritic}</span>
              <span>Metacritic</span>
            </div>
          )}
          {game.rating && (
            <div className={styles.rating}>
              Rating: {game.rating.toFixed(1)} / {game.rating_top}
            </div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        {game.description && (
          <div className={styles.description}>
            <h2>About</h2>
            <div dangerouslySetInnerHTML={{ __html: game.description }} />
          </div>
        )}

        {game.platforms && game.platforms.length > 0 && (
          <div className={styles.section}>
            <h2>Platforms</h2>
            <div className={styles.platforms}>
              {game.platforms.map((item) => (
                <span key={item.platform?.id} className={styles.platform}>
                  {item.platform?.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {game.website && (
          <div className={styles.section}>
            <h2>Website</h2>
            <a href={game.website} target="_blank" rel="noopener noreferrer" className={styles.website}>
              {game.website}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
