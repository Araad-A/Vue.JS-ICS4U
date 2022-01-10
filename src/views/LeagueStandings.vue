<template>
  <div class = "container" id="app">
    <Standings msg = "Premier League Standings" :standings="standings" />
  </div>
</template>

<script>
import Standings from '@/components/Standings.vue'

export default {
  name: 'LeagueStandings',
  components: {
    Standings
  },
  data(){
    return {
      standings:Array 
    }
  },
  methods: {
    async fetchTasks(){
      const res = await fetch('http://localhost:5000/teamStandings');
      const data = await res.json();
      return data;
    }
  },
  async created(){
    this.standings = await this.fetchTasks();
  }
}


</script>

<style>
</style>