<template>
  <div class="container">
    <div class="card card-body mx-auto" style="width: 65%">
      <h3 class="mb-3" style="color: #3d195b">{{ teamMSG }}</h3>
      <form class="form-inline mb-3 mx-auto">
        <div class="row row-style">
          <div class="col">
            <input
              id="teamName"
              type="text"
              class="form-control mb-3"
              placeholder="New Team Name"
            />
          </div>
          <div class="col">
            <input
              id="Nickname"
              type="text"
              class="form-control mb-3"
              placeholder="Nickname"
            />
          </div>
          <div class="col">
            <input
              id="teamRecord"
              type="text"
              class="form-control"
              placeholder="Record (W-L-D)"
            />
          </div>
          <div class="col">
            <input
              id="teamPoints"
              type="text"
              class="form-control mb-3"
              placeholder="Points (0-99)"
            />
          </div>
        </div>
      </form>

      <h4
        id="error"
        class="title text-center text-danger fw-bold"
        style="margin-bottom: 12px"
      ></h4>
      <button
        type="button"
        class="btn p-2 mx-auto mb-2"
        style="width: 10em; background-color: #3d195b"
        @click="addNewTeam()"
      >
        <h5 class="text-white">{{ AddTeam }}</h5>
      </button>
    </div>
  </div>
</template>

<script>
import json from "../../db.json";

console.log(json.games);

export default {
  name: "Add Scores",
  props: {
    json: Array,
    teamMSG: String,
    AddTeam: String,
  },
  methods: {
    addNewTeam() {
      let teamName = document.querySelector("#teamName").value;
      let teamShortName = document.querySelector("#Nickname").value;
      let teamRecord = document.querySelector("#teamRecord").value;
      let teamPoints = parseInt(document.querySelector("#teamPoints").value);

      let teamRecordSplit = teamRecord.split("-", teamRecord.length);
      let wins = parseInt(teamRecordSplit[0]);
      let losses = parseInt(teamRecordSplit[1]);
      let draws = parseInt(teamRecordSplit[2]);

      console.log(teamRecordSplit);
      console.log(teamPoints);

      function checkNewInputs() {
        if (
          checkTeam(json) == true &&
          checkNickName(json) == true &&
          teamRecord.includes("-") &&
          teamRecordSplit.length == 3 &&
          !isNaN(wins) &&
          !isNaN(losses) &&
          !isNaN(draws) &&
          !isNaN(teamPoints) &&
          teamPoints < 100 &&
          teamPoints >= 0
        ) {
          console.log("main if statement works");
          addTeam();
        } else
          document.querySelector("#error").innerHTML =
            "Please enter teams correctly using the given parameters!";
      }

      function checkTeam(teams) {
        teams = teams.teamStandings;
        let answer;
        for (let i = 0; i < teams.length; i++) {
          if (teamName != teams[i].Name && teamName != teams[i].ShortName) {
            return true;
          } else answer = false;
        }
        if (answer == false) {
          return false;
        }
      }

      function checkNickName(teams) {
        teams = teams.teamStandings;
        let answer;
        for (let i = 0; i < teams.length; i++) {
          if (teamShortName != teams[i].ShortName) {
            return true;
          } else answer = false;
        }
        if (answer == false) {
          return false;
        }
      }

      function capital(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
      }

      async function addTeam() {
        let team = {
          Name: capital(teamName),
          ShortName: teamShortName,
          Wins: wins,
          Losses: losses,
          Draws: draws,
          Points: teamPoints,
        };
        const res = await fetch(`http://localhost:5000/teamStandings/`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(team),
        });
        const data = await res.json();
        console.log(data);
      }

      checkNewInputs();
    },
  },
};
</script>

<style scoped>
</style>  