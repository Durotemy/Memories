import * as api from "../api";
import { FETCH_ALL, FETCH_BY_SEACH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE } from "../constant/actionTypes";

export const getPosts = (page) => async (dispatch) => {
    try {
        // dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        console.log("datum", data);
        dispatch({ type: FETCH_ALL, payload: data });
        // dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
};
export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        // dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEACH, payload: data });
        // dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}
export const createPost = (post) => async (dispatch) => {
    try {
        // dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
        // dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
}
export const updatePost = (post, id) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(post, id);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message)
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(id);
        dispatch({ type: DELETE, payload: data });
    } catch (error) {
        console.log(error)
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log("error from action", error.message)
    }
};

