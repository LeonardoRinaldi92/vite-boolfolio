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
            <div v-for="(element,index) in store.storedProjects" class="card col-4"> 
                <h3>
                  {{ element.name }} => {{ element.type.name }} =><span v-for="(tag,index) in element.tags" >{{ tag.name }}</span>
                </h3>
                <img :src="`${this.pathImage}${element.image}`" alt="">
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