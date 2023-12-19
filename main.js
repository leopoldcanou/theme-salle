import { V } from "./js/view.js";
import { M } from "./js/model.js";


await M.init(); // on attend que les données soient chargées

// get location of each M.getEvents("mmi1") and get the start and end time of each event
// get the difference between end and start time

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
  };
});

const locations = ["101", "102", "103", "115", "R01", "R02", "R03", "R04"];
const classTypes = ["TP", "CM", "TD"];
const groups = ["BUT1", "BUT2", "BUT3"];

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

console.log(totalGroup);

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

console.log(totalClassType);

let seriesObj1 = [];

// Loop through classTypes
classTypes.forEach((classType) => {
  let values = locations.map((location) => totalClassType[location][classType]);
  seriesObj1.push({
    values: values,
    texte: classType,
  });
});

V.classcalendar.series = seriesObj1;
V.classcalendar["scale-x"].labels = Object.keys(totalClassType);

zingchart.render({
  id: "myChart",
  data: V.classcalendar, // on appelle V.classcalendar qui est dans view.js
  height: "100%",
  width: "100%",
});