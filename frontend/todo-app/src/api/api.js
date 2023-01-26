import axios from 'axios';


const api = axios.create({
    baseURL: '/api'
})

export const getAllTodoItems = () => {
    return api.get('/')
};

