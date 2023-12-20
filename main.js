import { V } from "./js/view.js";
import { M } from "./js/model.js";

await M.init(); // on attend que les données soient chargées

let events = [
  ...M.getEvents("mmi1"),
  ...M.getEvents("mmi2"),
  ...M.getEvents("mmi3"),
];

let classes = events.map((event) => {
  return {
    duration: event.duration,
    location: event.location,
    classType: event.classType,
    group: event.group,
    ressources: event.ressource,
    semestre: event.semestre,
  };
});

console.log(classes);

const locations = ["101", "102", "103", "115", "R01", "R02", "R03", "R04", "ADM132"];
const classTypes = ["TP", "CM", "TD"];
const groups = ["BUT1", "BUT2", "BUT3"];
const semestre = ["S1", "S2", "S3", "S4", "S5", "S6"];

// get the total duration of each group (BUT1, BUT2, BUT3)
let totalGroup = {};
locations.forEach((location) => {
  totalGroup[location] = {};
  groups.forEach((group) => {
    totalGroup[location][group] = 0;
  });
});

classes.forEach((event) => {
  if (locations.includes(event.location) && groups.includes(event.group)) {
    totalGroup[event.location][event.group] += event.duration;
  }
});

//get the total duration of each classType by location
let totalClassType = {};
classes.forEach((event) => {
  if (locations.includes(event.location) && classTypes.includes(event.classType)) {
    if (!totalClassType[event.location]) {
      totalClassType[event.location] = {};
    }
    if (!totalClassType[event.location][event.classType]) {
      totalClassType[event.location][event.classType] = 0;
    }
    totalClassType[event.location][event.classType] += event.duration;
  }
});

let seriesObj1 = [];
let seriesObj2 = [];

// Loop through classTypes
classTypes.forEach((classType) => {
  let values = locations.map((location) => totalClassType[location][classType]);
  seriesObj1.push({
    values: values,
    text: classType,
  });
});

groups.forEach((group) => {
  let values = locations.map((location) => totalGroup[location][group]);
  seriesObj2.push({
    values: values,
    text: group,
  });
});

// recuperer la duration par location de chaque ressources
let totalRessource = {};
classes.forEach((event) => {
  if (locations.includes(event.location) && event.ressources) {
    if (!totalRessource[event.location]) {
      totalRessource[event.location] = {};
    }
    if (!totalRessource[event.location][event.ressources]) {
      totalRessource[event.location][event.ressources] = 0;
    }
    totalRessource[event.location][event.ressources] += event.duration;
  }
});

console.log(totalRessource);

// recuperer la duration par location de chaque semestre
let totalSemestre = {};
classes.forEach((event) => {
  if (locations.includes(event.location) && event.semestre) {
    if (!totalSemestre[event.location]) {
      totalSemestre[event.location] = {};
    }
    if (!totalSemestre[event.location][event.semestre]) {
      totalSemestre[event.location][event.semestre] = 0;
    }
    totalSemestre[event.location][event.semestre] += event.duration;
  }
});

console.log(totalSemestre);

// recuperer la duration par location de chaque usage
let totalUsage = {};
classes.forEach((event) => {
  if (locations.includes(event.location) && event.classType && ["TP", "TD", "CM"].includes(event.classType)) {
    if (!totalUsage[event.location]) {
      totalUsage[event.location] = {};
    }
    if (!totalUsage[event.location][event.classType]) {
      totalUsage[event.location][event.classType] = 0;
    }
    totalUsage[event.location][event.classType] += event.duration;
  }
});

console.log(totalUsage);

// render data

let chartLocations = [];


let chartData = [{
  id: 'all',
  parent: '',
  name: 'All',
}];

let chartDataRessource = [{
  id: 'all',
  parent: '',
  name: 'All',
}];

let chartDataSemestre = [{
  id: 'all',
  parent: '',
  name: 'All',
}];

let chartDataCours = [{
  id: 'all',
  parent: '',
  name: 'All',
}];

classes.forEach((event) => {
  if (event.location && locations.includes(event.location) && !chartLocations.includes(event.location)) {
    chartLocations.push(event.location);
    chartDataRessource.push({
      id: event.location,
      parent: 'all',
      name: event.location,
    });
    chartDataSemestre.push({
      id: event.location,
      parent: 'all',
      name: event.location,
    });
    chartDataCours.push({
      id: event.location,
      parent: 'all',
      name: event.location,
    });
  }

  if (event.location && locations.includes(event.location) && event.classType && ["TP", "TD", "CM"].includes(event.classType)) {
    if (!chartDataCours.find((data) => data.name === event.classType && data.parent === event.location)) {
      chartDataCours.push({
        id: `${event.location}-${event.classType}`,
        parent: event.location,
        name: event.classType,
        value: totalUsage[event.location][event.classType],
      });
    }
  }

  if (event.location && locations.includes(event.location) && event.semestre && semestre.includes(event.semestre)) {
    if (!chartDataSemestre.find((data) => data.name === event.semestre && data.parent === event.location)) {
      chartDataSemestre.push({
        id: `${event.location}-${event.semestre}`,
        parent: event.location,
        name: event.semestre,
        value: totalSemestre[event.location][event.semestre],
      });
    }
  }

  if (event.location && locations.includes(event.location) && event.ressources) {
    if (!chartDataRessource.find((data) => data.name === event.ressources && data.parent === event.location)) {
      chartDataRessource.push({
        id: `${event.location}-${event.ressources}`,
        parent: event.location,
        name: event.ressources,
        value: totalRessource[event.location][event.ressources],
      });
    }
  }
});

console.log(chartData);

V.chartConfig.series = chartDataRessource;

zingchart.loadModules('bubble-pack', function () {
  zingchart.render({
    id: 'myChart',
    data: V.chartConfig,
    height: '100%',
    width: '100%',
  });
});

// eventlistener on select calendartype

let select = document.querySelector("#calendartype");

select.addEventListener("change", () => {
  if (select.value == "cours") {
    V.chartConfig.series = chartDataCours;
  }
  else if (select.value == "semestre") {
    V.chartConfig.series = chartDataSemestre;
  }
  else if (select.value == "ressource") {
    V.chartConfig.series = chartDataRessource;
    console.log(chartDataRessource);
  }

  zingchart.render({
    id: "myChart",
    data: V.chartConfig, // on appelle V.classcalendar qui est dans view.js
    height: "100%",
    width: "100%",
  });
});