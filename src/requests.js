const PROXY = 'https://cors-anywhere.herokuapp.com/';
const APY_KEY = 'adf71606d2c0fa1fd81ecbec927758a4';
const DARK_SKY_APY = '977a2c732b7b97d332633b21ac6959e7';

export const requestCountries = () =>
  fetch(`${PROXY}http://battuta.medunes.net/api/country/all/?key=${APY_KEY}`);

export const requestSearchCity = (country, value) =>
  fetch(`${PROXY}http://battuta.medunes.net/api/city/${country}/search/?city=${value}&key=${APY_KEY}`);

export const requestWeather = (latitude, longitude) =>
  fetch(`${PROXY}https://api.darksky.net/forecast/${DARK_SKY_APY}/${latitude},${longitude}?units=si`);
