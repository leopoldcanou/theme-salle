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




console.log(events);



zingchart.render({
  id: 'myChart4',
  data: V.HeatMap,
  height: "100%",
  width: "100%"
});




function aggregateValues(data) {
  const aggregatedData = {};

  data.forEach((event) => {
    const key = `${event.location}-${event.semaine}`; // Clé basée sur la combinaison de la semaine et de la location

    if (!aggregatedData[key]) {
      aggregatedData[key] = {
        semaine: event.semaine,
        location: event.location,
        totalDuration: 0
      };
    }

    aggregatedData[key].totalDuration += event.duration; // Additionner les durées pour les mêmes semaines et emplacements
  });

  return Object.values(aggregatedData); // Retourne un tableau avec les valeurs agrégées par semaine et emplacement
}

// Utilisez cette fonction pour agréger vos données
const aggregatedData = aggregateValues(events);
console.log(aggregatedData); // Assurez-vous que les données sont agrégées correctement





// Supposons que vous avez des données retournées par votre fonction updateHeatmapData
const heatmapData = aggregatedData;

// Salles spécifiques que vous voulez inclure dans la heatmap
const specificLocations = ['101', '102', '103', '115', 'R03', 'R04', 'R01', 'ADM132', 'R02'];

// Filtrer les données pour inclure uniquement les salles spécifiques
const filteredData = heatmapData.filter(item => specificLocations.includes(item.location));

// Conversion des données pour la heatmap ZingChart
const zingchartData = [];
const weeks = new Set();

// Obtenez la liste unique des semaines
filteredData.forEach(item => {
  weeks.add(item.semaine);
});

// Triez les semaines
const sortedWeeks = Array.from(weeks).sort((a, b) => a - b);

// Créez la structure de données nécessaire pour ZingChart
specificLocations.forEach(location => {
  const locationData = {
    text: location,
    values: []
  };

  sortedWeeks.forEach(week => {
    const dataForWeek = filteredData.find(item => item.semaine === week && item.location === location);
    if (dataForWeek) {
      locationData.values.push(dataForWeek.totalDuration);
    } else {
      locationData.values.push(null); // ou 0 si vous préférez remplir avec 0
    }
  });

  zingchartData.push(locationData);
});



V.HeatMap.scaleY.values = specificLocations;
V.HeatMap.scaleX.values = sortedWeeks;
V.HeatMap.series = zingchartData;


zingchart.render({
  id: 'myChart4',
  data: V.HeatMap
});




// get the total duration of each group (BUT1, BUT2, BUT3)
let totalGroup2 = {};
locations.forEach((location) => {
  totalGroup2[location] = {};
  groups.forEach((group) => {
    totalGroup2[location][group] = 0;
  });
});

classes.forEach((event) => {
  if (locations.includes(event.location) && groups.includes(event.group)) {
    totalGroup2[event.location][event.group] += event.duration;
  }
});

console.log(totalGroup2);

//get the total duration of each classType by location
let totalClassType2 = {};
classes.forEach((event) => {
  if (locations.includes(event.location) && classTypes.includes(event.classType)) {
    if (!totalClassType2[event.location]) {
      totalClassType2[event.location] = {};
    }
    if (!totalClassType2[event.location][event.classType]) {
      totalClassType2[event.location][event.classType] = 0;
    }
    totalClassType2[event.location][event.classType] += event.duration;
  }
});

console.log(totalClassType2);

let seriesObj11 = [];
let seriesObj22 = [];

// Loop through classTypes
classTypes.forEach((classType) => {
  let values = locations.map((location) => totalClassType2[location][classType]);
  seriesObj11.push({
    values: values,
    text: classType,
  });
});

groups.forEach((group) => {
  let values = locations.map((location) => totalGroup[location][group]);
  seriesObj22.push({
    values: values,
    text: group,
  });
});

V.classcalendar.series = seriesObj11;
console.log(totalClassType2);
console.log(seriesObj22);
V.classcalendar["scale-x"].labels = Object.keys(totalClassType2);

zingchart.render({
  id: "myChart2",
  data: V.classcalendar, // on appelle V.classcalendar qui est dans view.js
  height: "100%",
  width: "100%",
});


