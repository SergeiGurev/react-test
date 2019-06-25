import { inject, observer } from 'mobx-react';
import {
  compose,
  lifecycle
} from 'recompose';

import { requestCountries } from '../../requests.js';

type TCountry = {
  key: string,
  value: string,
  text: string
}

type TCity = {
  title: string,
  latitude: string,
  longitude: string,
  country: string,
  region: string,
}

type TPropsMount = {
  store: {
    countries: Array<TCountry>,
    updateCountries: (arg: Array<TCountry>) => void,
    updateCities: (arg: Array<TCity>) => void,
  },
}

type TDataMap = {
  code: string,
  name: string,
}

export type TProps = {
  store: {
    isCountriesLoading: boolean,
    isWeatherLoading: boolean,
    temperature: number,
    countries: Array<TCountry>,
    cities: Array<TCity>,
    selectedCity: string,
    updateSelectedCounrty: (arg: string) => void,
    handleCityClick: (arg: TCity) => void,
    removeCity: (arg: TCity) => void,
    selectedCountry: string,
    searchValue: string,
    handleSearchChange: (arg: string) => void,
    isSearchLoading: boolean,
    searchResults: Array<TCity>,
    handleResultSelect: (arg: TCity) => void,
  }
}

const AppComposed = compose<TProps, any>(
  inject('store'),

  lifecycle<TPropsMount, any>({
    componentDidMount() {
      const { store: { 
                countries,
                updateCountries,
                updateCities
              }
            } = this.props;
  
      const storageCountries = localStorage.getItem('countries');
      if (storageCountries) updateCountries(JSON.parse(storageCountries));
    
      const storageCities = localStorage.getItem('cities');
      if (storageCities) updateCities(JSON.parse(storageCities));
    
      if (countries.length === 0) {
        requestCountries()
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              console.log(data.error);
              return;
            }
            data = data.map(({code, name}: TDataMap) => ({
              key: code,
              value: code,
              text: name
            }));
            localStorage.setItem('countries', JSON.stringify(data));
            updateCountries(data);
          },
          error => {
            console.log(error);
          })
      }
    }
  }),

  observer,
)

export default AppComposed;
