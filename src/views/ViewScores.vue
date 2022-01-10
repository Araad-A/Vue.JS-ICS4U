<template>
  <viewScores pageNum = 1 gamesMSG = "League Games" :games="games"/>
</template>

<script>

import viewScores from '@/components/View-Scores.vue'

export default {
  name: 'View-Scores',
  components: {
    viewScores
  },
  data(){
    return {
      games:Array 
    }
  },
  methods: {
    async fetchTasks(){
      const res = await fetch('http://localhost:5000/games');
      const data = await res.json();
      return data;
    }
  },
  async created(){
    this.games = await this.fetchTasks();
  }
}
</script>
