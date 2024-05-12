import axios from "axios";

export const createInstance=axios.create({
    headers:{
        credentials:'include',
        method:'post',
        'Content-Type':'application/json'
    }
})