import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:7900/api",
    headers:{
        "Content-Type": "application/json"
    },
    timeout: 10000
})


// use api tho 
export const startChallenge = async(email , plan) =>{
    const res = await api.post("/users/start" , {
        email,
        plan
    })
return res.data;    
}

export const getTodaysChallenge = async (email) =>{
    const res = await api.get(`/users/challenge/${encodeURIComponent(email)}`)
    return res.data;
    console.log(res)
}


export const submitans = async (email , problemId , output) =>{
    const res = await api.post("/users/submit" , {email , problemId , output})
    return res.data;
    console.log(res)
}