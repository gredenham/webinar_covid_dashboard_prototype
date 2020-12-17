import {AnyAction, applyMiddleware, createStore, Dispatch, compose} from 'redux';
import thunk from "redux-thunk";

export interface Country {
    population: number;
    flag: string;
    name: string;
    alpha3Code: string;
}

export interface IAppState {
    countries: Country[];
    isCountriesLoaded: boolean;
    selectedCountry?: string;
}

export enum AppActions {
    SET_COUNTRIES = 'SET_COUNTRIES',
    SET_ACTIVE_COUNTRY = 'SET_ACTIVE_COUNTRY',
}

const defaultState: IAppState = {
    isCountriesLoaded: false,
    countries: [],
}

function counterReducer(state: IAppState, action: AnyAction) {
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

export const setActiveCountry = (payload: string) => (dispatch: Dispatch) => {
    dispatch({type: AppActions.SET_ACTIVE_COUNTRY , payload})
};

export const loadCountries = () => (dispatch: Dispatch) => {
    fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha3Code')
        .then(async responce => {
            dispatch({ type: AppActions.SET_COUNTRIES, payload: await responce.json() })
        });
};

