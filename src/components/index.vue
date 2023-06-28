<script>
    import axios from 'axios';
    import {store} from '../store';
    
    export default {
        name:'index',
        data() {
            return {
                store,
                apiBase: 'http://127.0.0.1:8000/api/projects?page=4'
            }
        },
        methods: {
            getProjects(){
            axios.get(`${this.apiBase}`).then(res=> {
            store.storedProjects = res.data.projects.data
                })
            }
        },
        mounted() {
            this.getProjects()
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
            </div>
        </div>        
    </div>
</template>