import Search from './models/Search.js';
import Results from './models/Results.js';
import Totals from './models/Totals.js';
import {DOMElements} from './views/base.js';
import * as searchView from './views/searchView.js';
import * as searchResultsView from './views/searchResultsView.js';
import * as totalsView from './views/totalsView.js';

const modelsState = {
    search: '',
    results: '',
    totals: ''
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
        modelsState.search.getMapImage(data.geodata.coordinates,(returnData)=>{
            if(returnData.error) return console.log('image not rendered');
            searchView.renderMapResult(returnData.staticMapImageSrc);
        });
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

const totalsControl = ()=>{
    modelsState.totals = new Totals();
    modelsState.totals.getTotalsData((dailyData)=>{
        totalsView.updateTotalsView(dailyData);
    });
};

const renderMapForHospitalItem = (coord) =>{
    const coordinates = coord.split(',');
    modelsState.search.getMapImage(coordinates,(data)=>{
        if(data.error) return console.log('failed to render map');
        if(!document.querySelector(`.hospital-item[data-coord="${coord}"] img`)){
            document.querySelector(`.hospital-item[data-coord="${coord}"]`).insertAdjacentHTML('beforeend',`<img class="geoimg" src=${data.staticMapImageSrc}>`);
        }
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

DOMElements.searchResult.addEventListener('click',(event)=>{
    if(event.target.closest('.hospital-item')){
        document.querySelectorAll('.hospital-item img').forEach((curr)=>{
            if(curr.parentElement.dataset.coord != event.target.closest('.hospital-item').dataset.coord){
                curr.parentElement.removeChild(document.querySelector('.hospital-item img'));
            }
        });
        renderMapForHospitalItem(event.target.closest('.hospital-item').dataset.coord);
    }
});

window.addEventListener('load',(event)=>{
    totalsControl();
});