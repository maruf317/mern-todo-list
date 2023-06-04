import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items: [],
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            // once items are added to state, set the 'loading' state to false
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case ADD_ITEM:
            // action.payload = the new item object
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case DELETE_ITEM:
            // action.payload = _id for the DELETE_ITEM action
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}