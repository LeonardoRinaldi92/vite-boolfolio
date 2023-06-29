<script>
    import axios from 'axios';
    import {store} from '../store';

    export default {
        name:'index',
        data() {
            return {
                store,
                apiBase: 'http://127.0.0.1:8000/api/projects?',
                currentpage : 1,
                pathImage : 'http://127.0.0.1:8000/storage/',
                maxPage : null,
            }
        },
        methods: {
            getProjects(chosenPag){
            axios.get(`${this.apiBase}`, {
                params: {
                    page: chosenPag
                }
            }).then(res=> {
            store.storedProjects = res.data.projects.data
            this.maxPage =res.data.projects.last_page
                })
            }
        },
        mounted() {
            this.getProjects(this.currentpage)
        }
    }
</script>
<template>
    <div class="container">
        <div class="row">
            <div v-for="(element,index) in store.storedProjects" class="col-4 p-3">
                <div class="card p-3 text-center" style="min-height:650px">
                    <router-link :to="{name: 'show', params: { slug: element.slug}}" class="text-decoration-none text-black">
                        <div class="text-end">
                            <span class="badge badge-type shadow">
                                {{ element.type.name }}
                            </span>
                        </div>
                        <h3>
                          {{ element.name }}
                        </h3>
                        <div class="mt-2 shadow rounded-3" style="height: 400px;overflow: hidden;">
                            <img v-if="(element.image)" class="img-box" :src="`${this.pathImage}${element.image}`" alt="">
                            <img v-else class="img-box" src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" alt="">
                            
                        </div>
                        <div class="text-center mt-2">
                            <p>
                                &#8220;<i>{{ element.short_description }}</i>&#8221;
                            </p>
                        </div>
                        <div class="text-center mt-1 row justify-content-center">
                            <div v-for="(tag, index) in element.tags" class="type-icon col-2" :class="tag.slug">
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <nav aria-label="Page navigation">
          <ul class="pagination    ">
            <li class="page-item" :class="(this.currentpage === 1) ? 'disabled' : ''">
              <a class="page-link"  @click.prevent="currentpage --, getProjects(currentpage)" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" :class="(this.currentpage === pages) ? 'active' : ''" aria-current="page" v-for="(pages,index) in this.maxPage ">
                <a class="page-link" @click.prevent="currentpage = pages,getProjects(currentpage)" href="#" :style="(currentpage === pages) ? 'pointer-events: none; cursor: default;' : ''" >{{ pages }}</a>
            </li>
            <li class="page-item" :class="(this.currentpage === this.maxPage) ? 'disabled' : ''" >
              <a class="page-link" @click.prevent="currentpage ++, getProjects(currentpage)" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>       
    </div>
</template>

<style scoped lang="scss">

.type-icon {
    height: 40px;
    width: 40px;
    margin-bottom: 5px;
    margin-right: 10px;
    cursor: pointer;
}

.type-icon::after {
    content: "";
    display: inline-block;
    width: 40px; 
    height: 40px; 
    background-size: cover;
}



.html {
    &::after {
        background-image: url('https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_1280.png');
    }
    &:hover::after {
    animation:  y-flip-html 1.5s linear 0s forwards;
    }
}

.css {
    &::after {
        background-image: url('https://www.shareicon.net/data/256x256/2015/09/17/102374_css3_512x512.png');
    }
}

.php {
    &::after {
        background-image: url('https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/php-512.png');
    }
}

.laravel {
    &::after {
        background-image: url('https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/laravel-512.png');
    }
}


.js {
    &::after {
        background-image: url('https://uploads-ssl.webflow.com/62038ffc9cd2db4558e3c7b7/6242e5dd4337267623f1e7a5_js.svg');
    }
}

.vuevit {
    &::after {
        background-image: url('https://i0.wp.com/www.primefaces.org/wp-content/uploads/2019/08/feature-vuejs.png');
    }
}

.badge-type {
    color: black !important;
    border: 1px solid black;
}

.img-box {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 400px;
    display: block;
}

@keyframes y-flip-html {
    0% {
        transform: rotateY(0deg);
    }
    33% {
        transform: rotateY(60deg);
    }
    66% {
        transform: rotateY(120deg);
        border-radius: 50%;
    }
    99% {
        transform: rotateY(179deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "⅃MTH";
        background-image: none;       
        line-height: 37px;
        border: 1px solid rgb(228,77,37);
        border-radius: 50%;             

    }
    100% {
        transform: rotateY(180deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "⅃MTH";
        background-image: none;
        color: rgb(228,77,37);;
        line-height: 37px;
        border: 1px solid rgb(228,77,37);
        border-radius: 50%;

        
    }
}

@keyframes y-flip-html-reverse {
    0% {
        transform: rotateY(180deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "⅃MTH";
        background-image: none;
        color: rgb(228, 77, 37);
        line-height: 37px;
        border: 1px solid rgb(228, 77, 37);
        border-radius: 50%;
    }
    1% {
        transform: rotateY(179deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "⅃MTH";
        background-image: none;
        line-height: 37px;
        border: 1px solid rgb(228, 77, 37);
        border-radius: 50%;
    }
    34% {
        transform: rotateY(120deg);
        border-radius: 50%;
    }
    67% {
        transform: rotateY(60deg);
    }
    100% {
        transform: rotateY(0deg);
    }
}
</style>