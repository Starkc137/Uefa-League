package com.ucl.premier_space.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/player")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    /**
     * GET /api/v1/player
     * Query params (all optional):
     *   team, name, position, nation  — filter criteria
     *   season                        — e.g. "2024-25"; omit for all seasons
     *   compare                       — comma-separated player names for side-by-side comparison
     */
    @GetMapping
    public ResponseEntity<List<Player>> getPlayers(
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) String nation,
            @RequestParam(required = false) String season,
            @RequestParam(required = false) String compare) {

        List<Player> result;

        if (compare != null && !compare.isBlank()) {
            List<String> names = List.of(compare.split(","));
            result = playerService.getPlayersByNames(names.stream().map(String::trim).toList(), season);
        } else if (team != null && position != null) {
            result = playerService.getPlayersByTeamAndPosition(team, position, season);
        } else if (team != null) {
            result = playerService.getPlayersByTeam(team, season);
        } else if (name != null) {
            result = playerService.getPlayersByName(name, season);
        } else if (position != null) {
            result = playerService.getPlayersByPosition(position, season);
        } else if (nation != null) {
            result = playerService.getPlayersByNation(nation, season);
        } else {
            result = playerService.getPlayers(season);
        }

        return ResponseEntity.ok(result);
    }

    /**
     * GET /api/v1/player/seasons
     * Returns all distinct seasons in the database, newest first.
     */
    @GetMapping("/seasons")
    public ResponseEntity<List<String>> getSeasons() {
        return ResponseEntity.ok(playerService.getAllSeasons());
    }

    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
        return new ResponseEntity<>(playerService.addPlayer(player), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Player> updatePlayer(@RequestBody Player player) {
        Player updated = playerService.updatePlayer(player);
        return updated != null
                ? ResponseEntity.ok(updated)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<String> deletePlayer(
            @RequestParam String name,
            @RequestParam String teamName,
            @RequestParam String season) {
        playerService.deletePlayer(name, teamName, season);
        return ResponseEntity.ok("Player deleted successfully");
    }
}
