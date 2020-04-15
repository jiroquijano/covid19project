import {DOMElements} from './base.js';

// newCases: "230"
// newDeaths: "14"
// casesYesterday: "291"
// deathsYesterday: "20"
// totalCases: "5453"
// totalDeaths: "349"
// recoveries: "353"

const updateNewCasesReports = (data) =>{
    if(data.newCases === undefined){ //this means that new data was still not uploaded, so let's use yesterday's data instead
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday = yesterday.toLocaleDateString('en-US');
        DOMElements.dailyReportHead.innerHTML = `<i class="far fa-newspaper"></i> UPDATES YESTERDAY (${yesterday})`;
        DOMElements.dailyReportDetails.innerHTML = `<i class="fas fa-head-side-mask"></i>  new cases: ${data.casesYesterday} |<i class="fas fa-skull-crossbones"></i>  new deaths: ${data.deathsYesterday}</h2>`;
        const noticeMarkup = `<h2>(Still no reports collected for today. Try to refresh page from time to time.)</h2>`;
        DOMElements.dailyReport.insertAdjacentHTML('beforeend',noticeMarkup);
    } else{
        const today = new Date().toLocaleDateString('en-US');
        DOMElements.dailyReportHead.innerHTML = `<i class="far fa-newspaper"></i> UPDATES FOR TODAY (${today})`;
        DOMElements.dailyReportDetails.innerHTML = `<i class="fas fa-head-side-mask"></i>  new cases: ${data.newCases} |<i class="fas fa-skull-crossbones"></i>  new deaths: ${data.newDeaths}</h2>`;
    }
}

export const updateTotalsView = (data) =>{
    DOMElements.overallCases.innerHTML = data.totalCases;
    DOMElements.overallDeaths.innerHTML = data.totalDeaths;
    DOMElements.overallRecovery.innerHTML = data.recoveries;
    updateNewCasesReports(data);
};