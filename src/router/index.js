import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'LeagueStandings',
    component: () => import('../views/LeagueStandings.vue')
  },
  {
    path: '/add',
    name: 'Add Scores',
    component: () => import('../views/Add.vue')
  },
  {
    path: '/viewgames',
    name: 'view-scores',
    component: () => import('../views/ViewScores.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
