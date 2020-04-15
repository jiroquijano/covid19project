import Search from './models/Search.js';
import Results from './models/Results.js';
import {DOMElements} from './views/base.js';
import * as searchView from './views/searchView.js';
import * as searchResultsView from './views/searchResultsView.js';

const modelsState = {
    search: '',
    results: ''
}

const searchControl = ()=>{
    const query = searchView.getSearchValues();
    if(!query) return console.log(`button was clicked without any query`);
    searchView.renderLoader();
    modelsState.search = new Search(query);
    modelsState.search.getInformationFromBackend((data)=>{
        searchView.removeLoader();
        if(data.error) return searchView.alertNoResultsFound(query.searchValue);
        const alternativePlaces = data.geodata.alternativePlaces ? data.geodata.alternativePlaces:[];
        searchView.suggestAlternativePlaces(data.geodata.name,alternativePlaces);
        console.log(data);
        modelsState.results = new Results(data);
        resultsControl(modelsState.search.getType());
    });
}

const resultsControl = (resultType)=>{
    if(resultType === 'hospitals'){
        const confirmedCasesTotal = modelsState.results.getTotalOfX('confirmed_cases');
        const puisTotal = modelsState.results.getTotalOfX('puis');
        searchResultsView.renderHospitalsResults(confirmedCasesTotal,puisTotal,modelsState.results.getResultsArray());
    }else if(resultType === 'individuals'){
        const admittedCount = modelsState.results.countArrElementsWhichSatisfies('status','admitted');
        const deadCount = modelsState.results.countArrElementsWhichSatisfies('status','died');
        const recoveredCount = modelsState.results.countArrElementsWhichSatisfies('status','recovered');
        searchResultsView.renderIndividualsResults(admittedCount,deadCount,recoveredCount,modelsState.results.getResultsArray());
    }
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