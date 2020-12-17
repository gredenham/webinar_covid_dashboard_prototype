import * as React from 'react';
import {MapContainer, GeoJSON, TileLayer} from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import './country-map.css';

import geoJson from './countries.json';
import {Layer} from "leaflet";
import {IAppState, setActiveCountry} from "../../store";
import {useDispatch, useSelector} from "react-redux";


interface IGeoFeature {
    type: string;
    properties: {
        ADMIN: string;
        ISO_A3: string;
        ISO_A2: string;
    }
    geometry: {
        coordinates: number[];
        type: string;
    }
}

const features: IGeoFeature = (geoJson as any).features;

export const CountryMap = () => {
    const dispatch = useDispatch();
    const setCountry = (name: string) => dispatch(setActiveCountry(name));
    const countries = useSelector((state: IAppState) => state.countries);
    const populationMap: {[key: string]: number} = countries.reduce((acc, cur) => ({
        ...acc,
        [cur.alpha3Code]: cur.population,
    }), {});

    return (
        <div className="map-container" >
            <MapContainer
                style={{ height: '100%', width: '100%' }}
                center={[0, 0]}
                zoom={1}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GeoJSON
                    data={features as any}
                    onEachFeature={(feature, layer: Layer) => {
                        const name = feature.properties.ISO_A3;
                        (layer as any).setStyle({
                            fillColor: 'green',
                        });
                        layer.bindTooltip(() => `${name} ${populationMap[name]}`);

                        layer.on({
                            click: () => {
                                setCountry(name);
                            },
                            mouseover: (event) => {
                                (layer as any).setStyle({
                                    fillColor: 'red',
                                });
                            },
                            mouseout: () => {
                                (layer as any).setStyle({
                                    fillColor: 'green',
                                });
                            }
                        })
                    }}
                />
            </MapContainer>
        </div>
    );
};
