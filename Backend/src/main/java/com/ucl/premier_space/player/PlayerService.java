package com.ucl.premier_space.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers(String season) {
        return playerRepository.findAllBySeason(season);
    }

    public List<Player> getPlayersByTeam(String team, String season) {
        return playerRepository.findByTeamContaining(team, season);
    }

    public List<Player> getPlayersByName(String name, String season) {
        return playerRepository.findByNameContaining(name, season);
    }

    public List<Player> getPlayersByPosition(String position, String season) {
        return playerRepository.findByPositionContaining(position, season);
    }

    public List<Player> getPlayersByNation(String nation, String season) {
        return playerRepository.findByNationContaining(nation, season);
    }

    public List<Player> getPlayersByTeamAndPosition(String team, String position, String season) {
        return playerRepository.findByTeamAndPosition(team, position, season);
    }

    /**
     * Fetch multiple named players at once — used by the Compare endpoint.
     * @param names comma-separated or list of player names
     */
    public List<Player> getPlayersByNames(List<String> names, String season) {
        return playerRepository.findByNamesAndSeason(names, season);
    }

    public List<String> getAllSeasons() {
        return playerRepository.findAllSeasons();
    }

    public Player addPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player updatePlayer(Player updatedPlayer) {
        Optional<Player> existing = playerRepository.findByNameAndTeamNameAndSeason(
                updatedPlayer.getName(), updatedPlayer.getTeamName(), updatedPlayer.getSeason());

        if (existing.isPresent()) {
            Player p = existing.get();
            p.setNation(updatedPlayer.getNation());
            p.setPosition(updatedPlayer.getPosition());
            p.setDetailedPosition(updatedPlayer.getDetailedPosition());
            p.setAge(updatedPlayer.getAge());
            p.setMatchesPlayed(updatedPlayer.getMatchesPlayed());
            p.setMinutesPlayed(updatedPlayer.getMinutesPlayed());
            p.setGoals(updatedPlayer.getGoals());
            p.setAssists(updatedPlayer.getAssists());
            p.setPenaltiesScored(updatedPlayer.getPenaltiesScored());
            p.setYellowCards(updatedPlayer.getYellowCards());
            p.setRedCards(updatedPlayer.getRedCards());
            p.setTeamName(updatedPlayer.getTeamName());
            p.setTeamLogoUrl(updatedPlayer.getTeamLogoUrl());
            p.setPlayerImageUrl(updatedPlayer.getPlayerImageUrl());
            return playerRepository.save(p);
        }
        return null;
    }

    @Transactional
    public void deletePlayer(String name, String teamName, String season) {
        playerRepository.deleteByNameAndTeamNameAndSeason(name, teamName, season);
    }
}
