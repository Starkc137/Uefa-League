import React from 'react';
import './index.scss';

const POSITION_COLORS = {
  GOALKEEPER: '#e67e22',
  DEFENDER:   '#2980b9',
  MIDFIELDER: '#27ae60',
  FORWARD:    '#c0392b',
};

const PlayerCard = ({ player }) => {
  const posColor = POSITION_COLORS[player.position?.toUpperCase()] || '#555';

  return (
    <div className="player-card">
      <div className="player-card__img-wrap">
        {player.playerImageUrl ? (
          <img
            src={player.playerImageUrl}
            alt={player.name}
            className="player-card__img"
            onError={e => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="player-card__img-placeholder">
            {player.name?.charAt(0) ?? '?'}
          </div>
        )}
        <span className="player-card__position" style={{ background: posColor }}>
          {player.position}
        </span>
      </div>

      <div className="player-card__body">
        <h3 className="player-card__name">{player.name}</h3>

        <div className="player-card__meta">
          {player.teamLogoUrl && (
            <img src={player.teamLogoUrl} alt={player.teamName} className="player-card__team-logo" />
          )}
          <span className="player-card__team">{player.teamName}</span>
        </div>

        <div className="player-card__stats">
          <div className="stat"><span className="stat__val">{player.goals ?? 0}</span><span className="stat__lbl">Goals</span></div>
          <div className="stat"><span className="stat__val">{player.assists ?? 0}</span><span className="stat__lbl">Assists</span></div>
          <div className="stat"><span className="stat__val">{player.matchesPlayed ?? 0}</span><span className="stat__lbl">Apps</span></div>
          <div className="stat"><span className="stat__val">{player.minutesPlayed ?? 0}</span><span className="stat__lbl">Mins</span></div>
        </div>

        <div className="player-card__cards">
          <span className="yellow-card">{player.yellowCards ?? 0} 🟨</span>
          <span className="red-card">{player.redCards ?? 0} 🟥</span>
        </div>

        {player.season && <div className="player-card__season">{player.season}</div>}
      </div>
    </div>
  );
};

export default PlayerCard;
