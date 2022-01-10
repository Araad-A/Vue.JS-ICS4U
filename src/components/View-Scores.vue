<template>
  <header id="main-header">
    <div class="container">
      <h1 id="header-title" class="text-center">{{ gamesMSG }}</h1>
    </div>
  </header>
  <section>
    <div
      class="container"
      v-for="game in games.slice(this.page * 10 - 10, this.page * 10)"
      :key="game.id"
    >
      <ul>
        <div class="card mt-4 mx-auto" style="width: 65%">
          <div class="card-header">
            <h3 class="mt-2" style="color: #3d195b">
              {{ game.Month }} {{ game.Day }}, {{ game.Year }}
            </h3>
          </div>
          <div
            class="container mt-3 scores"
            style="text-align: left; margin-left: 10px"
          >
            <h4
              :style="[
                game.HomeScore == game.AwayScore
                  ? 'font-weight: bold'
                  : game.HomeScore > game.AwayScore
                  ? 'font-weight: bold'
                  : '',
              ]"
              class="home"
              style="color: #3d195b"
            >
              {{ game.HomeTeam }}
            </h4>
            <h4 style="color: #3d195b" class="team me-4 ps-3">
              {{ game.HomeScore }}
            </h4>
          </div>
          <div class="container" style="text-align: left; margin-left: 10px">
            <p style="color: #3d195b">{{ game.ShortHomeTeam }}</p>
          </div>
          <div
            class="container mt-4 scores"
            style="text-align: left; margin-left: 10px"
          >
            <h4
              :style="[
                game.HomeScore == game.AwayScore
                  ? 'font-weight: bold'
                  : game.HomeScore < game.AwayScore
                  ? 'font-weight: bold'
                  : '',
              ]"
              class="away"
              style="color: #3d195b"
            >
              {{ game.AwayTeam }}
            </h4>
            <h4 style="color: #3d195b" class="team me-4 ps-3">
              {{ game.AwayScore }}
            </h4>
          </div>
          <div class="container" style="text-align: left; margin-left: 10px">
            <p style="color: #3d195b">{{ game.ShortAwayTeam }}</p>
          </div>
        </div>
      </ul>
    </div>
  </section>

  <div>
    <button style="background-color: #3d195b" class="btn text-light ml-5 mb-5 px-3 py-2" @click="prevPage()">
      &lt;
    </button>
    <button style="background-color: #3d195b" class="btn text-light ms-5 mb-5 px-3 py-2" @click="nextPage()">
      >
    </button>
  </div>
</template>

<script>
import json from "../../db.json";

let games = json.games;
console.log(games);

export default {
  name: "View Scores",
  props: {
    gamesMSG: String,
    games: Array,
    json: Array,
    pageNum: Number,
  },
  created() {
    this.page = parseInt(this.pageNum);
  },
  data() {
    return {
      page: Number,
    };
  },
  methods: {
    nextPage() {
      let max = Math.ceil(json.games.length / 10);
      if (this.page < max) {
        this.page += 1;
      } else if (this.page >= max) {
        this.page = this.page;
      }
      console.log(max);
    },
    prevPage() {
      let max = Math.ceil(json.games.length / 10);
      if (this.page <= 1) {
        this.page = this.page;
      } else if (this.page <= max) {
        this.page -= 1;
      }
      console.log(max);
    },
  },
};
</script>

<style scoped>
#main-header {
  background-color: #3d195b;
  color: white;
  padding-top: 1.7em;
  padding-bottom: 1.4em;
}
.scores {
  display: flex;
  justify-content: space-between;
}
.card {
  border-radius: 5px;
}
.team {
  border-left: 2px solid #3d195b;
}
</style>