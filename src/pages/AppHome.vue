<script >

import index from '../components/index.vue';

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
    index
  }
}

</script>

<template>
  <main>
    <h1 class="text-center mt-3">I miei progetti</h1>
    <index/>
  </main>

</template>

<style lang="scss">
</style>