// eventlistener on select calendartype

let select = document.querySelector("#calendartype");

select.addEventListener("change", () => {
  if (select.value == "group") {
    V.classcalendar.series = seriesObj11;
  }
  else if (select.value == "class") {
    V.classcalendar.series = seriesObj22;
  }
  zingchart.render({
    id: "myChart2",
    data: V.classcalendar, // on appelle V.classcalendar qui est dans view.js
    height: "100%",
    width: "100%",
  });
});



// get the total duration of each group (BUT1, BUT2, BUT3)
let totalGroup3 = {};
locations.forEach((location) => {
  totalGroup3[location] = {};
  groups.forEach((group) => {
    totalGroup3[location][group] = 0;
  });
});

classes.forEach((event) => {
  if (locations.includes(event.location) && groups.includes(event.group)) {
    totalGroup3[event.location][event.group] += event.duration;
  }
});

//get the total duration of each classType by location
let totalClassType3 = {};
classes.forEach((event) => {
  if (locations.includes(event.location) && classTypes.includes(event.classType)) {
    if (!totalClassType3[event.location]) {
      totalClassType3[event.location] = {};
    }
    if (!totalClassType3[event.location][event.classType]) {
      totalClassType3[event.location][event.classType] = 0;
    }
    totalClassType3[event.location][event.classType] += event.duration;
  }
});

let seriesObj13 = [];
let seriesObj23 = [];

// Loop through classTypes
classTypes.forEach((classType) => {
  let values = locations.map((location) => totalClassType[location][classType]);
  seriesObj13.push({
    values: values,
    text: classType,
  });
});

groups.forEach((group) => {
  let values = locations.map((location) => totalGroup[location][group]);
  seriesObj23.push({
    values: values,
    text: group,
  });
});

// recuperer la duration par location de chaque ressources
let totalRessource3 = {};
classes.forEach((event) => {
  if (locations.includes(event.location) && event.ressources) {
    if (!totalRessource3[event.location]) {
      totalRessource3[event.location] = {};
    }
    if (!totalRessource3[event.location][event.ressources]) {
      totalRessource3[event.location][event.ressources] = 0;
    }
    totalRessource3[event.location][event.ressources] += event.duration;
  }
});

console.log(totalRessource3);

// recuperer la duration par location de chaque semestre
let totalSemestre3 = {};
classes.forEach((event) => {
  if (locations.includes(event.location) && event.semestre) {
    if (!totalSemestre3[event.location]) {
      totalSemestre3[event.location] = {};
    }
    if (!totalSemestre3[event.location][event.semestre]) {
      totalSemestre3[event.location][event.semestre] = 0;
    }
    totalSemestre3[event.location][event.semestre] += event.duration;
  }
});

console.log(totalSemestre3);

// recuperer la duration par location de chaque usage
let totalUsage3 = {};
classes.forEach((event) => {
  if (locations.includes(event.location) && event.classType && ["TP", "TD", "CM"].includes(event.classType)) {
    if (!totalUsage3[event.location]) {
      totalUsage3[event.location] = {};
    }
    if (!totalUsage3[event.location][event.classType]) {
      totalUsage3[event.location][event.classType] = 0;
    }
    totalUsage3[event.location][event.classType] += event.duration;
  }
});

console.log(totalUsage3);

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
    id: 'myChart3',
    data: V.chartConfig,
    height: '100%',
    width: '100%',
  });
});

// eventlistener on select calendartype

let select2 = document.querySelector("#calendartype3");

select2.addEventListener("change", () => {
  if (select2.value == "cours") {
    V.chartConfig.series = chartDataCours;
  }
  else if (select2.value == "semestre") {
    V.chartConfig.series = chartDataSemestre;
  }
  else if (select2.value == "ressource") {
    V.chartConfig.series = chartDataRessource;
    console.log(chartDataRessource);
  }

  zingchart.render({
    id: "myChart3",
    data: V.chartConfig, // on appelle V.classcalendar qui est dans view.js
    height: "100%",
    width: "100%",
  });
});