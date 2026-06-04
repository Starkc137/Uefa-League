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

export const fetchPlayers = async ({ team, name, position, nation, season, compare } = {}) => {
  let query = supabase.from('player_stats').select('*');

  if (season)   query = query.eq('season', season);
  if (team)     query = query.ilike('team_name', `%${team}%`);
  if (name)     query = query.ilike('name', `%${name}%`);
  if (position) query = query.ilike('position', `%${position}%`);
  if (nation)   query = query.ilike('nation', `%${nation}%`);
  if (compare)  query = query.in('name', compare.split(',').map(s => s.trim()));

  const { data, error } = await query.order('goals', { ascending: false });
  if (error) throw error;
  return { data: data ?? [] };  // always an array
};

export const fetchSeasons = async () => {
  const { data, error } = await supabase
    .from('player_stats')
    .select('season')
    .order('season', { ascending: false });

  if (error) throw error;
  const unique = [...new Set((data ?? []).map(r => r.season))];
  return { data: unique };
};

export default api;
