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
      rightpage : null
      
    }
  },
  methods: {
    getSingleProject() {
        axios.get(`${this.apiBase}${this.$route.params.slug}`).then(res => {
            if (res.data.success) {
                store.storedSingleProject = res.data.projects;
                this.rightpage = res.data.projects.slug

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
    <div v-if="(store.lastPage === this.rightpage)" class="p-5">
      <div class="row position-relative">
        <div class="col-8">
          <div class="w-100 mt-3 rounded-5 overflow-hidden" style="border: 1px solid rgba(0, 0, 0, 0.137);">
            <img v-if="(store.storedSingleProject.image)" class="w-100 img-box" :src="`${store.pathImage}${store.storedSingleProject.image}`" alt="">
            <img v-else class="img-box" src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" alt="">
          </div>
        </div>
        <div class="col-4 desc-box">
          <div class="row justify-content-end w-100">
            <span class="badge badge-type w-25 mt-4">
              {{ store.storedSingleProject.type.name }}
            </span>
          </div>
          <h1 class="text-center text-capitalize">
            {{ store.storedSingleProject.name }}
          </h1>
          <div class="row justify-content-center text-center mt-4">
            <div v-for="(tag, index) in store.storedSingleProject.tags" class="type-icon col-2" :class="tag.slug"> </div>
          </div>
          <h5 class="text-center mt-4">
            {{ store.storedSingleProject.relase_date }}
          </h5>
          <p class="text-center mt-3">
            <i>''{{ store.storedSingleProject.description }}''</i>
          </p>
          <div>
            <div>
              <div class="text-center">
                <div class="logo-box">
                  <img class="h-100" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="">
                </div>
                <span style="vertical-align:70%">
                  <a class=" text-decoration-none text-bg-dark ms-2" href="https://github.com/LeonardoRinaldi92/htmlcss-discord" target="_blank"><b>Vai alla repo su GitHub</b></a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
  main {
    height: 100vh;
  }

  .desc-box {
    position: fixed;
    top: 40px;
    right: 10px;
  }

  .logo-box {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;

  }

</style>
