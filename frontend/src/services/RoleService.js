import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8081/api/roles';

export const listRoles = ()=> axios.get(REST_API_BASE_URL);

export const createRole = (roles)=>axios.post(REST_API_BASE_URL,roles);

export const roleById = (id)=>axios.get(`${REST_API_BASE_URL}/${id}`);

export const updateRole=(id,role)=>axios.put(`${REST_API_BASE_URL}/${id}`,role);

export const roledelete = (id)=>axios.delete(`${REST_API_BASE_URL}/${id}`);