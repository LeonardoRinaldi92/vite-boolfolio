<script >

import {store} from '../store';

import axios from 'axios';

// backtick : `

export default {
  name: 'App',
  data() {
    return{
      store,
      apiBase: 'http://127.0.0.1:8000/api/projects/',
      singleProject : [],
    }
  },
  methods: {
    getSingleProject() {
        axios.get(`${this.apiBase}${this.$route.params.slug}`).then(res => {
            if (res.data.success) {
                store.storedSingleProject = res.data.projects;
                console.log(store.storedSingleProject)
            } 
        });
    }

  },
    created() {
    this.getSingleProject()
  }
}

</script>

<template>
  <main>
    <h1>{{ store.storedSingleProject.name }}</h1>

  </main>

</template>

<style lang="scss">
</style>
