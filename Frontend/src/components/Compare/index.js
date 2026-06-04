import React, { useState, useCallback } from 'react';
import AnimatedLetters from '../AnimatedLetters';
import SeasonSelector from '../SeasonSelector';
import { fetchPlayers } from '../../api';
import './index.scss';

const STATS = [
  { key: 'matchesPlayed',   label: 'Appearances' },
  { key: 'minutesPlayed',   label: 'Minutes' },
  { key: 'goals',           label: 'Goals' },
  { key: 'assists',         label: 'Assists' },
  { key: 'penaltiesScored', label: 'Penalties' },
  { key: 'yellowCards',     label: 'Yellow Cards' },
  { key: 'redCards',        label: 'Red Cards' },
];

const MAX_PLAYERS = 3;

const Compare = () => {
  const [letterClass]             = useState('text-animate');
  const [season, setSeason]       = useState('2024-25');
  const [query, setQuery]         = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected]   = useState([]);   // array of player objects
  const [searching, setSearching] = useState(false);

  // Live search suggestions
  const handleQueryChange = useCallback((e) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) { setSuggestions([]); return; }
    setSearching(true);
    fetchPlayers({ name: val.trim(), season: season || undefined })
      .then(res => { setSuggestions(res.data.slice(0, 8)); setSearching(false); })
      .catch(() => { setSuggestions([]); setSearching(false); });
  }, [season]);

  const addPlayer = (player) => {
    if (selected.length >= MAX_PLAYERS) return;
    if (selected.find(p => p.name === player.name && p.season === player.season)) return;
    setSelected(prev => [...prev, player]);
    setQuery('');
    setSuggestions([]);
  };

  const removePlayer = (idx) => {
    setSelected(prev => prev.filter((_, i) => i !== idx));
  };

  // For each stat, find the best value to highlight
  const best = (statKey) => Math.max(...selected.map(p => p[statKey] ?? 0));

  return (
    <>
      <div className="container compare-page">
        <h1 className="page-title">
          <br />
          <br />
          <AnimatedLetters letterClass={letterClass} strArray={'Compare'.split('')} idx={15} />
        </h1>

        <div className="compare-controls">
          <SeasonSelector value={season} onChange={setSeason} />

          {selected.length < MAX_PLAYERS && (
            <div className="compare-search">
              <input
                type="text"
                placeholder={`Add player ${selected.length + 1} of ${MAX_PLAYERS}…`}
                value={query}
                onChange={handleQueryChange}
              />
              {searching && <p className="hint">Searching…</p>}
              {suggestions.length > 0 && (
                <ul className="suggestions">
                  {suggestions.map((p, i) => (
                    <li key={i} onClick={() => addPlayer(p)}>
                      <span className="sug-name">{p.name}</span>
                      <span className="sug-team">{p.teamName}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {selected.length === 0 && (
          <p className="compare-hint">Search for up to {MAX_PLAYERS} players to compare them side by side.</p>
        )}

        {selected.length > 0 && (
          <div className="compare-area">
            {/* Player header cards */}
            <div className="compare-headers">
              <div className="compare-label-col" />
              {selected.map((player, idx) => (
                <div key={idx} className="compare-player-header">
                  <button className="remove-btn" onClick={() => removePlayer(idx)}>✕</button>
                  {player.playerImageUrl
                    ? <img src={player.playerImageUrl} alt={player.name} className="header-img" onError={e => e.target.style.display='none'} />
                    : <div className="header-placeholder">{player.name?.charAt(0)}</div>
                  }
                  <div className="header-name">{player.name}</div>
                  <div className="header-team">
                    {player.teamLogoUrl && <img src={player.teamLogoUrl} alt="" className="header-team-logo" />}
                    {player.teamName}
                  </div>
                  <div className="header-meta">{player.position} · {player.nation}</div>
                  <div className="header-season">{player.season}</div>
                </div>
              ))}
            </div>

            {/* Stat rows */}
            <div className="compare-stats">
              {STATS.map(stat => (
                <div key={stat.key} className="compare-row">
                  <div className="compare-stat-label">{stat.label}</div>
                  {selected.map((player, idx) => {
                    const val = player[stat.key] ?? 0;
                    const isBest = selected.length > 1 && val === best(stat.key) && val > 0;
                    return (
                      <div key={idx} className={`compare-stat-val ${isBest ? 'best' : ''}`}>
                        {val}
                      </div>
                    );
                  })}
                  {/* Empty placeholders */}
                  {Array.from({ length: MAX_PLAYERS - selected.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="compare-stat-val empty">—</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Compare;
