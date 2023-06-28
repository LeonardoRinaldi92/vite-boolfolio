<script >
import axios from 'axios';

// backtick : `

export default {
  data() {
    return {
      projects: [],
      apiBase: 'http://127.0.0.1:8000/api/projects'
    }
  },
  mounted() {
    this.getProjects()

  },
  methods: {
    getProjects(){
      axios.get(`${this.apiBase}`).then(res=> {
        this.projects = res.data.projects.data
      })
    }
  }
}

</script>

<template>
  <h1>Ciao mondo</h1>

  <div v-for="(element,index) in projects">
    <h3>
      {{ element.name }}
    </h3>

  </div>
</template>

<style lang="scss">
@use './style/main.scss';
</style>
