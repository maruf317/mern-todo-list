import { v4 as  uuid } from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = {
    items: [ 
        { id: uuid(), name: 'Eggs' },
        { id: uuid(), name: 'Milk' },
        { id: uuid(), name: 'Bread' },
        { id: uuid(), name: 'Meat' }
    ]
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state
            };
        case DELETE_ITEM:
            // action.payload = id for the DELETE_ITEM action
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        case ADD_ITEM:
            // action.payload = the new item object
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        default:
            return state;
    }
}