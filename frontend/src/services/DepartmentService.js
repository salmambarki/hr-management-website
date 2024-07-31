import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8081/api/departments';

export const listDepartments = ()=> axios.get(REST_API_BASE_URL);

export const createDepartment=(departments)=>axios.post(REST_API_BASE_URL,departments);

export const departmentById = (id)=>axios.get(`${REST_API_BASE_URL}/${id}`);

export const updateDepartment=(id,department)=>axios.put(`${REST_API_BASE_URL}/${id}`,department);

export const departmentdelete = (id)=>axios.delete(`${REST_API_BASE_URL}/${id}`);