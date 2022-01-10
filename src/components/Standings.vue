<template>
  <div class="container mb-5 mt-4">
    <div id="main" class="card card-body">
      <form class="form-inline mb-3 align-self-lg-end">
        <input
          id="filter"
          type="text"
          class="form-control mr-2"
          placeholder="Search"
          @keyup="filterTeams"
        />
      </form>
      <h2 class="title" style="color: #3d195b">{{ msg }}</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th
              id="name"
              class="h5 fw-bold head"
              scope="col"
              @click="sort('Name')"
            >
              Team
            </th>
            <th
              id="wins"
              class="h5 fw-bold head"
              scope="col"
              @click="sort('Wins')"
            >
              Wins
            </th>
            <th
              id="losses"
              class="h5 fw-bold head"
              scope="col"
              @click="sort('Losses')"
            >
              Losses
            </th>
            <th
              id="draws"
              class="h5 fw-bold head"
              scope="col"
              @click="sort('Draws')"
            >
              Draws
            </th>
            <th
              id="points"
              class="h5 fw-bold head"
              scope="col"
              @click="sort('Points')"
            >
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          <tr :key="standing.id" v-for="standing in filteredStandings">
            <td>
              <h6>{{ standing.Name }}</h6>
            </td>
            <td>
              <h6>{{ standing.Wins }}</h6>
            </td>
            <td>
              <h6>{{ standing.Losses }}</h6>
            </td>
            <td>
              <h6>{{ standing.Draws }}</h6>
            </td>
            <td>
              <h6>{{ standing.Points }}</h6>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  name: "Standings",
  created() {
    setTimeout(() => {
      this.filteredStandings = this.standings;
    }, 1000);
  },
  props: {
    msg: String,
    standings: Array,
  },
  data() {
    return {
      filteredStandings: Array,
    };
  },
  methods: {
    sort(field) {
      let sortedStandings = this.filteredStandings;
      let sortDirection = "ASC";
      let fa;
      let fb;
      let name = document.querySelector("#name");
      let wins = document.querySelector("#wins");
      let losses = document.querySelector("#losses");
      let draws = document.querySelector("#draws");
      let points = document.querySelector("#points");
      if (sortDirection == "ASC") {
        sortedStandings = sortedStandings.sort((a, b) => {
          if (field === "Name") {
            fa = a.Name;
            fb = b.Name;
            name.className = "standings fw-bold h5";
            wins.className = "head fw-bold h5";
            losses.className = "head fw-bold h5";
            draws.className = "head fw-bold h5";
            points.className = "head fw-bold h5";
          } else if (field === "Wins") {
            fa = a.Wins;
            fb = b.Wins;
            wins.className = "standings fw-bold h5";
            name.className = "head fw-bold h5";
            losses.className = "head fw-bold h5";
            draws.className = "head fw-bold h5";
            points.className = "head fw-bold h5";
          } else if (field === "Draws") {
            fa = a.Draws;
            fb = b.Draws;
            draws.className = "standings fw-bold h5";
            name.className = "head fw-bold h5";
            losses.className = "head fw-bold h5";
            wins.className = "head fw-bold h5";
            points.className = "head fw-bold h5";
          } else if (field === "Points") {
            fa = a.Points;
            fb = b.Points;
            points.className = "standings fw-bold h5";
            name.className = "head fw-bold h5";
            losses.className = "head fw-bold h5";
            draws.className = "head fw-bold h5";
            wins.className = "head fw-bold h5";
          } else if (field === "Losses") {
            fa = a.Losses;
            fb = b.Losses;
            losses.className = "standings fw-bold h5";
            name.className = "head fw-bold h5";
            points.className = "head fw-bold h5";
            draws.className = "head fw-bold h5";
            wins.className = "head fw-bold h5";
          }
          if (fa < fb) {
            sortDirection = "ASC";
            return -1;
          }
          if (fa > fb) {
            sortDirection = "DESC";
            return 1;
          } else return 0;
        });
      }
      console.log(sortDirection);
      if (sortDirection == "DESC") {
        sortedStandings = sortedStandings.sort((a, b) => {
          if (field === "Losses") {
            fa = a.Losses;
            fb = b.Losses;
            losses.className = "standings fw-bold h5";
            name.className = "head fw-bold h5";
            points.className = "head fw-bold h5";
            draws.className = "head fw-bold h5";
            wins.className = "head fw-bold h5";
          } else if (field === "Wins") {
            fa = a.Wins;
            fb = b.Wins;
            wins.className = "standings fw-bold h5";
            name.className = "head fw-bold h5";
            losses.className = "head fw-bold h5";
            draws.className = "head fw-bold h5";
            points.className = "head fw-bold h5";
          }
          if (fa > fb) {
            sortDirection = "ASC";
            return -1;
          }
          if (fa < fb) {
            sortDirection = "ASC";
            return 1;
          }
          if (fa == fb) {
            sortDirection = "ASC";
          }
        });
      }
      console.log("sort is running correctly");
    },
    filterTeams() {
      console.log(1);
      let filterValue = document.querySelector("#filter").value;
      console.log(2);
      console.log(this.standings);
      console.log(3);
      this.filteredStandings = this.standings;
      this.filteredStandings = this.standings.filter(
        (f) => f.Name.toLowerCase().indexOf(filterValue.toLowerCase()) === 0
      );
      console.log(4);
      console.log(5);
    },
  },
};

/*
<div>
  <div :key="standing.id" v-for="standing in standings">
    <h3>
      {{ standing.Name }}
    </h3>
    <p>{{ standing.ShortName }}</p>
  </div>
</div>


 let filterValue = document.querySelector("#filter").value;
      let filteredStandings = this.standings;
      filteredStandings = filteredStandings.filter(filteredStandings => (filteredStandings.Name.toLowerCase().indexOf(filterValue.toLowerCase()) === 0));
      console.log(filteredStandings)
      console.log(filterValue)
*/
</script>

<style scoped>
.button {
  border-radius: 7px;
  border: none;
}

.standings {
  color: #3d195b;
}

.head {
  color: #797979;
}
</style>