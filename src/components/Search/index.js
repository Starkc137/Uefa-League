import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";
import playerData from "../../data/uefa_stats.json";

const Search = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [searchQuery, setSearchQuery] = useState('');
    const [allPlayers, setAllPlayers] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 3000); 

        return () => { 
            clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
    const normalizedQuery = searchQuery
        .toLowerCase()
        .normalize('NFD')                   // Split letters from diacritics
        .replace(/[\u0300-\u036f]/g, '');   // Remove diacritics

    const filtered = playerData.filter(player => {
        const normalizedName = player.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

        return normalizedName.includes(normalizedQuery);
    });

    setAllPlayers(filtered);
    }, [searchQuery]);


    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };


    const renderPlayers = (players) => { 
        return (
            <div className="the-team-details-container">
                <div className="the-players-list">
                    {players.map((player, idx) => (
                        <div key={idx} className="the-player-card">
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
            </div>
        )
    }

    return (
        <>
            <div className="container teams-page">
                <h1 className="page-title">
                    <br/>
                    <br/>
                    <AnimatedLetters letterClass={letterClass} strArray={"Search".split("")} idx={15}/>
                </h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for players"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div>{renderPlayers(allPlayers)}</div>
            </div>
            <Loader type="pacman"/>
        </>
    );
}

export default Search;
