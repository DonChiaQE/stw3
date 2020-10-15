import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Play from '../views/Play.vue'
import Create from '../views/Create.vue'
import Quiz from '../views/Quiz.vue'
import Score from '../views/Score.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/play',
    name: 'Play',
    component: Play
  },
  {
    path: '/play/quiz',
    name: 'Quiz',
    props: true,
    component: Quiz
  },
  {
    path: '/play/quiz/score',
    name: 'Score',
    props: true,
    component: Score
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
