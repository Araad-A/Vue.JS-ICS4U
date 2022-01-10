<template>
  <AddScores gameMSG = "Please Enter a Game" AddGame = "Add Game" class = "mb-2"/>
  <AddTeams teamMSG = "Please Enter a Team" AddTeam = "Add Team" class = "mt-5"/>
</template>

<script>
import AddScores from '@/components/AddScores.vue'
import AddTeams from '@/components/AddTeams.vue'

export default {
  components: {
    AddScores,
    AddTeams
  }
}

</script>

<style>
</style>