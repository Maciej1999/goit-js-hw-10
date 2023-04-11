import _ from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener(
  'input',
  _.debounce(() => {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    if (inputCountry.value.trim() == '') {
      return;
    } else {
      fetchCountries(inputCountry.value.trim()).then(data => {
        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length <= 10 && data.length > 1) {
          data.forEach(country => {
            countryListEl(country);
          });
        } else {
          data.forEach(country => {
            countryInfoDetails(country);
          });
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

const countryListEl = country => {
  countryList.insertAdjacentHTML(
    'beforeend',
    `
  <li class="country-list__element">
    <img src="${country.flags.svg}" alt="${country.flags.svg}"/>
    <p>${country.name.common}</p>
   </li>`
  );
};

const countryInfoDetails = country => {
  countryInfo.innerHTML = `
  <img src="${country.flags.svg}" alt="${country.flags.svg}"/>
  <h2>${country.name.common}</h2>
  <p><span class="bold">Capital:</span> ${country.capital}</p>
  <p><span class="bold">Population:</span> ${country.population}</p>
  <p><span class="bold">Languages:</span> ${Object.values(country.languages)}</>
  `;
};
