import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8081/api/leaves';

export const listLeaves = () => axios.get(REST_API_BASE_URL);

export const createLeave = (leave) => axios.post(REST_API_BASE_URL, leave);

export const updateLeaveStatus = (id, status) => axios.put(`${REST_API_BASE_URL}/${id}/status`, null, {
    params: { status }
  });

export const leaveById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const deleteLeave = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);
