import * as React from 'react';
import {
    CountryList,
    CountryMap,
    Charts,
} from "@components";

export const MainPage = () => {
    return (
        <>
            <Charts />
            <CountryList />
            <CountryMap />
        </>
    )
}
