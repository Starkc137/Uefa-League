import React, { useState, useEffect } from 'react';
import AnimatedLetters from '../AnimatedLetters';
import SeasonSelector from '../SeasonSelector';
import { fetchPlayers } from '../../api';
import './index.scss';

const TeamData = () => {
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [playerData, setPlayerData]     = useState([]);
  const [playersToShow, setPlayersToShow] = useState(20);
  const [letterClass]                   = useState('text-animate');
  const [season, setSeason]             = useState('2024-25');

  useEffect(() => {
    const params  = new URLSearchParams(window.location.search);
    const team    = params.get('team');
    const nation  = params.get('nation');
    const position = params.get('position');
    const name    = params.get('name');

    const query = {};
    if (team)     query.team     = team;
    if (nation)   query.nation   = nation;
    if (position) query.position = position;
    if (name)     query.name     = name;
    if (season)   query.season   = season;

    if (Object.keys(query).length === 0) { setLoading(false); return; }

    setLoading(true);
    fetchPlayers(query)
      .then(res => { setPlayerData(res.data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [season]);

  if (loading) return <p className="status-msg">Loading…</p>;
  if (error)   return <p className="status-msg error">Error: {error}</p>;

  return (
    <div className="fade-in">
      <div className="table-container">
        <h1 className="page-title">
          <AnimatedLetters letterClass={letterClass} strArray={'Player Data'.split('')} idx={12} />
        </h1>

        <SeasonSelector value={season} onChange={setSeason} />

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Age</th>
              <th>Nation</th>
              <th>Team</th>
              <th>Apps</th>
              <th>Mins</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Pens</th>
              <th>🟨</th>
              <th>🟥</th>
              <th>Season</th>
            </tr>
          </thead>
          <tbody>
            {playerData.slice(0, playersToShow).map((player, idx) => (
              <tr key={`${player.name}-${idx}`}>
                <td>{player.name}</td>
                <td>{player.position}</td>
                <td>{player.age}</td>
                <td>{player.nation}</td>
                <td>{player.teamName}</td>
                <td>{player.matchesPlayed}</td>
                <td>{player.minutesPlayed}</td>
                <td>{player.goals}</td>
                <td>{player.assists}</td>
                <td>{player.penaltiesScored}</td>
                <td>{player.yellowCards}</td>
                <td>{player.redCards}</td>
                <td>{player.season}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {playersToShow < playerData.length && (
          <button
            className="show-more-button"
            onClick={() => setPlayersToShow(n => n + 20)}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamData;
