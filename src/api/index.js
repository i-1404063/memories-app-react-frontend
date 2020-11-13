import axios from "axios";

const url = "http://localhost:5000/api/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, uPost) => axios.patch(`${url}/${id}`, uPost);
export const removePost = (id) => axios.delete(`${url}/${id}`);
export const like = (id, uPost) => axios.patch(`${url}/${id}/likepost`, uPost);
