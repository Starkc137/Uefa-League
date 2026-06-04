import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerCard from '../../PlayerCard';
import SeasonSelector from '../../SeasonSelector';
import { fetchPlayers } from '../../../api';
import './index.scss';

const TeamDetails = () => {
  const { teamName }                    = useParams();
  const [players, setPlayers]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [season, setSeason]             = useState('2024-25');

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPlayers({ team: teamName, season: season || undefined })
      .then(res => { setPlayers(res.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [teamName, season]);

  return (
    <div className="team-details-container">
      <h1>{decodeURIComponent(teamName)}</h1>

      <SeasonSelector value={season} onChange={setSeason} />

      {loading && <p className="status-msg">Loading players…</p>}
      {error   && <p className="status-msg error">Error: {error}</p>}

      {!loading && !error && players.length === 0 && (
        <p className="status-msg">No players found for this team in {season || 'any season'}.</p>
      )}

      {!loading && players.length > 0 && (
        <div className="players-list">
          {players.map((player, idx) => (
            <PlayerCard key={`${player.name}-${idx}`} player={player} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
