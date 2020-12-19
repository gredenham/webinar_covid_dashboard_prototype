import * as React from 'react';

import Chart, {
    ArgumentAxis,
    Series,
    CommonSeriesSettings,
    CommonAxisSettings,
    Grid,
    Format,
    Label,
    ValueAxis,
} from 'devextreme-react/chart';
import {useCountryCovid} from "./use-country-covid";
import {useSelector} from "react-redux";
import {IAppState} from "../../store";
import {Loader} from "../loader";

export const Charts = () => {
    const selectedCountry = useSelector((state: IAppState) => state.selectedCountry);
    const countryCovidData = useSelector((state: IAppState) => state.countryCovidData);
    const dataWithDates = countryCovidData.map(({Date: date, ...props}) => ({
        ...props,
        Date: new Date(date),
    }));
    const [isLoading] = useCountryCovid(selectedCountry as string);

    if (!selectedCountry) {
        return (
            <div>Страна не выбрана!</div>
        );
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Chart
            dataSource={dataWithDates}
        >
            <CommonSeriesSettings
                argumentField="Date"
                type="spline"
            />
            <CommonAxisSettings>
                <Grid visible={true} />
            </CommonAxisSettings>
            <Series valueField="Confirmed" name="Confirmed" />
            <Series valueField="Recovered" name="Recovered" />
            <Series valueField="Deaths" name="Deaths" />
            <Series valueField="Active" name="Active" />
            <ArgumentAxis>
                <Label>
                    <Format type="shortDate" />
                </Label>
            </ArgumentAxis>

            <ValueAxis
                allowDecimals
            >
                <Label>
                    <Format type="decimal" />
                </Label>
            </ValueAxis>
        </Chart>
    )
};
