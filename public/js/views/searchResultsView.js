import {DOMElements} from './base.js'

const changeGlowColor = (confirmed,pui)=>{
    if(confirmed+pui === 0){
        document.querySelector('.totals').classList.add('greenboxshadow');
    } else if(pui > 0 && confirmed === 0){
        document.querySelector('.totals').classList.add('orangeboxshadow');
    }else{
        document.querySelector('.totals').classList.add('redboxshadow');
    }
}

const changeGlowColorForIndividualsSearch = (admitted,dead,recovered)=>{
    const compareArray = [admitted,dead,recovered];
    if(admitted+dead+recovered === 0){
        document.querySelector('.totals').classList.add('greenboxshadow');
    }else if(Math.max(...compareArray) === dead){
        document.querySelector('.totals').classList.add('redboxshadow');
    }else if(Math.max(...compareArray) === admitted){
        document.querySelector('.totals').classList.add('orangeboxshadow');
    }else if(Math.max(...compareArray)=== recovered){
        document.querySelector('.totals').classList.add('greenboxshadow');
    }
}

const renderIndividualItems = (individualsArray)=>{
    const markup = individualsArray.reduce((acc,curr)=>{
        const status = curr.date_died ? 'died' : curr.recovered_on ? 'recovered' : curr.is_admitted ? 'admitted' : 'unknown';
        const iconMap = {
            admitted:'<i class="fas fa-head-side-mask"></i>',
            unknown: '<i class="fas fa-head-side-mask"></i>',
            died:'<i class="fas fa-skull-crossbones"></i>',
            recovered:'<i class="fas fa-walking"></i>'
        };
        return `${acc}<li>
                        <div class="individual-item" data-coord="${curr.longitude},${curr.latitude}">
                            <h1>${iconMap[status.toLowerCase()]}</h1>
                            <h1>Case Number ${curr.case_code}</h1>
                            <h2>  age: ${curr.age} |  gender: ${curr.sex}</h2>
                            <h2>  resident of: ${curr.location} | status: ${status}</h2>
                        </div>
                    </li>`;
    },'');
    return markup;
}

const renderHospitalItems = (hospitalsArray) =>{
    const markup = hospitalsArray.reduce((acc,curr)=>{
        return `${acc}<li>
                        <div class="hospital-item" data-coord="${curr.longitude},${curr.latitude}">
                            <h1>${curr.facility}</h1>
                            <h2><span class="red"><i class="fas fa-virus"></i>  confirmed cases: ${curr.confirmed_cases} </span>| <i class="fas fa-person-booth"></i>  under investigation: ${curr.puis}</h2>
                        </div>
                        </li>`;
    },'');
    return markup;
}

export const renderHospitalsResults = (confirmedSummary,puiSummary,items) =>{
    DOMElements.searchResult.innerHTML = '';
    const markup = `<p class="result-type"><i class="fas fa-search-location"></i>   NEARBY HOSPITALS</p>
                    <article class="totals">
                        <p><i class="fas fa-file-medical-alt"></i>   SUMMARY</p>
                        <table class="confirmed-table">
                            <tbody>
                                <tr>
                                    <th class="confirmed-head"><i class="fas fa-virus"></i>  CONFIRMED</th>
                                </tr>
                                <tr>
                                    <td class="confirmed-count count">${confirmedSummary}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="pui-table">
                            <tbody>
                                <tr>
                                    <th class="pui-head"><i class="fas fa-person-booth"></i> PUIS</th>
                                </tr>
                                <tr>
                                    <td class="pui-count count">${puiSummary}</td>
                                </tr>
                            </tbody>
                        </table>
                        <ul class="result-items">
                            ${renderHospitalItems(items)}
                        </ul>
                        <br>
                    </article>`;
    DOMElements.searchResult.insertAdjacentHTML("afterbegin",markup);
    changeGlowColor(confirmedSummary,puiSummary);
};

export const renderIndividualsResults = (admittedCount, deadCount, recoveredCount, individualsList)=>{
    DOMElements.searchResult.innerHTML = '';
    const markup = `<p class="result-type"><i class="fas fa-search-location"></i>   NEARBY INDIVIDUALS</p>
                    <article class="totals">
                        <p><i class="fas fa-file-medical-alt"></i>   SUMMARY</p>
                        <table class="admitted-table">
                            <tbody>
                                <tr>
                                    <th class="admitted-head"><i class="fas fa-head-side-mask"></i> ADMITTED</th>
                                </tr>
                                <tr>
                                    <td class="admitted-count count">${admittedCount}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="dead-table">
                            <tbody>
                                <tr>
                                    <th class="dead-head"><i class="fas fa-skull-crossbones"></i> DEAD</th>
                                </tr>
                                <tr>
                                    <td class="dead-count count">${deadCount}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="recovered-table">
                            <tbody>
                                <tr>
                                    <th class="recovered-head"><i class="fas fa-walking"></i> RECOVERED</th>
                                </tr>
                                <tr>
                                    <td class="recovered-count count">${recoveredCount}</td>
                                </tr>
                            </tbody>
                        </table>
                        <ul class="result-items">
                            ${renderIndividualItems(individualsList)}
                        </ul>
                        <br>
                    </article>`;
    DOMElements.searchResult.insertAdjacentHTML("afterbegin",markup);
    changeGlowColorForIndividualsSearch(admittedCount,deadCount,recoveredCount);
}