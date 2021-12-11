//! data-dashboard v0.2.2 ~~ https://data-dashboard.js.org ~~ MIT License
!function(t,a,e,s,o,n){"use strict";const r={widgets:[{code:"fin-rate-intraday",header:"Exchange rate intraday"},{code:"fin-rate-moving-avg",header:"Exchange rate moving average"},{code:"network-endpoints",header:"REST endpoints"},{code:"network-log",header:"Network log"},{code:"network-rest-tool",header:"REST tool"},{code:"project-contributors",header:"dna.js contributors"},{code:"project-json-questions",header:"JSON questions"},{code:"space-starships",header:"Starship data"},{code:"space-vehicles",header:"Vehicle data"},{code:"spacex-books",header:"SpaceX books"},{code:"spacex-pics",header:"SpaceX pictures"},{code:"trans-bart-departures",header:"BART departures"},{code:"trans-bart-stations",header:"BART stations"},{code:"trans-f1-top-countries",header:"F1 top countries"},{code:"trans-nyc-bike-stations",header:"NYC bike stations"}],panels:[{code:"starships",header:"Starships",display:!0,widgets:["space-starships","space-vehicles"]},{code:"space",header:"Space",display:!0,widgets:["spacex-books","spacex-pics"]},{code:"trans",header:"Transportation",display:!0,widgets:["trans-nyc-bike-stations","trans-bart-stations","trans-bart-departures","trans-f1-top-countries"]},{code:"finance",header:"Finance",display:!0,widgets:["fin-rate-moving-avg","fin-rate-intraday"]},{code:"project",header:"Project",display:!0,widgets:["project-contributors","project-json-questions"]},{code:"tbd",header:"TBD",display:!1,widgets:["wip-widget"]},{code:"network",header:"Network",display:!0,widgets:["network-log","network-endpoints","network-rest-tool"]}],chartColors:[{code:"red",value:"rgba(255,  99, 132, 0.7)"},{code:"blue",value:"rgba( 54, 162, 235, 0.7)"},{code:"yellow",value:"rgba(255, 206,  86, 0.7)"},{code:"green",value:"rgba( 75, 192, 192, 0.7)"},{code:"purple",value:"rgba(153, 102, 255, 0.7)"},{code:"orange",value:"rgba(255, 159,  64, 0.7)"},{code:"teal",value:"rgba(  0, 200, 230, 0.7)"}]},i={displayDataChart(t,a){const e=(t=>{const a=t["Meta Data"],e=t["Time Series FX (5min)"],s=Object.keys(e).sort(),o=a["2. From Symbol"]+"/"+a["3. To Symbol"];return{title:a["1. Information"],subtitle:o+" "+a["4. Last Refreshed"],labels:s.map((t=>t.substring(11,16))),lows:s.map((t=>parseFloat(e[t]["3. low"]))),highs:s.map((t=>parseFloat(e[t]["2. high"])))}})(a),s=[{label:"Low",data:e.lows},{label:"High",data:e.highs}],n={type:"line",data:{labels:e.labels,datasets:C.util.addChartColors(s)},options:{maintainAspectRatio:!1,plugins:{title:{display:!0,text:[e.title,e.subtitle]}}}},r=t.find("canvas");t.data().chart=new o.Chart(r,n)},show(t){const a="https://www.alphavantage.co/query";C.util.spinnerStart(t),e.fetchJson.get(a,{function:"FX_INTRADAY",from_symbol:"EUR",to_symbol:"USD",interval:"5min",outputsize:"full",apikey:"demo"}).then((e=>{C.util.spinnerStop(t),!e||e["Error Message"]?console.error(a,e):C.widget.finRateIntraday.displayDataChart(t,e)}))}},l={displayDataChart(t,a){const e=(t=>{const a=t["Meta Data"],e=t["Technical Analysis: SMA"],s=Object.keys(e).sort();return{title:a["2: Indicator"],subtitle:a["3: Last Refreshed"],set:a["1: Symbol"],labels:s,values:s.map((t=>parseFloat(e[t].SMA)))}})(a),s={label:e.set,data:e.values,borderColor:C.lookup.chartColor.purple.value,backgroundColor:C.lookup.chartColor.purple.value},n={type:"line",data:{labels:e.labels,datasets:[s]},options:{maintainAspectRatio:!1,plugins:{title:{display:!0,text:[e.title,e.subtitle]}}}},r=t.find("canvas");t.data().chart=new o.Chart(r,n)},show(t){C.util.spinnerStart(t),e.fetchJson.get("https://www.alphavantage.co/query",{function:"SMA",symbol:"USDEUR",interval:"weekly",time_period:10,series_type:"open",apikey:"demo"}).then((a=>{C.util.spinnerStop(t),a["Error Message"]||C.widget.finRateMovingAvg.displayDataChart(t,a)}))}},c={show:t=>(a.dna.getModel(t).endpoints=[{name:"Alpha Vantage API",base:"https://www.alphavantage.co/query",docs:"https://www.alphavantage.co/documentation"},{name:"BART API",base:"https://api.bart.gov/api",docs:"https://api.bart.gov/docs/overview/examples.aspx"},{name:"Citi Bike",base:"https://gbfs.citibikenyc.com",docs:"https://www.citibikenyc.com/system-data"},{name:"Ergast Developer API",base:"https://ergast.com/api/f1",docs:"https://ergast.com/mrd/"},{name:"GitHub REST API",base:"https://api.github.com",docs:"https://developer.github.com/v3"},{name:"Google Books APIs",base:"https://www.googleapis.com/books",docs:"https://developers.google.com/books"},{name:"Flickr API",base:"https://api.flickr.com/services",docs:"https://www.flickr.com/services/feeds/docs/photos_public"},{name:"Stack Exchange API",base:"https://api.stackexchange.com",docs:"https://api.stackexchange.com/docs"},{name:"The Star Wars API",base:"https://swapi.py4e.com/api",docs:"https://swapi.py4e.com/documentation"}],a.dna.refresh(t))},p={show(t){const a=t.find("figure table"),s=new(0,globalThis.simpleDatatables.DataTable)(a[0],{perPageSelect:[10,25,50,100]}),o=e.fetchJson.getLogHeaders(),n=C.network.getLog().reverse(),r=e.fetchJson.getLogHeaderIndex().domain;o.splice(r,1),C.transformer.dataTablesNormalizer(n,o.length,r),s.insert({headings:o,data:n}),t.data().table=s}},d={elem:null,get(t){const s=C.widget.networkRestTool.elem,o=a.dna.getModel(s.widget),r=e=>{o.restError=!!e.error,o.jsonHtml=n.prettyPrintJson.toHtml(e),a.dna.refresh(s.widget,{html:!0}),C.util.spinnerStop(s.widget),s.button.enable(),t&&s.input.trigger("focus")};C.util.spinnerStart(s.widget),o.url=s.input.val(),e.fetchJson.get(o.url).then(r).catch((t=>r({error:!0,name:t.name,message:t.message})))},show(t){const a={widget:t,input:t.find("input"),button:t.find("button")};C.widget.networkRestTool.elem=a,a.input.val("https://dnajs.org/api/books/1/"),C.widget.networkRestTool.get()}},h={show(t){C.util.spinnerStart(t),e.fetchJson.get("https://api.github.com/repos/dnajs/dna.js/contributors").then((e=>{C.util.spinnerStop(t);a.dna.getModel(t).contributors=e,a.dna.refresh(t)}))}},g={displayDataChart(t,a){const e=C.lookup.chartColors.length,n="Page views of "+e+" most recently active JSON questions",r=a.slice(0,e).sort(((t,a)=>a.view_count-t.view_count)),i={backgroundColor:C.lookup.chartColors.map((t=>t.value)),data:r.map((t=>t.view_count))},l={type:"pie",data:{labels:r.map((t=>t.owner.display_name)),datasets:[i]},options:{maintainAspectRatio:!1,plugins:{title:{display:!0,text:["Active JSON Questions",n]}}}},c=t.find("canvas");t.data().chart=new o.Chart(c,l),s.libX.ui.normalize(t)},displayDataTable(t,a){const e=t.find("figure table"),s=new(0,globalThis.simpleDatatables.DataTable)(e[0]);a.forEach((t=>t.timestamp=C.util.secsToStr(t.last_activity_date))),a.forEach((t=>t.link="<span data-href="+t.link+">"+t.title+"</span>"));const o=a.map((t=>[t.timestamp,t.owner.display_name,t.is_answered,t.view_count,t.score||0,t.link]));C.transformer.dataTablesNormalizer(o),s.insert({headings:["Last activity","Owner","Answered","Views","Score","Title"],data:o}),t.data().table=s},show(t){C.util.spinnerStart(t),e.fetchJson.get("https://api.stackexchange.com/2.2/search",{order:"desc",sort:"activity",intitle:"json",site:"stackoverflow"}).then((a=>{C.util.spinnerStop(t),C.widget.projectJsonQuestions.displayDataChart(t,a.items),C.widget.projectJsonQuestions.displayDataTable(t,a.items)}))}},u={displayDataChart(t,a){a.forEach((t=>t.chart={passengers:parseInt(t.passengers)||0,crew:parseInt(t.crew)||0})),a.forEach((t=>t.chart.total=t.chart.passengers+t.chart.crew)),a.sort(((t,a)=>t.chart.total-a.chart.total));const e=a.slice(-11,-3),s=[{label:"Passengers",data:e.map((t=>t.chart.passengers))},{label:"Crew",data:e.map((t=>t.chart.crew))}],n={type:"bar",data:{labels:e.map((t=>t.name)),datasets:C.util.addChartColors(s,4)},options:{maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{stacked:!0}},plugins:{title:{display:!0,text:["Larger Starships","Passengers and crew capacity"]}}}},r=t.find("canvas");t.data().chart=new o.Chart(r,n)},displayDataTable(t,a){const e=t.find("figure table"),s=new(0,globalThis.simpleDatatables.DataTable)(e[0]),o=a.map((t=>[t.name,t.model,t.length,t.crew,t.passengers,t.MGLT,t.starship_class]));s.insert({headings:["Name","Model","Length","Crew","Passengers","MGLT","Class"],data:o}),t.data().table=s},show(t){const a=[],s=o=>{a.push(...o.results),o.next?e.fetchJson.get(o.next.replace("http://","https://")).then(s):(C.util.spinnerStop(t),C.widget.spaceStarships.displayDataChart(t,a),C.widget.spaceStarships.displayDataTable(t,a))};C.util.spinnerStart(t),e.fetchJson.get("https://swapi.py4e.com/api/starships/",{format:"json"}).then(s)}},b={displayDataChart(t,a){a.forEach((t=>t.chart={passengers:parseInt(t.passengers)||0,crew:parseInt(t.crew)||0})),a.forEach((t=>t.chart.total=t.chart.passengers+t.chart.crew)),a.sort(((t,a)=>t.chart.total-a.chart.total));const e=a.slice(-12,-4),s=[{label:"Passengers",data:e.map((t=>t.chart.passengers))},{label:"Crew",data:e.map((t=>t.chart.crew))}],n={type:"bar",data:{labels:e.map((t=>t.name)),datasets:C.util.addChartColors(s,1)},options:{maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{stacked:!0}},plugins:{title:{display:!0,text:["Larger Vehicles","Passengers and crew capacity"]}}}},r=t.find("canvas");t.data().chart=new o.Chart(r,n)},displayDataTable(t,a){const e=t.find("figure table"),s=new(0,globalThis.simpleDatatables.DataTable)(e[0]),o=a.map((t=>[t.name,t.model,t.length,t.crew,t.passengers,t.vehicle_class]));s.insert({headings:["Name","Model","Length","Crew","Passengers","Class"],data:o}),t.data().table=s},show(t){const a=[],s=o=>{a.push(...o.results),o.next?e.fetchJson.get(o.next.replace("http://","https://")).then(s):(C.util.spinnerStop(t),C.widget.spaceVehicles.displayDataChart(t,a),C.widget.spaceVehicles.displayDataTable(t,a))};C.util.spinnerStart(t),e.fetchJson.get("https://swapi.py4e.com/api/vehicles/",{format:"json"}).then(s)}},m={show(t){const s=t=>!!t.volumeInfo.imageLinks,o=t=>t.volumeInfo.imageLinks.thumbnail=t.volumeInfo.imageLinks.thumbnail.replace("http:","https:");C.util.spinnerStart(t),e.fetchJson.get("https://www.googleapis.com/books/v1/volumes",{q:"spacex"}).then((e=>{C.util.spinnerStop(t);const n=a.dna.getModel(t);n.books=e.items.filter(s),n.books.forEach(o),a.dna.refresh(t)}))}},w={show(t){C.util.spinnerStart(t),C.util.fetchJsonp("https://api.flickr.com/services/feeds/photos_public.gne",{format:"json",tags:"spacex"},"jsonFlickrFeed",(e=>{C.util.spinnerStop(t),e.items.forEach((t=>t.date=t.date_taken.substring(0,10)));a.dna.getModel(t).photos=e.items,a.dna.refresh(t)}))}},f={displayDataChart(t,a,e){const s=e.abbr+" -- Upcoming departures from "+e.name,n=a,r=e.etd||[];r.forEach((t=>t.estimate.forEach((a=>a.destination=t.destination))));const i=r.map((t=>t.estimate)).reduce(((t,a)=>t.concat(a)),[]).map((t=>({direction:t.direction,minutes:parseInt(t.minutes)||0,label:"Platform #"+t.platform+" to "+t.destination}))).sort(((t,a)=>t.minutes-a.minutes)),l=i.map((t=>t.direction)).filter(((t,a,e)=>e.indexOf(t)===a)),c=l.map((t=>i.filter((a=>a.direction===t)))),p=(t,a,e)=>t.delta=e[a].minutes-(a?e[a-1].minutes:0)+1;c.forEach((t=>t.forEach(p)));const d=Math.max(...c.map((t=>t.length)));c.forEach((t=>{for(;t.length<d;)t.push({direction:"",minutes:0,label:"",delta:0})}));const h=[];for(;h.length<d;)h.push({label:"Train "+(h.length+1),labels:c.map((t=>t[h.length].label)),data:c.map((t=>t[h.length].delta))});const g={x:{stacked:!0,scaleLabel:{display:!0,labelString:"Estimated minutes until departure"}},y:{stacked:!0,scaleLabel:{display:!0,labelString:"Direction"}}},u={type:"bar",data:{labels:l,datasets:C.util.addChartColors(h)},options:{indexAxis:"y",maintainAspectRatio:!1,scales:g,plugins:{title:{display:!0,text:[s,n]},tooltip:{callbacks:{label:t=>t.dataset.label+": "+t.dataset.labels[t.dataIndex]}}}}},b=t.find("canvas");t.data().chart=new o.Chart(b,u)},show(t){const a="https://api.bart.gov/api/etd.aspx";C.util.spinnerStart(t),e.fetchJson.get(a,{cmd:"etd",orig:"embr",key:"MW9S-E7SL-26DU-VV8V",json:"y"}).then((e=>{C.util.spinnerStop(t);const s=e.root.date+" "+e.root.time,o=e.root.station[0];o.message?.error&&console.log(a,o.message?.error),C.widget.transBartDepartures.displayDataChart(t,s,o)}))}},y={displayDataChart(t,a){const e={label:"Geolocation",backgroundColor:C.lookup.chartColor.green.value,data:a.map((t=>({x:parseFloat(t.gtfs_longitude),y:parseFloat(t.gtfs_latitude),label:t.abbr+" ("+t.name+")"})))},s={type:"scatter",data:{datasets:[e]},options:{maintainAspectRatio:!1,plugins:{title:{display:!0,text:["BART Stations","San Francisco Bay Area"]},tooltip:{callbacks:{label:t=>t.dataset.data[t.dataIndex].label+" "+(t=>{const a=parseFloat(t.formattedValue),e=parseFloat(t.label);return`${Math.abs(a)}°${a>0?"N":"S"} ${Math.abs(e)}°${e>0?"E":"W"}`})(t)}}}}},n=t.find("canvas");t.data().chart=new o.Chart(n,s)},displayDataTable(t,a){const e=t.find("figure table"),s=new(0,globalThis.simpleDatatables.DataTable)(e[0]),o=a.map((t=>[t.name,t.abbr,t.gtfs_latitude,t.gtfs_longitude,t.city,t.county]));s.insert({headings:["Name","Code","Latitude","Longitude","City","County"],data:o}),t.data().table=s},show(t){C.util.spinnerStart(t),e.fetchJson.get("https://api.bart.gov/api/stn.aspx",{cmd:"stns",key:"MW9S-E7SL-26DU-VV8V",json:"y"}).then((a=>{C.util.spinnerStop(t);const e=a.root.stations.station;C.widget.transBartStations.displayDataChart(t,e),C.widget.transBartStations.displayDataTable(t,e)}))}},k={displayDataChart(t,a){const e=a.season+" "+a.raceName+" top 10 finishes",s=Number(a.round),n=a.Results.slice(0,10).reduce(((t,a)=>([a.Driver.nationality,a.Constructor.nationality].forEach((a=>{t[a]||(t[a]={nationality:a,numDrivers:0,numConstructors:0})})),t[a.Driver.nationality].numDrivers++,t[a.Constructor.nationality].numConstructors++,t)),{}),r=Object.keys(n).map((t=>n[t]));r.sort(((t,a)=>t.numDrivers+t.numConstructors-a.numDrivers-a.numConstructors||t.nationality.localeCompare(a.nationality)));const i=[{label:"Driver",data:r.map((t=>t.numDrivers))},{label:"Constructor",data:r.map((t=>t.numConstructors))}],l={type:"bar",data:{labels:r.map((t=>t.nationality)),datasets:C.util.addChartColors(i)},options:{maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{stacked:!0}},plugins:{title:{display:!0,text:["Nationalities of Top F1 Drivers and Constructors",e]}}}},c=t.find("canvas").eq(s-1);t.data().chart=new o.Chart(c,l)},show(t){const a=(new Date).getFullYear()-1,s=a=>{C.util.spinnerStop(t);const e=a.MRData.RaceTable.Races[0];C.widget.transF1TopCountries.displayDataChart(t,e)};C.util.spinnerStart(t);t.find("app-widget-body >figure >canvas").each((t=>(t=>{const o="https://ergast.com/api/f1/"+a+"/"+t+"/results.json";e.fetchJson.get(o).then(s)})(t+1)))}},v={displayDataChart(t,a){const e="Capacity on "+new Date(1e3*a.last_updated).toLocaleString(),s=a.data.stations;s.forEach((t=>t.capacity=t.num_docks_available+t.num_bikes_available+t.num_bikes_disabled)),s.sort(((t,a)=>t.capacity-a.capacity)),s.forEach((t=>t.reservedBikes=t.totalDocks-t.availableDocks-t.availableBikes));const n=[{label:"Available docks",data:s.map((t=>t.num_docks_available))},{label:"Available bikes",data:s.map((t=>t.num_bikes_available))},{label:"Disabled bikes",data:s.map((t=>t.num_bikes_disabled))}],r={type:"bar",data:{labels:Array.from({length:s.length},((t,a)=>a+1)),datasets:C.util.addChartColors(n,3)},options:{maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{stacked:!0}},plugins:{title:{display:!0,text:["NYC Bike Stations",e]}}}};C.util.narrowScreenSaver(r);const i=t.find("canvas");t.data().chart=new o.Chart(i,r)},show(t){C.util.spinnerStart(t),e.fetchJson.get("https://gbfs.citibikenyc.com/gbfs/en/station_status.json").then((a=>{C.util.spinnerStop(t),C.widget.transNycBikeStations.displayDataChart(t,a)}))}},C={config:r,controller:{showPanel(t){window.scrollTo({top:0});return t.find(">app-widgets").children().toArray().forEach(((e,s)=>{const o=$(e),n=a.dna.getModel(o),r="DataDashboard - Missing widget, index: %s, panel: %s",i="DataDashboard - Widget controller missing: %s";if(!n)throw Error(a.dna.util.printf(r,s,t.data().hash));o.find(">app-widget-body").remove(),o.append(a.dna.clone(n.code,{}));const l=C.widget[a.dna.util.toCamel(n.code)];if(!l)throw Error(a.dna.util.printf(i,n.code));l.show(o)})),t},setup(){s.libX.ui.autoDisableButtons(),a.dna.registerInitializer(s.libX.bubbleHelp.setup),e.fetchJson.enableLogger(C.network.logEvent),C.lookup.panels.forEach((t=>t.widgetList=t.widgets.map((t=>C.lookup.widget[t]))));const t=C.lookup.panels.filter((t=>t.display));$((()=>{a.dna.clone("app-menu-item",t),a.dna.clone("app-panel",t)}))}},util:{lookupChartColor:t=>C.lookup.chartColors[t%C.lookup.chartColors.length].value,addChartColors:(t,a=0)=>(t.forEach(((t,e)=>{t.fill=!1,t.borderColor=C.util.lookupChartColor(a+e),t.backgroundColor=C.util.lookupChartColor(a+e)})),t),narrowScreenSaver(t,a){const e={maxPoints:200,screenWidth:700,...a},s=Math.ceil(t.data.labels.length/e.maxPoints);return s>1&&$(document.body).width()<e.screenWidth&&(()=>{const a=t=>t.filter(((t,a)=>a%s==0));t.data.labels=a(t.data.labels),t.data.datasets.forEach((t=>t.data=a(t.data)))})(),t},secsToStr:t=>new Date(1e3*t).toISOString().replace("T"," ").substring(0,19),spinnerStart(t){t=t.closest("app-widget");const a=t.addClass("waiting").find(">app-widget-spinner");return(a.length?a:s.libX.ui.makeIcons($("<app-widget-spinner><i data-icon=yin-yang class=fa-spin>").css({paddingTop:t.height()/2-50})).appendTo(t)).hide().fadeIn().parent()},spinnerStop(t){const a=t.closest("app-widget").removeClass("waiting");return a.find(">app-widget-spinner").fadeOut(1500),a},fetchJsonp(t,a,e,s){const o=new URL(t);a&&Object.entries(a).forEach((t=>o.searchParams.append(t[0],String(t[1]))));const n={url:o.href,dataType:"jsonp",jsonpCallback:e};return $.ajax(n).done(s)}},network:{logName:"network-log",logEvent(...t){console.log(t.join(" - "));const a=C.network.getLog();for(a.push(t);a.length>250;)a.shift();localStorage.setItem(C.network.logName,JSON.stringify(a))},getLog:()=>JSON.parse(localStorage.getItem(C.network.logName))||[]},transformer:{dataTablesNormalizer(t,a,e){const s=a||(t.length?t[0].length:0);return t.forEach((t=>{for(t.forEach(((a,e)=>{const s=typeof a;"string"!==s&&(t[e]=["boolean","number"].includes(s)?String(a):"")})),void 0!==e&&t.splice(e,1);t.length<s;)t.push("");for(;t.length>s;)t.pop()})),t}},lookup:{widgets:r.widgets,panels:r.panels,chartColors:r.chartColors,widget:a.dna.array.toMap(r.widgets),panel:a.dna.array.toMap(r.panels),chartColor:a.dna.array.toMap(r.chartColors)},widget:{finRateIntraday:i,finRateMovingAvg:l,networkEndpoints:c,networkLog:p,networkRestTool:d,projectContributors:h,projectJsonQuestions:g,spaceStarships:u,spaceVehicles:b,spacexBooks:m,spacexPics:w,transBartDepartures:f,transBartStations:y,transF1TopCountries:k,transNycBikeStations:v},setup(){console.log("DataDashboard",C.lookup.widgets.map((t=>t.code))),a.dna.registerContext("app",C),C.controller.setup()}};C.setup(),t.app=C,Object.defineProperty(t,"__esModule",{value:!0})}({},globalThis,globalThis,globalThis,globalThis,globalThis);
