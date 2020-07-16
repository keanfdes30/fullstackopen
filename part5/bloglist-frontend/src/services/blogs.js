import axios from 'axios'
const baseUrl = '/api/blogs'

let token=null

const setToken = newToken =>{
  token=`bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async obj =>{
  const config = {
    headers: { Authorization: token },
  }
  const response=await axios.post(baseUrl,obj,config)
  return response.data
}

const deleteobj = async id =>{
    const config = {
      headers: { Authorization: token },
    }
    const response=await axios.delete(`${baseUrl}/${id}`,config)
    return response.data
}

export default { getAll,setToken ,create,deleteobj}