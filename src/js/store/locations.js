import api from "../services/apiService";

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = {};
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
    ]);

    const [countries, cities] = response;

    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);

    return response;
  }

  getCityNameByCountryCode(code) {
    return this.countries[code].name;
  }

  getCityCodeByKey(key) {
    return this.cities[key].code;
  }

  serializeCountries(countries) {
    // { 'Country code': {...} }

    return countries.reduce((acc, country) => {
      acc[country.code] = country;

      return acc;
    }, {});
  }

  serializeCities(cities) {
    // { 'City name, Country name': {...} }

    return cities.reduce((acc, city) => {
      const country_name = this.getCityNameByCountryCode(city.country_code);
      const city_name = city.name || city.name_translations.en;
      const full_name = `${city_name}, ${country_name}`;

      acc[full_name] = { ...city, country_name, city_name, full_name };

      return acc;
    }, {});
  }

  createShortCitiesList(cities) {
    // { 'City, Country': null }

    return Object.entries(cities).reduce((acc, [city]) => {
      acc[city] = null;

      return acc;
    }, {});
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);

    console.log(response.data);
  }
}

const locations = new Locations(api);

export default locations;
