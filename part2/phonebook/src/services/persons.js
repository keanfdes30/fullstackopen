import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const get = () => {
    const request = axios.get(baseUrl)
    return request.then(response=>response.data)
}

const create = obj => {
    const request = axios.post(baseUrl,obj)
    return request.then(response=>response.data)
}   

const userDelete = (id) => {
    const request=axios.delete(`${baseUrl}/${id}`)
    return request.then(response=>response.data)
}

const replace = (id,obj) => {
    const request= axios.put(`${baseUrl}/${id}`,obj)
    return request.then(response=>response.data)
}

export default {create,get,userDelete,replace}