import {DOMElements} from './base.js';

export const getSearchValues = ()=>{
    return {
        searchValue: DOMElements.searchInput.value,
        searchType: DOMElements.searchType.value
    };
};

export const alertNoResultsFound = (searchValue)=>{
    DOMElements.searchSuggestions.innerHTML = '';
    alert(`No Results found for ${searchValue} :(`);
}

export const suggestAlternativePlaces = (selected,altPlaces)=>{
    DOMElements.searchSuggestions.innerHTML = '';
    let markup = altPlaces.reduce((acc, curr) => {
        return `${acc}<button class="suggestion">${curr}</button>`;
    },'');
    DOMElements.searchInput.value = selected;
    DOMElements.searchSuggestions.insertAdjacentHTML("afterbegin",markup);
}

export const changeSearchInputValue = (newText) =>{
    DOMElements.searchInput.value = newText;
}