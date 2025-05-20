import { useState, useEffect, } from 'react';
import type { FormEvent } from 'react'; 
import { useSearchParams } from 'react-router';
import GameList from '../components/GameList/GameList';
import type { GamesListData } from '../rawg/types.gen';
import styles from './Search.module.css';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [ordering, setOrdering] = useState(searchParams.get('ordering') || '-rating');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState<GamesListData["query"] | undefined>(
    searchParams.get('q') 
      ? {
          search: searchParams.get('q') || undefined,
          ordering: searchParams.get('ordering') || '-rating',
          page_size: 24
        }
      : undefined
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Update URL search params
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('q', searchTerm);
    if (ordering) newSearchParams.set('ordering', ordering);
    setSearchParams(newSearchParams);
    
    // Update search query for GameList
    setSearchQuery({
      search: searchTerm,
      ordering,
      page_size: 24
    });
  };

  // Update state when URL params change (e.g. browser back/forward)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchTerm(q);
      setOrdering(searchParams.get('ordering') || '-rating');
      setSearchQuery({
        search: q,
        ordering: searchParams.get('ordering') || '-rating',
        page_size: 24
      });
      setIsSearching(true);
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Search Games</h1>
        
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input 
            type="text"
            className={styles.searchInput}
            placeholder="Search for games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search term"
          />
          <button 
            type="submit" 
            className={styles.searchButton}
            disabled={!searchTerm.trim()}
          >
            Search
          </button>
        </form>
        
        {isSearching && (
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label htmlFor="ordering" className={styles.filterLabel}>Sort by:</label>
              <select
                id="ordering"
                className={styles.filterSelect}
                value={ordering}
                onChange={(e) => {
                  const newOrdering = e.target.value;
                  setOrdering(newOrdering);
                  
                  // Update URL and search query
                  const newSearchParams = new URLSearchParams(searchParams);
                  newSearchParams.set('ordering', newOrdering);
                  setSearchParams(newSearchParams);
                  
                  setSearchQuery(prev => prev ? {
                    ...prev,
                    ordering: newOrdering
                  } : undefined);
                }}
              >
                <option value="-rating">Rating (High to Low)</option>
                <option value="rating">Rating (Low to High)</option>
                <option value="-released">Release Date (Newest)</option>
                <option value="released">Release Date (Oldest)</option>
                <option value="-metacritic">Metacritic (High to Low)</option>
                <option value="metacritic">Metacritic (Low to High)</option>
                <option value="name">Name (A-Z)</option>
                <option value="-name">Name (Z-A)</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {isSearching ? (
        <GameList 
          title={`Results for "${searchTerm}"`}
          query={searchQuery}
        />
      ) : (
        <div className={styles.noResults}>
          Enter a search term to find games
        </div>
      )}
    </div>
  );
}
