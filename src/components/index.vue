<script>
    import axios from 'axios';
    import {store} from '../store';

    export default {
        name:'index',
        data() {
            return {
                store,
                apiBase: 'http://127.0.0.1:8000/api/',
                
                maxPage : null,
            }
        },
        methods: {
            getProjects(chosenPag){

            store.viewedPage = 'home'

            

            let params = { 
                page: chosenPag
            }

            if (store.storedTypesSelected !== 'all' ) {
                params.type_id = store.storedTypesSelected
            }

            if(store.storedTagsSelected.length > 0){
                params.tags_ids = store.storedTagsSelected.join(',')
            }

            console.log(params)
            
            axios.get(`${this.apiBase}projects`, {params}).then(res=> {
            store.storedProjects = res.data.projects.data
            this.maxPage =res.data.projects.last_page
                })
            },

            getTypes() {
                if(store.storedTypes == null) {
                    axios.get(`${this.apiBase}types`).then(res=>{
                        store.storedTypes = res.data.types
                    })
                }
            },

            getTags() {
                if(store.storedTags == null) {
                    axios.get(`${this.apiBase}tags`).then(res=>{
                        store.storedTags = res.data.tags
                    })
                }

            },

            GoTop() {
                window.scrollTo({
                top: 0,
                behavior: "smooth"
                });
            },

            
        },
        mounted() {
            this.getProjects(store.currentpage)
            this.getTypes()
            this.getTags()
        },
        watch: {
        'store.storedTagsSelected': {
        handler: 'getProjects',
        deep: true
    }
},
    }
</script>
<template>
    <div class="w-50 m-auto mt3">
        <div class="mb-3 ">
            <label for="select-types" >Scegli quali tipi di progetto visualizzare</label>
            <div class="row justify-content-center align-items-center">
                <div class="col-3 mt-3">
                    <select v-model="store.storedTypesSelected" @change="store.currentpage = 1,getProjects(store.currentpage)" class="form-select form-select-lg" name="select-types" id="select-types">
                        <option value="all" selected >Tutti</option>
                        <option v-for="(type, index) in store.storedTypes" :key="index" :value="type.id">{{ type.name }}</option>
                    </select>
                </div>
                <div class="col-9">
                    <label v-for="(tag, index) in store.storedTags" :key="index" for="" class="mt-3 ms-2">
                        <input type="checkbox" :value="tag.id" v-model="store.storedTagsSelected">
                        <span class="text-uppercase ms-2">
                            {{ tag.name }}
                        </span>
                    </label>
                </div>
                <div class="col-3">
                    <button class="btn btn-primary h-100" :class="(store.storedTypesSelected !== 'all' || store.currentpage !== 1)? '' : 'd-none'" @click="store.storedTypesSelected='all',store.currentpage = 1,getProjects(store.currentpage)">
                        reset
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="container pb-3">
        <div class="row">
            <div v-for="(element,index) in store.storedProjects" class="col-4 p-3">
                <div class="card p-3 text-center" style="min-height:630px">
                    <div class="text-end " @click="store.storedTypesSelected = element.type_id, store.currentpage = 1, getProjects(store.currentpage)">
                        <span class="badge badge-type shadow box-tooltip">
                            <span class="tooltipo">
                                visualizza tutti i progetti {{ element.type.name }}
                            </span>
                            {{ element.type.name }}
                        </span>
                    </div>
                    <router-link :to="{name: 'show', params: { slug: element.slug}}" class="text-decoration-none text-black" @click="store.lastPage = element.slug, store.viewedPage = 'card'">
                        <h3 class="text-capitalize">
                          {{ element.name }}
                        </h3>
                        <div class="mt-2 shadow rounded-3" style="height: 400px;overflow: hidden;">
                            <img v-if="(element.image)" class="img-box" :src="`${store.pathImage}${element.image}`" alt="">
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
            <li class="page-item" :class="(this.store.currentpage === 1) ? 'disabled' : ''">
              <a class="page-link"  @click.prevent="store.currentpage --, getProjects(store.currentpage), GoTop()" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" :class="(this.store.currentpage === pages) ? 'active' : ''" aria-current="page" v-for="(pages,index) in this.maxPage ">
                <a class="page-link" @click.prevent="store.currentpage = pages,getProjects(store.currentpage), GoTop()" href="#" :style="(store.currentpage === pages) ? 'pointer-events: none; cursor: default;' : ''" >{{ pages }}</a>
            </li>
            <li class="page-item" :class="(this.store.currentpage === this.maxPage) ? 'disabled' : ''" >
              <a class="page-link" @click.prevent="store.currentpage ++, getProjects(store.currentpage), GoTop()" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>       
    </div>
