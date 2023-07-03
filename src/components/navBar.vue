<script>

import {store} from '../store';

export default {
  name: 'navBar',
  data() {
    return {
        store

    }
  },
}

</script>
<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-light bg-light" id="navBar" >
              <div class="container">
                <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <router-link :to="{name: 'home'}" class="text-decoration-none "
                            :class="(store.viewedPage == 'home')? 'text-primary' : 'text-black'">Home</router-link>
                        </li>
                        <li v-if="(store.viewedPage !== 'home')" class="text-decoration-none ms-3 text-primary">
                            Project >{{ store.storedSingleProject.name }}
                        </li>
                    </ul>
                </div>
          </div>
        </nav>
    </div>
</template>

<style lang="scss">
#navBar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
}
</style>