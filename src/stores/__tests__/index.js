import Store from '..'

const store = Store.create()

const countries = [
  {
    key: 'ru',
    value: 'ru',
    text: 'Russia'
  },
  {
    key: 'ua',
    value: 'ua',
    text: 'Ukraine'
  }
]

const cities = [
  {
    country: 'Russia',
    latitude: '43',
    longitude: '42',
    region: 'Leningradskaya',
    title: 'Saint-Peterspurg',
  },
  {
    country: 'Ukraine',
    latitude: '42',
    longitude: '43',
    region: 'Kievskaia',
    title: 'Kiev',
  }
]

describe('Store', () => {
  it('has correct initial values', () => {
    expect(store.countries).toEqual([])
    expect(store.isCountriesLoading).toBe(true)
    expect(store.selectedCountry).toBe('')
    expect(store.cities).toEqual([])
    expect(store.selectedCountry).toBe('')
    expect(store.temperature).toBe(0)
    expect(store.isSearchLoading).toBe(false)
    expect(store.searchResults).toEqual([])
    expect(store.searchValue).toBe('')
    expect(store.isWeatherLoading).toBe(false)
  })

  it('has correct updateCountries', () => {
    store.updateCountries(countries)
    expect(store.countries).toEqual(countries)
    expect(store.isCountriesLoading).toBe(false)
  })

  it('has correct updateCities', () => {
    store.updateCities(cities)
    expect(store.cities).toEqual(cities)
  })

  it('has correct updateSelectedCounrty', () => {
    store.updateSelectedCounrty(countries[0].value)
    expect(store.selectedCountry).toEqual('ru')
    expect(store.searchValue).toEqual('')
    expect(store.searchResults).toEqual([])
  })

  it('has correct add/remove city', () => {
    store.removeCity(cities[1])
    expect(store.cities).toEqual([cities[0]])
    store.addCity(cities[1])
    expect(store.cities).toEqual(cities)
  })

  it('has correct updateTemperature', () => {
    store.updateTemperature(26)
    expect(store.temperature).toEqual(26)
    expect(store.isWeatherLoading).toEqual(false)
  })

  it('has correct handleResultSelect', () => {
    const city = {
      country: 'England',
      latitude: '45',
      longitude: '143',
      region: 'England',
      title: 'London',
    }
    cities.push(city)

    store.handleResultSelect(city)
    expect(store.cities).toEqual(cities)
    expect(store.searchValue).toEqual('')
  })
})
