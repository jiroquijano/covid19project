import Search from './models/Search.js';
import {DOMElements, renderLoader} from './views/base.js';
import * as searchView from './views/searchView.js';

const modelsState = {
    search: ''
}

const searchControl = ()=>{
    const query = searchView.getSearchValues();
    if(!query) return console.log(`button was clicked without any query`);
    renderLoader();
    modelsState.search = new Search(query);
    modelsState.search.getInformationFromBackend((data)=>{
        DOMElements.searchResult.innerHTML='';
        if(data.error) return searchView.alertNoResultsFound(query.searchValue);
        const alternativePlaces = data.geodata.alternativePlaces ? data.geodata.alternativePlaces:[];
        searchView.suggestAlternativePlaces(data.geodata.name,alternativePlaces);
        console.log(data);
    });
}

DOMElements.submitButton.addEventListener('click',(event)=>{
    searchControl();
});

DOMElements.searchInput.addEventListener('keypress',(event)=>{
    if(event.code === 'Enter'){
        searchControl();
    }
});

DOMElements.searchSuggestions.addEventListener('click',(event)=>{
    searchView.changeSearchInputValue(event.target.closest('.suggestion').textContent);
});