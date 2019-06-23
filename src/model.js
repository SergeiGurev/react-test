import { types } from "mobx-state-tree";

import { requestSearchCity, requestWeather } from './requests.js';

const Country = types.model('Country', {
  key: types.string,
  value: types.string,
  text: types.string
})

const City = types.model('City', {
  country: types.string,
  latitude: types.string,
  longitude: types.string,
  region: types.string,
  title: types.string,
})

const Store = types
  .model('Store', {
    countries: types.array(Country),
    isCountriesLoading: true,
    selectedCountry: '',
    cities: types.array(City),
    selectedCity: '',
    temperature: 0,
    isSearchLoading: false,
    searchResults: types.array(City),
    searchValue: '',
    isWeatherLoading: false,
  })
  .actions( self => ({
    updateCountries(countries = []) {
      self.countries = countries;
      self.isCountriesLoading = false;
    },

    updateCities(cities) {
      self.cities = cities;
    },

    updateSelectCounrty(country) {
      self.selectedCountry = country;
      self.searchValue = '';
      self.searchResults = [];
    },

    removeCity(city) {
      self.cities = self.cities.filter(({ title }) => title !== city.title);
      localStorage.setItem('cities', JSON.stringify(self.cities));
    },

    addCity(city) {
      if (self.cities.filter(({ title }) => title === city.title).length > 0) return;
      self.cities.push({...city});
      localStorage.setItem('cities', JSON.stringify(self.cities));
    },

    updateTemperature(temperature) {
      self.temperature = Math.round(temperature);
      self.isWeatherLoading = false;
    },

    handleCityClick(city) {
      self.selectedCity = city.title;
      self.isWeatherLoading = true;

      requestWeather(city.latitude, city.longitude)
        .then(response => response.json())
        .then(({ currently: { temperature } }) => {
          self.updateTemperature(temperature);
        },
        error => {
          console.log(error);
          self.updateTemperature(0);
        });
    },

    updateSearchResults(results = []) {
      self.searchResults = results;
      self.isSearchLoading = false;
    },

    handleSearchChange(value) {
      self.searchValue = value;
  
      if (value.length > 2) {
        self.isSearchLoading = true;
        requestSearchCity(self.selectedCountry, value)
          .then(response => response.json())
          .then(data => {
            if (data.error) {
              console.log(data.error);
              self.updateSearchResults();
              return;
            }
            data = data.map(({ city, ...other }) => ({
              title: city,
              ...other
            }));
            self.updateSearchResults(data);
  
            console.log('fetching city');
          },
          error => {
            console.log(error);
            self.updateSearchResults();
          })
      } else {
        self.updateSearchResults();
      }
    },

    handleResultSelect(result) {
      self.addCity(result);
      self.searchValue = '';
    }
  }));

  export default Store;