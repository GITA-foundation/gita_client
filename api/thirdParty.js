import axios from 'axios';

export const getCountries = () => axios.get('https://restcountries.eu/rest/v2/all?fields=name;numericCode;');
