import * as React from 'react';

import {useDispatch, useSelector} from "react-redux";
import {IAppState, setActiveCountry} from "../../store";
import './list.css';

export const CountryList = () => {
    const countries = useSelector((state: IAppState) => state.countries);
    const selectedCountry = useSelector((state: IAppState) => state.selectedCountry);
    const dispatch = useDispatch();
    const setCountry = (name: string) => dispatch(setActiveCountry(name));

    return (
        <div className="country-list" >
            {
                countries.map(({name, flag, population}) => (
                    <div
                        className="country-row"
                        key={name}
                        style={{background: selectedCountry === name ? 'lightgrey' : 'none'}}
                        onClick={() => setCountry(name)}
                    >
                        <img src={flag} />
                        <div>{name}</div>
                        <div>{population}</div>
                    </div>
                ))
            }
        </div>
    )
};
