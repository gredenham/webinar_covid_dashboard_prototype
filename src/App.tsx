import React, {useEffect} from 'react';
import {MainPage} from "@pages";
import {connect} from 'react-redux';
import {IAppState, loadCountries} from './store';
import {Loader} from "./components/loader";

import './App.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

interface IAppComponentProps {
    isCountriesLoaded: boolean;
    loadCountries: () => void;
}

function AppComponent({isCountriesLoaded, loadCountries}: IAppComponentProps) {
  useEffect(() => {
      if (!isCountriesLoaded) {
        loadCountries();
      }
  }, [isCountriesLoaded, loadCountries]);

  return (
      isCountriesLoaded
        ? <MainPage />
        : <Loader />
  );
}

const mapStateToProps = (state: IAppState) => ({
  isCountriesLoaded: state.isCountriesLoaded
});

const mapDispatchToProps = (dispatch: any) => ({
    loadCountries: () => dispatch(loadCountries())
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
