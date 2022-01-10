<template>
  <div class = "bg-light mb-3" id="nav">
    <img id = "league-logo-1" alt="Vue logo" src="@/assets/logo.png">
    <router-link class = "h5" to="/">Standings</router-link> |
    <router-link class = "h5" to="/add">Add Teams & Games</router-link> |
    <router-link class = "h5" to="/viewgames">View Games</router-link>
    <img id = "league-logo-2" alt="Vue logo" src="@/assets/logo.png">
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#league-logo-1{
  width:3em;
  margin-right: 1.5em;
}

#league-logo-2{
  width:3em;
  margin-left: 1.5em;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #85898d;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #3d195b;
}
</style>
