import {Dispatch} from "redux";
import {AppActions} from "./index";

export const setActiveCountry = (payload: string) => (dispatch: Dispatch) => {
    dispatch({type: AppActions.SET_ACTIVE_COUNTRY , payload})
};

export const loadCountries = () => (dispatch: Dispatch) => {
    fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha3Code')
        .then(async responce => {
            dispatch({ type: AppActions.SET_COUNTRIES, payload: await responce.json() })
        });
};

export const loadCountryCovidData = (countryName: string) => (dispatch: Dispatch) => {
    return fetch(`https://api.covid19api.com/country/${countryName}`)
        .then(async responce => {
            dispatch({ type: AppActions.SET_COUNTRY_COVID_DATA, payload: await responce.json() });
        });
};
