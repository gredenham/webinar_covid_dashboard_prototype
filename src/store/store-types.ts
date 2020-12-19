export interface IAppState {
    countries: Country[];
    isCountriesLoaded: boolean;
    selectedCountry?: string;
    countryCovidData: CountryCovidItem[];
}

export enum AppActions {
    SET_COUNTRIES = 'SET_COUNTRIES',
    SET_ACTIVE_COUNTRY = 'SET_ACTIVE_COUNTRY',
    SET_COUNTRY_COVID_DATA = 'SET_COUNTRY_COVID_DATA',
}

export interface Country {
    population: number;
    flag: string;
    name: string;
    alpha3Code: string;
}

export interface CountryCovidItem {
    Country: string; /** {@link Country.name} */
    CountryCode: string;
    Province: string;
    City: string;
    CityCode: string;
    Lat: string;
    Lon: string;
    Confirmed: number;
    Deaths: number;
    Recovered: number;
    Active: number;
    Date: string
}
