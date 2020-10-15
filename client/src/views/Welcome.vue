<template>
  <b-container>
    <b-row class="vh-100 text-center" align-v="center">
      <b-col>
        <h1 class="rounded p-4 text-right" style="background: #FFFFFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;">Welcome to this design ripoff</h1>
        <b-row align-v="center" class="mt-4 mb-4">
        <b-col>
          <router-link to="/create">
            <h2
              class="rounded p-4 text-right"
              :class="isHoveredCreate ? 'fill-text' : ''"
              v-b-hover="handleHoverCreate"
              style="background: #FFFFFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px; color: black; text-decoration: underline;"
            >
            create.
            </h2>
          </router-link>
        </b-col>
        <b-col>
          <router-link to="/play">
            <h2
              class="rounded p-4 text-right"
              :class="isHoveredPlay ? 'fill-text' : ''"
              v-b-hover="handleHoverPlay"
              style="background: #FFFFFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px; color: black; text-decoration: underline;"
            >
            play.</h2>
          </router-link>
        </b-col>
        </b-row>
        <b-col class="rounded p-4" style="background: #FFFFFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px;">
          <h2 class="text-right">leaderboard.</h2>
          <b-table class="text-right" striped :items="users" thead-class="d-none" >
          </b-table>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
      return {
        isHoveredCreate: false,
        isHoveredPlay: false,
        users: []
      }
    },
    methods: {
      getUsers () {
            const path = 'http://localhost:5000/receiveUsername'
            axios.get(path)
            .then((res) => {
                this.users = res.data.users
            })
            .catch((error) => {
                console.error(error);
            })
        },
      handleHoverCreate(hovered) {
        this.isHoveredCreate = hovered
      },
      handleHoverPlay(hovered) {
        this.isHoveredPlay = hovered
      }
    },
    created () {
        this.getUsers()
    }
}
</script>

<style scoped>

.fill-text {
  color: black !important;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color:black !important;
}
</style>