</template>

<style lang="scss">

.type-icon {
    height: 40px;
    width: 40px;
    margin-bottom: 5px;
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
        animation:  y-flip-html 6s linear 0s infinite;
    }
}

.css {
    &::after {
        background-image: url('https://www.shareicon.net/data/256x256/2015/09/17/102374_css3_512x512.png');
        animation:  y-flip-css 6s linear 0s infinite;
    }
}

.php {
    &::after {
        background-image: url('https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/php-512.png');
        animation:  y-flip-php 6s linear 0s infinite;

    }
}

.laravel {
    &::after {
        background-image: url('https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/laravel-512.png');
        animation:  y-flip-laravel 6s linear 0s infinite;
    }
}


.js {
    &::after {
        background-image: url('https://uploads-ssl.webflow.com/62038ffc9cd2db4558e3c7b7/6242e5dd4337267623f1e7a5_js.svg');
        animation:  y-flip-js 6s linear 0s infinite;
    }
}

.vuevit {
    &::after {
        background-image: url('https://i0.wp.com/www.primefaces.org/wp-content/uploads/2019/08/feature-vuejs.png');
        animation:  y-flip-vue 6s linear 0s infinite;
    }
}

.badge-type {
    color: black !important;
    border: 1px solid black;
    cursor: pointer;
}

.img-box {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
    display: block;
}


