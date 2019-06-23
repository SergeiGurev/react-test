import { observable, decorate, action } from 'mobx';

import { requestWeather } from './requests.js';

class Store {
  countries = null;
  isFetching = true;
  selectCountry = '';
  cities = [];
  temperature = 0;

  isSearchLoading = false;
  searchResults = [];
  searchValue = '';

  isWeatherLoading = false;

  get getCities() {
    return this.cities;
  }

  updateSelectCounrty(country) {
    this.selectCountry = country;
    this.searchValue = '';
    this.searchResults = [];
  }

  removeCity(cityTitle) {
    this.cities = this.cities.filter(({ title }) => title !== cityTitle);
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  addCity(city) {
    if (this.cities.filter(({ title }) => title === city.title).length > 0) return;
    this.cities.push(city);
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  fetchWeather(latitude, longitude) {
    this.isWeatherLoading = true;

    requestWeather(latitude, longitude)
      .then(response => response.json())
      .then(({ currently: { temperature } }) => {
        this.temperature = Math.round(temperature);
        this.isWeatherLoading = false;
      },
      error => {
        console.log(error);
        this.isWeatherLoading = false;
      });
  }
};

decorate(Store, {
  countries: observable,
  isFetching: observable,
  selectCountry: observable,
  cities: observable,
  temperature: observable,
  isSearchLoading: observable,
  searchResults: observable,
  searchValue: observable,
  isWeatherLoading: observable,
  updateSelectCounrty: action,
  removeCity: action,
  addCity: action
})

export const store = new Store();