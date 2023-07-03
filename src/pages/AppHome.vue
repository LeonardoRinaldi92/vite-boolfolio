<script >

import index from '../components/index.vue';
import navBar from  '../components/navBar.vue';

import {store} from '../store';

// backtick : `

export default {
  name: 'App',
  data() {
    return{
      store
    }
  },
  components: {
    index,
    navBar
  }
}

</script>

<template>
  <navBar/>
  <main>
    <h1 class="text-center mt-3 mt-5">I miei progetti</h1>
    <index/>
  </main>

</template>

<style lang="scss">
</style>
