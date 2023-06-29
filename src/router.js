import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import Show from './pages/Show.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
history: createWebHistory(),
routes: [
{
    path: '/',
    name: 'home',
    component: AppHome
},
{
    path: '/project/:slug',
    name: 'show',
    component: Show
},
{
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound

}
]
});
export { router };