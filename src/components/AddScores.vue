<template>
  <div class="container">
    <div class="card card-body mx-auto" style="width: 65%">
      <h3 class="mb-3" style="color: #3d195b">{{ gameMSG }}</h3>
      <form class="form-inline mb-3 mx-auto">
        <div class="row row-style">
          <div class="col">
            <input
              id="homeTeamName"
              type="text"
              class="form-control mb-3"
              placeholder="Home Team (Existing)"
            />
            <input
              id="homeTeamScore"
              type="text"
              class="form-control"
              placeholder="Goals (0-10)"
            />
          </div>
          <div class="col">
            <input
              id="awayTeamName"
              type="text"
              class="form-control mb-3"
              placeholder="Away Team (Existing)"
            />
            <input
              id="awayTeamScore"
              type="text"
              class="form-control"
              placeholder="Goals (0-10)"
            />
          </div>
          <div class="row row-style">
            <div class="col">
              <input
                id="gameDate"
                type="date"
                class="form-control mt-3 mx-auto"
                style="width: 50%"
              />
            </div>
          </div>
        </div>
      </form>

      <h4
        id="errorMessage"
        class="title text-center text-danger fw-bold"
        style="margin-bottom: 12px"
      ></h4>
      <button
        type="button"
        class="btn p-2 mx-auto mb-2"
        style="width: 10em; background-color: #3d195b"
        @click="updateHomeAwayTeam()"
      >
        <h5 class="text-white">{{ AddGame }}</h5>
      </button>
    </div>
  </div>
</template>

<script>
import json from "../../db.json";
export default {
  name: "Add Scores",
  props: {
    json: Array,
    gameMSG: String,
    AddGame: String,
  },
  methods: {
    updateHomeAwayTeam() {
      let gameDate = document.querySelector("#gameDate").value;
      let homeTeamName = document.querySelector("#homeTeamName").value;
      let homeTeamScore = parseInt(
        document.querySelector("#homeTeamScore").value
      );

      let awayTeamName = document.querySelector("#awayTeamName").value;
      let awayTeamScore = parseInt(
        document.querySelector("#awayTeamScore").value
      );
      let dateSplit = gameDate.split("-", gameDate.length);
      let gameYear = parseInt(dateSplit[0]);
      let gameMonth = parseInt(dateSplit[1]);
      let gameDay = parseInt(dateSplit[2]);

      console.log(gameMonth);
      console.log(gameDay)

      let homeWins;
      let homeLosses;
      let homeDraws;
      let homeTeamPoints;
      let homeID;

      let awayWins;
      let awayLosses;
      let awayDraws;
      let awayTeamPoints;
      let awayID;

      checkInput();

      function checkTeamName(teams, teamName) {
        teams = teams.teamStandings;
        let answer;
        for (let i = 0; i < teams.length; i++) {
          if (teamName == teams[i].Name || teamName == teams[i].ShortName) {
            return true;
          } else answer = false;
        }
        if (answer == false) {
          return false;
        }
      }

      function changeTeamName(teams, teamName) {
        teams = teams.teamStandings;
        for (let i = 0; i < teams.length; i++) {
          if (teamName == teams[i].Name || teamName == teams[i].ShortName) {
            return teams[i].Name;
          } 
        }
      }

      function getTeamNickname(teams, name) {
        teams = teams.teamStandings;
        for (let i = 0; i < teams.length; i++) {
          if (name == teams[i].Name || name == teams[i].ShortName) {
            return teams[i].ShortName;
          }
        }
      }

      function changeTeamProp(teams, homeName, awayName) {
        teams = teams.teamStandings;
        console.log(teams);
        for (let i = 0; i < teams.length; i++) {
          if (homeName == teams[i].Name || homeName == teams[i].ShortName) {
            homeWins = teams[i].Wins;
            homeLosses = teams[i].Losses;
            homeDraws = teams[i].Draws;
            homeTeamPoints = teams[i].Points;
            homeID = teams[i].id;
          }
          if (awayName == teams[i].Name || awayName == teams[i].ShortName) {
            awayWins = teams[i].Wins;
            awayLosses = teams[i].Losses;
            awayDraws = teams[i].Draws;
            awayTeamPoints = teams[i].Points;
            awayID = teams[i].id;
          }
        }
        if (homeTeamScore > awayTeamScore) {
          homeWins++;
          homeTeamPoints += 2;
          awayLosses++;
        } else if (homeTeamScore < awayTeamScore) {
          awayWins++;
          awayTeamPoints += 2;
          homeLosses++;
        } else if (homeTeamScore == awayTeamScore) {
          awayDraws++;
          homeDraws++;
          homeTeamPoints++;
          awayTeamPoints++;
        }
      }

      function checkWinner(homeName, awayName){
        if (homeTeamScore > awayTeamScore){
          return homeName;
        }else if (homeTeamScore < awayTeamScore){
          return awayName
        }else if (homeTeamScore == awayTeamScore){
          return null;
        }
      }

      async function updateTeam(wins, losses, draws, points, id) {
        let team = {
          Wins: parseInt(wins),
          Losses: parseInt(losses),
          Draws: parseInt(draws),
          Points: parseInt(points),
        };
        const res = await fetch(`http://localhost:5000/teamStandings/${id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(team),
        });
        const data = await res.json();
        console.log(data);
      }

      async function addScore(
        homeName,
        awayName,
        homeShort,
        awayShort,
        homeScore,
        awayScore,
        year,
        month,
        day
      ) {
        let months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        let game = {
          HomeTeam: changeTeamName(json, homeName),
          AwayTeam: changeTeamName(json, awayName),
          ShortHomeTeam: homeShort,
          ShortAwayTeam: awayShort,
          HomeScore: homeScore,
          AwayScore: awayScore,
          Month: months[month - 1],
          Year: year,
          Day: day,
          Winner: checkWinner(changeTeamName(json, homeName), changeTeamName(json, awayName))
        };
        const res = await fetch(`http://localhost:5000/games/`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(game),
        });
        const data = await res.json();
        console.log(data);
      }

      function checkInput() {
        if (
          checkTeamName(json, homeTeamName) == true &&
          checkTeamName(json, awayTeamName) == true &&
          gameYear == 2021 &&
          0 < homeTeamScore <= 10 &&
          0 < awayTeamScore <= 10 &&
          !isNaN(homeTeamScore) &&
          !isNaN(awayTeamScore) &&
          gameDate != null &&
          gameDate != undefined
        ) {
          console.log("if statement works");
          changeTeamProp(json, homeTeamName, awayTeamName);
          addScore(
            homeTeamName,
            awayTeamName,
            getTeamNickname(json, homeTeamName),
            getTeamNickname(json, awayTeamName),
            homeTeamScore,
            awayTeamScore,
            gameYear,
            gameMonth,
            gameDay
          );
          updateTeam(homeWins, homeLosses, homeDraws, homeTeamPoints, homeID);
          updateTeam(awayWins, awayLosses, awayDraws, awayTeamPoints, awayID);
          //these two functions actually work and update the json file.
        } else
          document.querySelector("#errorMessage").innerHTML =
            "Please enter teams correctly using the given parameters!";
      }
    },
  },
};
</script>

<style>
.row-style {
  width: 100%;
  margin-left: 0;
}
</style>  