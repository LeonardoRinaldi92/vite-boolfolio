<script >
import axios from 'axios';

// backtick : `

export default {
  data() {
    return {
      projects: [],
      apiBase: 'http://127.0.0.1:8000/api/projects?page=4'
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
      {{ element.name }} => {{ element.type.name }} =><span v-for="(tag,index) in element.tags" >{{ tag.name }}</span>
    </h3>
    <img :src="'http://127.0.0.1:8000/storage/' + element.image" alt="">

  </div>
</template>

<style lang="scss">
@use './style/main.scss';
</style>
