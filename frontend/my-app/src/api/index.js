import axios from "axios";

// const url = "http://localhost:5000/post";
const API = axios.create({ baseURL: "http://localhost:5000" })


API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
})

export const fetchPosts = (page) => API.get(`/post?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery.search || "none"}&&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post("/post/createPost", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const likePost = (id) => API.patch(`/post/${id}/likePost`);


export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

// export const signIn = (formData) => axios.post(`${url}/signin`, formData);
// export const fetchPosts = () => axios.get(url);
// export const createPost = (newPost) => axios.post(`${url}/createPost`, newPost);
// export const updatePost = (id, updatePost) => axios.patch(`${url}/${id}`, updatePost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
// export const putPost = () => axios.post(url)
