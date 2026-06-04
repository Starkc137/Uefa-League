import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * Fetch players from the backend.
 * All params are optional. season=null fetches across all seasons.
 */
export const fetchPlayers = ({ team, name, position, nation, season, compare } = {}) => {
  const params = {};
  if (team)     params.team     = team;
  if (name)     params.name     = name;
  if (position) params.position = position;
  if (nation)   params.nation   = nation;
  if (season)   params.season   = season;
  if (compare)  params.compare  = compare;
  return api.get('/api/v1/player', { params });
};

export const fetchSeasons = () => api.get('/api/v1/player/seasons');

export default api;
