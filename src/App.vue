<script >

import {store} from './store';

// backtick : `

export default {
  name: 'App',
  data() {
    return{
      store
    }
  },
}

</script>

<template>
  <main>
    <router-view></router-view>
  </main>

</template>

<style lang="scss">
@use './style/main.scss';
</style>
