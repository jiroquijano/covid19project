export const DOMElements = {
    submitButton: document.querySelector('.submit-button'),
    searchInput: document.querySelector('.search-input'),
    searchType: document.querySelector('.search-type select'),
    searchResult: document.querySelector('.search-results'),
    searchSuggestions: document.querySelector('.search-suggestions')
};

export const renderLoader = ()=> {
    DOMElements.searchResult.innerHTML = `<p>loading</p><div class="loader"></div>`;
}