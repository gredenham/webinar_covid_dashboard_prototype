import * as React from 'react';
import {useEffect, useState} from "react";
import {loadCountryCovidData} from "@store";
import {useDispatch} from "react-redux";

export const useCountryCovid = (countryName: string) => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        if (!countryName) {
            return;
        }
        (dispatch(loadCountryCovidData(countryName)) as unknown as Promise<void>)
            .then(() => setLoading(false))
    }, [countryName]);

    return [isLoading];
}
