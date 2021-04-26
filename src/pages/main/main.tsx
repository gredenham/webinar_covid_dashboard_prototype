import * as React from 'react';
import {
    CountryList,
    CountryMap,
    Charts,
} from "@components";

export const MainPage = () => {
    return (
        <>
            <h1>COVID DASHBOARD</h1>
            <Charts />
            <CountryList />
            <CountryMap />
        </>
    )
}
