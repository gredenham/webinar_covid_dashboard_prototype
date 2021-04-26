import * as React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {IAppState, setActiveCountry} from "../../store";
import './list.css';
import {useRef} from "react";

const ROW_HEIGHT = 50;

export const CountryList = () => {
    const ref = useRef(null);
    const countries = useSelector((state: IAppState) => state.countries);
    const selectedCountry = useSelector((state: IAppState) => state.selectedCountry);
    const dispatch = useDispatch();
    const setCountry = (name: string) => dispatch(setActiveCountry(name));
    const selectedIndex = countries.findIndex(({alpha3Code}) => alpha3Code === selectedCountry);

    if (selectedIndex > -1 && ref.current) {
        (ref.current as unknown as HTMLElement).scrollTo({
            top: selectedIndex * ROW_HEIGHT,
        });
    }

    return (
        <div className="country-list" ref={ref} >
            {
                countries.map(({name, flag, population, alpha3Code}) => (
                    <div
                        className="country-row"
                        key={name}
                        style={{background: selectedCountry === alpha3Code ? 'lightgrey' : 'none', height: ROW_HEIGHT}}
                        onClick={() => setCountry(alpha3Code)}
                    >
                        <img src={flag} alt={selectedCountry} />
                        <div>{name}</div>
                        <div>{population}</div>
                    </div>
                ))
            }
        </div>
    )
};
