import {DOMElements} from './base.js'

const changeGlowColor = (confirmed,pui)=>{
    console.log('changing colors');
    if(confirmed+pui === 0){
        document.querySelector('.totals').classList.add('greenboxshadow');
    } else if(pui > 0 && confirmed === 0){
        document.querySelector('.totals').classList.add('orangeboxshadow');
    }else{
        document.querySelector('.totals').classList.add('redboxshadow');
    }
}

const renderHospitalItems = (hospitalsArray) =>{
    const markup = hospitalsArray.reduce((acc,curr)=>{
        return `${acc}<li>
                        <div class="hospital-item">
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
    console.log('added');
    changeGlowColor(confirmedSummary,puiSummary);
};