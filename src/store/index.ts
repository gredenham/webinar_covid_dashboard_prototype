import {AnyAction, applyMiddleware, createStore, Dispatch, compose} from 'redux';
import thunk from "redux-thunk";
import {AppActions, IAppState} from "./store-types";

const defaultState: IAppState = {
    isCountriesLoaded: false,
    countries: [],
    countryCovidData: [],
}

function counterReducer(state: IAppState, action: AnyAction): IAppState {
    const {payload, type} = action;
    switch (type) {
        case AppActions.SET_COUNTRIES:
            return {
                ...state,
                isCountriesLoaded: true,
                countries: payload,
            };
        case AppActions.SET_ACTIVE_COUNTRY:
            return {
                ...state,
                selectedCountry: payload,
            }
        case AppActions.SET_COUNTRY_COVID_DATA:
            return {
                ...state,
                countryCovidData: payload,
            }
        default:
            return state
    }
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const AppStore = createStore(
    counterReducer as any,
    defaultState,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export * from './actions';
export * from './store-types';

