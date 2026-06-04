import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerCard from '../../PlayerCard';
import SeasonSelector from '../../SeasonSelector';
import { fetchPlayers } from '../../../api';
import './index.scss';

const POSITION_LABELS = {
  goalkeeper: 'Goalkeepers',
  defender:   'Defenders',
  midfielder: 'Midfielders',
  forward:    'Forwards',
};

const PositionDetails = () => {
  const { position }                    = useParams();
  const [players, setPlayers]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [season, setSeason]             = useState('2024-25');
  const [sortBy, setSortBy]             = useState('goals');

  const label = POSITION_LABELS[position?.toLowerCase()] ?? position;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPlayers({ position: decodeURIComponent(position), season: season || undefined })
      .then(res => { setPlayers(res.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [position, season]);

  const sorted = [...players].sort((a, b) => (b[sortBy] ?? 0) - (a[sortBy] ?? 0));

  return (
    <div className="team-details-container">
      <h1>{label}</h1>

      <div className="position-controls">
        <SeasonSelector value={season} onChange={setSeason} />
        <div className="sort-selector">
          <label htmlFor="sort-select">Sort by</label>
          <select id="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="goals">Goals</option>
            <option value="assists">Assists</option>
            <option value="matchesPlayed">Appearances</option>
            <option value="minutesPlayed">Minutes</option>
            <option value="yellowCards">Yellow cards</option>
          </select>
        </div>
      </div>

      {loading && <p className="status-msg">Loading players…</p>}
      {error   && <p className="status-msg error">Error: {error}</p>}
      {!loading && !error && players.length === 0 && (
        <p className="status-msg">No {label?.toLowerCase()} found in {season || 'any season'}.</p>
      )}

      {!loading && sorted.length > 0 && (
        <div className="players-list">
          {sorted.map((player, idx) => (
            <PlayerCard key={`${player.name}-${idx}`} player={player} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PositionDetails;
