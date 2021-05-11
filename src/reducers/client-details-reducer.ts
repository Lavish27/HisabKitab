import { ClientDetails } from 'src/app/Templates/client-details-model';
import { Action } from 'src/actions';
import { CLIENT_DETAILS_REQUEST, CLIENT_DETAILS_SUCCESS, CLIENT_DETAILS_FAILED } from 'src/actions/client-details-action';

export interface ClientDetailsReducerState{
    loading: boolean;
    loaded: boolean;
    clientDetails: ClientDetails;
}


const initialState : ClientDetailsReducerState = {
    loaded : false,
    loading : false,
    clientDetails : undefined
}

export function ClientDetailsReducer(state = initialState, action: Action): ClientDetailsReducerState{
    switch(action.type){
        case CLIENT_DETAILS_REQUEST: {
            return {...state, loading: true};
        }
        case CLIENT_DETAILS_SUCCESS: {
            const data = action.payload;
            return {...state, loading: false, loaded: true, clientDetails: data};
        }
        case CLIENT_DETAILS_FAILED: {
            return {...state, loading: false, loaded: false};
        }
        default: {
            return state;
        }

    }
}

//functions to be used to create selectors

export const getClientDetailsLoading = (state: ClientDetailsReducerState) => state.loading;
export const getClientDetailsLoaded = (state: ClientDetailsReducerState) => state.loaded;
export const getClientDetails = (state: ClientDetailsReducerState) => state.clientDetails;
