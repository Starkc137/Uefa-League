import React from "react";
import { useParams } from "react-router-dom";
import playerData from "../../../data/uefa_stats.json";
import "./index.scss";

const TeamDetails = () => {
  const { teamName } = useParams();

  const players = playerData.filter(
    (player) => player.team_name.toLowerCase() === teamName.toLowerCase()
  );

  return (
    <div className="team-details-container">
      <h1>{teamName} - Players</h1>
      {players.length === 0 ? (
        <p>No players found for this team.</p>
      ) : (
        <div className="players-list">
          {players.map((player, idx) => (
            <div key={idx} className="player-card">
              <h3>{player.name}</h3>
              <p><strong>Nation:</strong> {player.nation}</p>
              <p><strong>Position:</strong> {player.position}</p>
              <p><strong>Age:</strong> {player.age}</p>
              <p><strong>Matches Played:</strong> {player.matches_played}</p>
              <p><strong>Goals:</strong> {player.goals}</p>
              <p><strong>Assists:</strong> {player.assists}</p>
              <p><strong>Yellow Cards:</strong> {player.yellow_cards}</p>
              <p><strong>Red Cards:</strong> {player.red_cards}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
