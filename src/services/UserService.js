import axios from "./axios";

const fetchAllUser = (page) => {
    console.log('page: ', page);
    return axios.get(`/api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
    return axios.post("/api/users", {name, job})
};

export { fetchAllUser, postCreateUser };