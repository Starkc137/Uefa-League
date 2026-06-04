package com.ucl.premier_space.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    // Season-aware lookups — all filtering done in the database, not in Java streams

    @Query("SELECT p FROM Player p WHERE (:season IS NULL OR p.season = :season) ORDER BY p.goals DESC, p.assists DESC")
    List<Player> findAllBySeason(@Param("season") String season);

    @Query("SELECT p FROM Player p WHERE " +
           "LOWER(FUNCTION('unaccent', p.teamName)) LIKE LOWER(CONCAT('%', FUNCTION('unaccent', :team), '%')) " +
           "AND (:season IS NULL OR p.season = :season)")
    List<Player> findByTeamContaining(@Param("team") String team, @Param("season") String season);

    @Query("SELECT p FROM Player p WHERE " +
           "LOWER(FUNCTION('unaccent', p.name)) LIKE LOWER(CONCAT('%', FUNCTION('unaccent', :name), '%')) " +
           "AND (:season IS NULL OR p.season = :season)")
    List<Player> findByNameContaining(@Param("name") String name, @Param("season") String season);

    @Query("SELECT p FROM Player p WHERE " +
           "LOWER(p.position) LIKE LOWER(CONCAT('%', :position, '%')) " +
           "AND (:season IS NULL OR p.season = :season)")
    List<Player> findByPositionContaining(@Param("position") String position, @Param("season") String season);

    @Query("SELECT p FROM Player p WHERE " +
           "LOWER(FUNCTION('unaccent', p.nation)) LIKE LOWER(CONCAT('%', FUNCTION('unaccent', :nation), '%')) " +
           "AND (:season IS NULL OR p.season = :season)")
    List<Player> findByNationContaining(@Param("nation") String nation, @Param("season") String season);

    @Query("SELECT p FROM Player p WHERE " +
           "LOWER(FUNCTION('unaccent', p.teamName)) LIKE LOWER(CONCAT('%', FUNCTION('unaccent', :team), '%')) " +
           "AND LOWER(p.position) LIKE LOWER(CONCAT('%', :position, '%')) " +
           "AND (:season IS NULL OR p.season = :season)")
    List<Player> findByTeamAndPosition(@Param("team") String team,
                                        @Param("position") String position,
                                        @Param("season") String season);

    @Query("SELECT p FROM Player p WHERE p.name IN :names AND (:season IS NULL OR p.season = :season)")
    List<Player> findByNamesAndSeason(@Param("names") List<String> names, @Param("season") String season);

    @Query("SELECT DISTINCT p.season FROM Player p ORDER BY p.season DESC")
    List<String> findAllSeasons();

    Optional<Player> findByNameAndTeamNameAndSeason(String name, String teamName, String season);

    void deleteByNameAndTeamNameAndSeason(String name, String teamName, String season);
}
