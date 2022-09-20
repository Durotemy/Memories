import * as api from "../api";
import { FETCH_ALL, FETCH_BY_SEACH, FETCH_POST, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE, COMMENT } from "../constant/actionTypes";


export const getPost = (id) => async (dispatch) => {
    console.log("getPost");
    try {
        dispatch({ type: START_LOADING });
        console.log("id", id)
        const data = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log("error seen here", error)
    }
};


export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
};
export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEACH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}
export const createPost = (post, navigate) => async (dispatch) => {
    try {
        // dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        navigate(`/posts`);
        dispatch({ type: CREATE, payload: data });
      
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

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        dispatch({ type: COMMENT, payload: data });
        return data.comments;
    } catch (error) {
        console.log(error)
    }
}

