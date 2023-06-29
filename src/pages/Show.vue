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
    }
  },
  methods: {
    getSingleProject() {
        axios.get(`${this.apiBase}${this.$route.params.slug}`).then(res => {
            if (res.data.success) {
                store.storedSingleProject = res.data.projects;
            } else {
                this.$router.push({ name: 'NotFound'})
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
    <div class="container mt-5">
      <div class="w-100 row justify-content-between">
        <div class="col-4 row align-items-center">
          <span class="badge badge-type w-25">
            {{ store.storedSingleProject.type.name }}
          </span>
        </div>
        <div class="col-4">
          <h1 class="text-center">
            {{ store.storedSingleProject.name }}
          </h1>
        </div>
        <div class="col-4 row justify-content-end">
          <div v-for="(tag, index) in store.storedSingleProject.tags" class="type-icon col-2" :class="tag.slug"> </div>
        </div>
      </div>
      <div class="w-100 mt-3 rounded-5 overflow-hidden" style="height: 600px">
        <img class="w-100 img-box" :src="`${store.pathImage}${store.storedSingleProject.image}`" alt="">
      </div>



    </div>
  </main>

</template>

<style lang="scss">
</style>
