const PROXY = 'https://cors-anywhere.herokuapp.com/';
const BATTUTA_APY = '';
const DARK_SKY_APY = '';

export const requestCountries = () =>
  fetch(`${PROXY}http://battuta.medunes.net/api/country/all/?key=${BATTUTA_APY}`);

export const requestSearchCity = (country, value) =>
  fetch(`${PROXY}http://battuta.medunes.net/api/city/${country}/search/?city=${value}&key=${BATTUTA_APY}`);

export const requestWeather = (latitude, longitude) =>
  fetch(`${PROXY}https://api.darksky.net/forecast/${DARK_SKY_APY}/${latitude},${longitude}?units=si`);