@keyframes y-flip-html {
    0% {
        transform: rotateY(0deg);
    }
    12% {
        transform: rotateY(60deg);
    }
    24% {
        transform: rotateY(120deg);
        border-radius: 50%;
    }
    34% {
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
    40% {
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
    65% {
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
    86% {
        transform: rotateY(60deg);
    }
    100% {
        transform: rotateY(0deg);
        border-radius: 50%;
    }
}

@keyframes y-flip-css {
    0% {
        transform: rotateY(0deg);
    }
    12% {
        transform: rotateY(60deg);
    }
    24% {
        transform: rotateY(120deg);
        border-radius: 50%;
    }
    34% {
        transform: rotateY(179deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "ƧƧƆ";
        background-image: none;       
        line-height: 37px;
        border: 1px solid rgb(69,160,218);
        border-radius: 50%;             

    }
    40% {
        transform: rotateY(180deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "ƧƧƆ";
        background-image: none;
        color: rgb(69,160,218);
        line-height: 37px;
        border: 1px solid rgb(69,160,218);
        border-radius: 50%;

        
    }
    65% {
        transform: rotateY(180deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "ƧƧƆ";
        background-image: none;
        color: rgb(69,160,218);
        line-height: 37px;
        border: 1px solid rgb(69,160,218);
        border-radius: 50%;
    }
    86% {
        transform: rotateY(60deg);
    }
    100% {
        transform: rotateY(0deg);
        border-radius: 50%;
    }
}

@keyframes y-flip-js {
    0% {
        transform: rotateY(0deg);
    }
    12% {
        transform: rotateY(60deg);
    }
    24% {
        transform: rotateY(120deg);
        border-radius: 50%;
    }
    34% {
        transform: rotateY(179deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "ƨႱ";
        background-image: none;       
        line-height: 37px;
        border: 1px solid rgb(247,223,28);
        border-radius: 50%;
        -webkit-text-fill-color: rgb(0, 0, 0);
  -webkit-text-stroke-color: rgb(0, 0, 0);
  -webkit-text-stroke-width: 0.1px; 
    }
    40% {
        transform: rotateY(180deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "ƨႱ";
        background-image: none;
        color: rgb(247,223,28);
        line-height: 37px;
        border: 1px solid rgb(247,223,28);
        border-radius: 50%;
        -webkit-text-fill-color: rgb(0, 0, 0);
  -webkit-text-stroke-color: rgb(0, 0, 0);
  -webkit-text-stroke-width: 0.1px; 

        
    }
    65% {
        transform: rotateY(180deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "ƨႱ";
        background-image: none;
        color:rgb(247,223,28);
        line-height: 37px;
        border: 1px solid rgb(247,223,28);
        border-radius: 50%;
        -webkit-text-fill-color: rgb(0, 0, 0);
  -webkit-text-stroke-color: rgb(0, 0, 0);
  -webkit-text-stroke-width: 0.1px; 
    }
    86% {
        transform: rotateY(60deg);
    }
    100% {
        transform: rotateY(0deg);
        border-radius: 50%;
    }
}

@keyframes y-flip-vue {
    0% {
        transform: rotateY(0deg);
    }
    12% {
        transform: rotateY(60deg);
    }
    24% {
        transform: rotateY(120deg);
        border-radius: 50%;
    }
    34% {
        transform: rotateY(179deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "ƎUV";
        background-image: none;       
        line-height: 37px;
        border: 1px solid rgb(64,184,131);
        border-radius: 50%;
        -webkit-text-fill-color: rgb(52,73,94);
  -webkit-text-stroke-color: rgb(52,73,94);
  -webkit-text-stroke-width: 0.1px; 
    }
    40% {
        transform: rotateY(180deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "ƎUV";
        background-image: none;
        color: rgb(64,184,131);
        line-height: 37px;
        border: 1px solid rgb(64,184,131);
        border-radius: 50%;
        -webkit-text-fill-color: rgb(52,73,94);
  -webkit-text-stroke-color: rgb(52,73,94);
  -webkit-text-stroke-width: 0.1px; 

        
    }
    65% {
        transform: rotateY(180deg);
        display: inline-block;
        font-size: 10px;
        width: 40px; 
        height: 40px; 
        content: "ƎUV";
        background-image: none;
        color:rgb(64,184,131);
        line-height: 37px;
        border: 1px solid rgb(64,184,131);
        border-radius: 50%;
        -webkit-text-fill-color: rgb(52,73,94);
  -webkit-text-stroke-color: rgb(52,73,94);
  -webkit-text-stroke-width: 0.1px; 
    }
    86% {
        transform: rotateY(60deg);
    }
    100% {
        transform: rotateY(0deg);
        border-radius: 50%;
    }
}

@keyframes y-flip-php {
    0% {
        transform: rotateY(0deg);
    }
    12% {
        transform: rotateY(60deg);
    }
    24% {
        transform: rotateY(120deg);
        border-radius: 50%;
    }
    34% {
        transform: rotateY(179deg);
        display: inline-block;
        font-size: 14px;
        width: 40px; 
        height: 40px; 
        content: "qʜq";
        background-image: none;       
        line-height: 37px;
        border: 1px solid rgb(136,146,189);
        border-radius: 50%;             

    }
    40% {
        transform: rotateY(180deg);
        display: inline-block;
        font-size: 14px;
        width: 40px; 
        height: 40px; 
        content: "qʜq";
        background-image: none;
        color:  rgb(136,146,189);
        line-height: 37px;
        border: 1px solid rgb(136,146,189);
        border-radius: 50%;

        
    }
    65% {
        transform: rotateY(180deg);
        display: inline-block;
        font-size: 14px;
        width: 40px; 
        height: 40px; 
        content: "qʜq";
        background-image: none;
        color:  rgb(136,146,189);
        line-height: 37px;
        border: 1px solid rgb(136,146,189);
        border-radius: 50%;
    }
    86% {
        transform: rotateY(60deg);
    }
    100% {
        transform: rotateY(0deg);
        border-radius: 50%;
    }
}

@keyframes y-flip-laravel {
    0% {
        transform: rotateY(0deg);
        font-size: 8.5px;
    }
    12% {
        transform: rotateY(60deg);
        font-size: 8.5px;
    }
    24% {
        transform: rotateY(120deg);
        border-radius: 50%;
        font-size: 8.5px;
    }
    34% {
        transform: rotateY(179deg);
        display: inline-block;
        font-size: 8.5px;
        width: 40px; 
        height: 40px; 
        content: "ƎꓷA⅃ꓭ";
        background-image: none;       
        line-height: 37px;
        border: 1px solid rgb(245,82,70);
        border-radius: 50%;             

    }
    40% {
        transform: rotateY(180deg);
        display: inline-block;
        font-size: 8.5px;
        width: 40px; 
        height: 40px; 
        content: "ƎꓷA⅃ꓭ";
        background-image: none;
        color:  rgb(245,82,70);
        line-height: 37px;
        border: 1px solid rgb(245,82,70);
        border-radius: 50%;

        
    }
    65% {
        transform: rotateY(180deg);
        display: inline-block;
        font-size: 8.5px;
        width: 40px; 
        height: 40px; 
        content: "ƎꓷA⅃ꓭ";
        background-image: none;
        color:  rgb(245,82,70);
        line-height: 37px;
        border: 1px solid rgb(245,82,70);
        border-radius: 50%;
    }
    86% {
        transform: rotateY(60deg);
        font-size: 8.5px;
    }
    100% {
        transform: rotateY(0deg);
        border-radius: 50%;
        font-size: 8.5px;
    }
}

.box-tooltip {
    position: relative;
}

.tooltipo {
    position: absolute;
    top: -25px;
    right: 0px;
    z-index: 5;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 5px;
    display: none;
    padding: 5px;
}

.box-tooltip:hover .tooltipo {
    display: block;
}

.box-tooltip:hover {
    background-color: rgb(112, 112, 112);
    color: white!important;
}


</style>