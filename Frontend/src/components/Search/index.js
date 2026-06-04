import React, { useEffect, useState, useCallback } from 'react';
import Loader from 'react-loaders';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import SeasonSelector from '../SeasonSelector';
import PlayerCard from '../PlayerCard';
import { fetchPlayers } from '../../api';

const Search = () => {
  const [letterClass, setLetterClass]   = useState('text-animate');
  const [searchQuery, setSearchQuery]   = useState('');
  const [season, setSeason]             = useState('2024-25');
  const [players, setPlayers]           = useState([]);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 3000);
    return () => clearTimeout(timer);
  }, []);

  const search = useCallback(() => {
    if (!searchQuery.trim()) { setPlayers([]); return; }
    setLoading(true);
    setError(null);
    fetchPlayers({ name: searchQuery.trim(), season: season || undefined })
      .then(res => { setPlayers(res.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [searchQuery, season]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(search, 400);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <div className="container search-page">
        <h1 className="page-title">
          <br />
          <br />
          <AnimatedLetters letterClass={letterClass} strArray={'Search'.split('')} idx={15} />
        </h1>

        <div className="search-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a player…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <SeasonSelector value={season} onChange={setSeason} />
        </div>

        {loading && <p className="status-msg">Searching…</p>}
        {error   && <p className="status-msg error">Error: {error}</p>}
        {!loading && !error && searchQuery && players.length === 0 && (
          <p className="status-msg">No players found for "{searchQuery}".</p>
        )}

        {!loading && players.length > 0 && (
          <div className="the-players-list">
            {players.map((player, idx) => (
              <PlayerCard key={`${player.name}-${idx}`} player={player} />
            ))}
          </div>
        )}
      </div>
      <Loader type="pacman" />
    </>
  );
};

export default Search;
