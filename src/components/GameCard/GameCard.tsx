import type { GameReadable } from '../../rawg/types.gen';
import { Link } from 'react-router';
import styles from './GameCard.module.css';

type GameCardProps = {
  game: GameReadable;
};

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className={styles.card}>
      <Link to={`/game/${game.id}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          <img 
            src={game.background_image || 'https://placehold.co/600x400?text=No+Image'} 
            alt={game.name} 
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{game.name}</h3>
          {game.released && (
            <div className={styles.released}>
              Released: {new Date(game.released).toLocaleDateString()}
            </div>
          )}
          {game.metacritic && (
            <div className={styles.rating}>
              <span className={styles.ratingValue}>{game.metacritic}</span>
              <span>Metacritic</span>
            </div>
          )}
          {game.platforms && game.platforms.length > 0 && (
            <div className={styles.platforms}>
              {game.platforms.map((platform) => (
                <span key={platform.platform.id} className={styles.platform}>
                  {platform.platform.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
