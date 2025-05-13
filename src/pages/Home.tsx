import { useEffect } from 'react';
import GameList from '../components/GameList/GameList';
import { client } from '../rawg/client.gen';
import styles from './Home.module.css';


export default function Home() {
  return (
    <GameList title="Trending Games" pageSize={12} />
  );
}
