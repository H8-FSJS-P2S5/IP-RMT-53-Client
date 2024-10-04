import axios from 'axios' 

const request = axios.create({
    baseURL: 'https://blog-server.diidh8project.my.id'
})

export default request;