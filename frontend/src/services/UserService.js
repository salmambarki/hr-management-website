import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8081/api/users';

export const listUsers = ()=> axios.get(REST_API_BASE_URL);

export const createUser = (users)=>axios.post(REST_API_BASE_URL,users);

export const userById = (id)=>axios.get(`${REST_API_BASE_URL}/${id}`);

export const updateUser=(id,user)=>axios.put(`${REST_API_BASE_URL}/${id}`,user);

export const deleteUser = (id)=>axios.delete(`${REST_API_BASE_URL}/${id}`);