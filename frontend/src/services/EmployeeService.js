import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8081/api/employees';

export const listEmployees = ()=> axios.get(REST_API_BASE_URL);

export const createEmployee = (employee)=>axios.post(REST_API_BASE_URL,employee);

export const updateEmployee=(id,employee)=>axios.put(`${REST_API_BASE_URL}/${id}`,employee);

export const employeeById = (id)=>axios.get(`${REST_API_BASE_URL}/${id}`);

export const employeedelete = (id)=>axios.delete(`${REST_API_BASE_URL}/${id}`);