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

let durations = events.map((event) => {
  let durationHours = (event.end - event.start) / 3600000;
  let title = event.title.includes("CM") ? "CM" : event.title.includes("TD") ? "TD" : event.title.includes("TP") ? "TP" : event.title;
  let groups = event.groups.toString().includes("BUT1") ? "BUT1" : event.groups.toString().includes("BUT2") ? "BUT2" : event.groups.toString().includes("BUT3") ? "BUT3" : event.groups;
  return {
    duration: durationHours,
    location: event.location,
    title: title,
    groups: groups,
  };
});

console.log(durations);

let yearFilter = ["BUT1", "BUT2", "BUT3"];
let classTypeFilter = ["CM", "TD", "TP"];
let locationsToFilter = ["R01", "R02", "R03", "R04", "101", "102", "103", "115", "ADM132"];

let filteredDurations = durations.filter((event) => locationsToFilter.includes(event.location) && classTypeFilter.includes(event.title) && yearFilter.includes(event.groups));

let sortedDurations = filteredDurations.reduce((acc, curr) => {
  if (!acc[curr.title]) {
    acc[curr.title] = {};
  }
  if (!acc[curr.title][curr.location]) {
    acc[curr.title][curr.location] = 0;
  }
  acc[curr.title][curr.location] += curr.duration;
  return acc;
}, {});

console.log(sortedDurations);

let seriesObj1 = classTypeFilter.map((classType) => {
  return {
    values: locationsToFilter.map((location) => sortedDurations[classType]?.[location] || 0),
  };
});

V.classcalendar.series = seriesObj1;
V.classcalendar["scale-x"].labels = Object.keys(sortedDurations);

zingchart.render({
  id: "myChart",
  data: V.classcalendar, // on appelle V.classcalendar qui est dans view.js
  height: "100%",
  width: "100%",
});