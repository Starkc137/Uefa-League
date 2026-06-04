import React, { useEffect, useState } from 'react';
import { fetchSeasons } from '../../api';
import './index.scss';

/**
 * Dropdown populated from the API's /seasons endpoint.
 * Passes the selected season string up via onChange.
 * Shows "All seasons" as the default (empty string).
 */
const SeasonSelector = ({ value, onChange }) => {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    fetchSeasons()
      .then(res => setSeasons(res.data))
      .catch(() => setSeasons([]));
  }, []);

  return (
    <div className="season-selector">
      <label htmlFor="season-select">Season</label>
      <select
        id="season-select"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">All seasons</option>
        {seasons.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
};

export default SeasonSelector;
