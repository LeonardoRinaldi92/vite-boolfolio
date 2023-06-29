import { reactive } from "vue";

export const store = reactive(
    {
        storedProjects : [],
        storedSingleProject : [],
        pathImage : 'http://127.0.0.1:8000/storage/',
    }
)