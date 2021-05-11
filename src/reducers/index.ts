import { ClientDetailsReducerState, ClientDetailsReducer, getClientDetailsLoaded, getClientDetailsLoading, getClientDetails } from './client-details-reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';


export interface RootReducerState{
    //pass states of all reducers defined in the project
    clientDetails: ClientDetailsReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    //map states defined in RootReducerState to their respective reducer function 
    clientDetails: ClientDetailsReducer
};

export const getClientDetailsState = (state: RootReducerState) => state.clientDetails;

//selectors to be used in components
export const getClientDetailsStateLoaded = createSelector(getClientDetailsState, getClientDetailsLoaded);
export const getClientDetailsStateLoading = createSelector(getClientDetailsState, getClientDetailsLoading);
export const getClientDetailsStateData = createSelector(getClientDetailsState, getClientDetails);