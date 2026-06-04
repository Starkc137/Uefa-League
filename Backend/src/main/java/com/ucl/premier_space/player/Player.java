package com.ucl.premier_space.player;

import jakarta.persistence.*;

@Entity
@Table(
    name = "player_stats",
    uniqueConstraints = @UniqueConstraint(columnNames = {"name", "team_name", "season"})
)
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "nation")
    private String nation;

    @Column(name = "position")
    private String position;

    @Column(name = "detailed_position")
    private String detailedPosition;

    @Column(name = "age")
    private Integer age;

    @Column(name = "matches_played")
    private Integer matchesPlayed;

    @Column(name = "minutes_played")
    private Integer minutesPlayed;

    @Column(name = "goals")
    private Integer goals;

    @Column(name = "assists")
    private Integer assists;

    @Column(name = "penalties_scored")
    private Integer penaltiesScored;

    @Column(name = "yellow_cards")
    private Integer yellowCards;

    @Column(name = "red_cards")
    private Integer redCards;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "team_logo_url")
    private String teamLogoUrl;

    @Column(name = "player_image_url")
    private String playerImageUrl;

    @Column(name = "season", nullable = false)
    private String season;

    public Player() {}

    public Player(String name, String nation, String position, String detailedPosition,
                  Integer age, Integer matchesPlayed, Integer minutesPlayed,
                  Integer goals, Integer assists, Integer penaltiesScored,
                  Integer yellowCards, Integer redCards,
                  String teamName, String teamLogoUrl, String playerImageUrl, String season) {
        this.name = name;
        this.nation = nation;
        this.position = position;
        this.detailedPosition = detailedPosition;
        this.age = age;
        this.matchesPlayed = matchesPlayed;
        this.minutesPlayed = minutesPlayed;
        this.goals = goals;
        this.assists = assists;
        this.penaltiesScored = penaltiesScored;
        this.yellowCards = yellowCards;
        this.redCards = redCards;
        this.teamName = teamName;
        this.teamLogoUrl = teamLogoUrl;
        this.playerImageUrl = playerImageUrl;
        this.season = season;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNation() { return nation; }
    public void setNation(String nation) { this.nation = nation; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public String getDetailedPosition() { return detailedPosition; }
    public void setDetailedPosition(String detailedPosition) { this.detailedPosition = detailedPosition; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public Integer getMatchesPlayed() { return matchesPlayed; }
    public void setMatchesPlayed(Integer matchesPlayed) { this.matchesPlayed = matchesPlayed; }

    public Integer getMinutesPlayed() { return minutesPlayed; }
    public void setMinutesPlayed(Integer minutesPlayed) { this.minutesPlayed = minutesPlayed; }

    public Integer getGoals() { return goals; }
    public void setGoals(Integer goals) { this.goals = goals; }

    public Integer getAssists() { return assists; }
    public void setAssists(Integer assists) { this.assists = assists; }

    public Integer getPenaltiesScored() { return penaltiesScored; }
    public void setPenaltiesScored(Integer penaltiesScored) { this.penaltiesScored = penaltiesScored; }

    public Integer getYellowCards() { return yellowCards; }
    public void setYellowCards(Integer yellowCards) { this.yellowCards = yellowCards; }

    public Integer getRedCards() { return redCards; }
    public void setRedCards(Integer redCards) { this.redCards = redCards; }

    public String getTeamName() { return teamName; }
    public void setTeamName(String teamName) { this.teamName = teamName; }

    public String getTeamLogoUrl() { return teamLogoUrl; }
    public void setTeamLogoUrl(String teamLogoUrl) { this.teamLogoUrl = teamLogoUrl; }

    public String getPlayerImageUrl() { return playerImageUrl; }
    public void setPlayerImageUrl(String playerImageUrl) { this.playerImageUrl = playerImageUrl; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }
}
