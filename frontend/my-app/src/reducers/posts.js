import { FETCH_ALL, FETCH_BY_SEACH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../constant/actionTypes';
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case FETCH_BY_SEACH:
            return {
                ...state,
                posts: action.payload

            }
        case CREATE:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        case UPDATE:

            return state.map((post) => (post._id === action.payload._id ? action.payload : post));
        case DELETE:
            return state.filter((post) => post._id !== action.payload._id);
        case LIKE:
            return state.map((post) => (post._id === action.payload._id ? action.payload : post));
        default:
            return state;
    }
}
