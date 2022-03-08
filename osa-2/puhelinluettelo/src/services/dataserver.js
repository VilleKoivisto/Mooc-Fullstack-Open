import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
  
const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (record, id) => {
    const request = axios.put(`${baseUrl}/${id}`, record)
    console.log(id)
    console.log(record)
    return request.then(response => response.data)
}

const deleteOne = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

const dataService = {
    getAll,
    create,
    update,
    deleteOne
}

export default dataService