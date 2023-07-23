import {SET_MESSAGE} from "../types";

const initialState = {id: 0, message: "", variant: ""};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_MESSAGE:
            return {...payload, id: state.id + 1};
        default:
            return state;
    }
};