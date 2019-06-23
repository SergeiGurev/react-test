const PROXY = 'https://cors-anywhere.herokuapp.com/';
const APY_KEY = '3437fcdb53c94ff1ad01fafaa1ce666e';
const DARK_SKY_APY = '977a2c732b7b97d332633b21ac6959e7';

export const requestCountries = () => fetch(`${PROXY}http://battuta.medunes.net/api/country/all/?key=${APY_KEY}`);

export const requestSearchCity = (country, value) =>
  fetch(`${PROXY}http://battuta.medunes.net/api/city/${country}/search/?city=${value}&key=${APY_KEY}`);

export const requestWeather = (latitude, longitude) =>
  fetch(`${PROXY}https://api.darksky.net/forecast/${DARK_SKY_APY}/${latitude},${longitude}?units=si`);