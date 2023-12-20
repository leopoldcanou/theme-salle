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
  id: 'myChart',
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





function updateHeatmapData(data) {
  // Aggregate the values
  const aggregatedData = data.reduce((result, event) => {
    const key = `${event.location}-${event.semaine}`;

    if (!result[key]) {
      result[key] = {
        semaine: event.semaine,
        location: event.location,
        totalDuration: 0
      };
    }

    result[key].totalDuration += event.duration;

    return result;
  }, {});

  const aggregatedValues = Object.values(aggregatedData);

  const seriesData = aggregatedValues.reduce((result, item) => {
    const locationIndex = locations.indexOf(item.location);
    if (locationIndex !== -1) {
      if (!result[locationIndex]) {
        result[locationIndex] = [];
      }
      result[locationIndex].push(item.totalDuration);
    }
    return result;
  }, []);

  const heatmapSeries = locations.map((location, index) => ({
    values: seriesData[index] || Array(aggregatedValues.length).fill(0),
    text: location
  }));

  V.HeatMap.series = heatmapSeries;

  zingchart.render({
    id: 'myChart',
    data: V.HeatMap,
    height: "100%",
    width: "100%"
  });
}

// Utilisation de la fonction avec vos données agrégées
updateHeatmapData(aggregatedData);

