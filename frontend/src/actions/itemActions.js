import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

// 1. getItems called from TodoList when mounted.
// 2. getItems gets items from backend i.e. mongoDB.
// 3. response from get is a json object of the items (see routes/api/items).
// 4. then, dispatch 'GET_ITEMS' call to reducer to update the state.
export const getItems = () => dispatch => {
    // set itemsLoading state to true before retrieving data
    dispatch(setItemsLoading());
    axios
    .get('/api/items')
    .then(res => 
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    );
};

// 1. addItem called from submit button in ItemModal.
// 2. addItem posts new item to backend i.e. updates mongoDB.
// 3. response from post is the item itself (see routes/api/items).
// 4. then, dispatch 'ADD_ITEM' call to reducer to add the data to state.
export const addItem = item => dispatch => {
    axios
        .post('/api/items', item)
        .then(res =>
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        );
    return {
        type: ADD_ITEM,
        payload: item
    };
};

// 1. deleteItem called from onDeleteClick in TodoList.
// 2. deleteItem removes item with id from backend i.e. removes from mongoDB.
// 3. response from delete is the item id (see routes/api/items).
// 4. then, dispatch 'DELETE_ITEM' call to reducer to remove the data from state.
export const deleteItem = id => dispatch => {
    axios
        .delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))

    return {
        type: DELETE_ITEM,
        payload: id
    };
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};